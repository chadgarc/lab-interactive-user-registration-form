
// User names

const usernames = new Array();

const REGEXPWDVALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const REGEXEMAILVALIDATION = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const REGEXUSERNAME = /^[A-Za-z0-9_]{6,}$/;

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confPasswordInput = document.getElementById("confirmPassword");

function verifyPassword(input){
    const span = confPasswordInput.nextElementSibling;
    if(confPasswordInput.value !== passwordInput.value){
        fieldColor(confPasswordInput,"red");
        span.textContent = "Password doesn't match";
        console.log("Password doesn't match");
    } else if( confPasswordInput.value === "" ){
        fieldColor(confPasswordInput,"red");
        span.textContent = "Cannot be empty";
        fieldColor(confPasswordInput,"red");
    } else {
        fieldColor(confPasswordInput,"green");
        span.textContent = "";
        console.log("Password match");
    }
}

confPasswordInput.addEventListener("input", input => verifyPassword(input));

passwordInput.addEventListener("input", input => verifyPassword(input));

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