
// User names

let forms = new Array();

saveSnapshot = (forms) => {
    localStorage.setItem("forms", JSON.stringify(forms));
    console.log(JSON.stringify(forms));
}

loadSnapshot = () => {
    forms = JSON.parse(localStorage.getItem("forms")) || [];
}

loadSnapshot();

const REGEXPWDVALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const USERINVALIDMESSAGE = "Enter a valid username with at least 6 characters";
const EMAILINVALIDMESSAGE = "Enter a valid email";
const PASSWORDINVALIDMESSAGE = "Enter a valid password";
const CONFPASSWORDINVALIDMESSAGE = "Password doesn't match";
const REGEXEMAILVALIDATION = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const REGEXUSERNAME = /^[A-Za-z0-9_]{6,}$/;

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confPasswordInput = document.getElementById("confirmPassword");
const registrationForm = document.getElementById("registrationForm"); 

// Global flag
let userExist = false;
let emailExist = false;

// Verify if both passwords match
verifyPassword = (input) => {
    if(confPasswordInput.value !== passwordInput.value){
        fieldColor(confPasswordInput,"red");
        changeSpan(confPasswordInput,CONFPASSWORDINVALIDMESSAGE);

    } else if( confPasswordInput.value === "" ){
        fieldColor(confPasswordInput,"red");
        changeSpan(confPasswordInput,"Cannot be empty");
        fieldColor(confPasswordInput,"red");
        
    } else {
        fieldColor(confPasswordInput,"green");
        changeSpan(confPasswordInput,"");
    }
}

// change text inside form easily
changeSpan = (element,text) => {
    const span = element.nextElementSibling.nextElementSibling;
    span.textContent = text;
}

// Check automatically the status of each element before submit
fieldStatus = (element, type, exist = false) => {
    let text = "";
    switch (type){
        case "username":
            text = USERINVALIDMESSAGE;
            break;
        case "email":
            text = EMAILINVALIDMESSAGE;
            break;
        case "password":
            text = PASSWORDINVALIDMESSAGE;
            break;
        case "confirmPassword":
            text = CONFPASSWORDINVALIDMESSAGE;
            break;
    } 
    if(!element.validity.valid){
        changeSpan(element, text);
        return true;
    } 

    if(type === "username" && exist){
        changeSpan(element, "Username already exist");
        return true;
    }

    if(type === "email" && exist){
        changeSpan(element, "Email already enrolled");
        return true;
    }

    changeSpan(element,"");
    return false;
}

// This validates if all entries are already filled before submit
// If it will change the text if some fields are already filled
verifyValidation = (event) => {
    let invalid = false;

    // Return false if meet requirements, true if not
    if( fieldStatus(usernameInput, "username", userExist) ||
        fieldStatus(emailInput, "email", emailExist) ||
        fieldStatus(passwordInput, "password") ||
        fieldStatus(confPasswordInput, "confirmPassword") ){
            invalid = true;
    }

    if(invalid){
        return;

    } else {
        // if valid it will add a new form data to our array
        const newForm = new FormData(registrationForm);

        // Delete unnecesary data from our form
        newForm.delete("confirmPassword");

        // Add form data into our array
        forms.push(Object.fromEntries(newForm));

        // save to local storage
        saveSnapshot(forms);

        // Reset all entries values
        registrationForm.reset();

        // Reset entries statuses 
        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("touched");
        });
    }
}

// This listener will add touched class, so fields will turn red
// if invalid
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("blur", () => {
        input.classList.add("touched");
    })
});

// Listener to verify if password match
confPasswordInput.addEventListener("input", input => verifyPassword(input));

// Listener to match if password match, only evaluates confirm password
passwordInput.addEventListener("input", input => verifyPassword(input));

// Test method to verify if username meets criteria
usernameInput.addEventListener("input", input => {
    userExist = false;
    forms.forEach(form => {
        if(form.username.toLowerCase() === input.target.value.toLowerCase()){
            userExist = true;
        }
    });
    if(userExist){
        changeSpan(usernameInput, "Username already exist");
        fieldColor(usernameInput,"red");
    } else {
        changeSpan(usernameInput, "");
        if(!REGEXUSERNAME.test(usernameInput.value)){
            changeSpan(usernameInput, USERINVALIDMESSAGE);
            fieldColor(usernameInput,"red");
        } else {
            changeSpan(usernameInput, "");
            fieldColor(usernameInput,"green");
        }
    }
});

// Test method to verify if email meets criteria
emailInput.addEventListener("input", input => {
    emailExist = false;

    forms.forEach(form => {
        if(form.email.toLowerCase() === input.target.value.toLowerCase()){
            emailExist = true;
        }
    });

    if(emailExist){
        changeSpan(emailInput, "Email already enrolled");
        fieldColor(emailInput,"red");
    } else {
        if(!REGEXEMAILVALIDATION.test(emailInput.value)){
            changeSpan(emailInput, EMAILINVALIDMESSAGE);
            fieldColor(emailInput,"red");
        } else {
            changeSpan(emailInput, "");
            fieldColor(emailInput,"green");
        }
    }
});

// Test method to verify if password meets criteria
passwordInput.addEventListener("input", input => {
    if(!REGEXPWDVALIDATION.test(passwordInput.value)){
        changeSpan(passwordInput, PASSWORDINVALIDMESSAGE);
        fieldColor(passwordInput,"red");
    } else {
        changeSpan(passwordInput, "");
        fieldColor(passwordInput,"green");
    }
});

// change highlight color around fields
function fieldColor(field,color = "neutral"){
    const GREEN_BORDER = "input-success";
    const RED_BORDER = "input-error";
    if(color === "red"){
        field.classList.remove(GREEN_BORDER,".validField");
        field.classList.add(RED_BORDER, ".invalcidField");
    } else if (color === 'green'){
        field.classList.remove(RED_BORDER,".invalidField");
        field.classList.add(GREEN_BORDER,".validField");
    } else{
        field.classList.remove(GREEN_BORDER,RED_BORDER,".invalidField",".validField");
    }
}

// Preventing from refresh page after click submit button
// Calls verify validation function
registrationForm.addEventListener("submit", event => {
    event.preventDefault(); // Avoid default form submision
    verifyValidation(event);
});