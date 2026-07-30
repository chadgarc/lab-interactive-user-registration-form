# 📘 Interactive User Registration Form
This project is part of the Interactive Registration Form Lab, where the goal is to build a responsive, user‑friendly registration form using HTML5 validation, JavaScript, DOM manipulation, and localStorage.

Beyond the lab requirements, I extended the project with TailwindCSS, DaisyUI, and SASS, and focused heavily on writing clean, reusable, and readable JavaScript.

## 🎯 Lab Requirements (What the Lab Asked For)
The lab required implementing the following core features:

### ✔ HTML Structure
- A registration form with fields for Username, Email, Password, and Confirm Password.
- Dedicated <span> elements for error messages.
- Use of HTML5 validation attributes such as required, type, minlength, and pattern.

### ✔ Real-Time Validation
- Use of input event listeners.
- Validation using the Constraint Validation API (input.validity).
- Custom error messages displayed next to each field.
- Explicit validation for confirming password match.

### ✔ Form Submission Handling
- Use of event.preventDefault() to stop default form submission.
- Final validation check before accepting the form.
- Displaying a success message.
- Saving the username to localStorage.
- Pre-filling the username field on page load if previously saved.

### ✔ LocalStorage Persistence
- Saving simple data (username).
- Retrieving and pre-filling the username on refresh.

## 🚀 Additional Features I Implemented (Beyond the Lab)
I went beyond the basic requirements and added some enhancements:

### ⭐ TailwindCSS Integration
I used TailwindCSS for:
- Layout alignment
- Spacing
- Responsive sizing
- Quick utility classes for centering and container styling
- This made the UI cleaner and more modern.

### ⭐ DaisyUI Components
I used DaisyUI for:
- A styled success alert
- Input highlight classes (input-success, input-error)
- More polished UI elements without writing extra CSS

### ⭐ SASS for Custom Styling
I integrated SASS to:
- Organize custom CSS
- Keep styles modular and maintainable
- Separate Tailwind-generated CSS from my own styling

### ⭐ Advanced JavaScript Validation
Beyond HTML5 validation, I implemented:
- Custom regex for username, email, and password
- Duplicate detection for username and email
- Dynamic border highlighting using JavaScript
- Reusable functions (changeSpan, fieldColor, fieldStatus, verifyPassword)
- Clean separation of logic and responsibilities

### ⭐ Full User Persistence
Instead of saving only the username (as the lab required), I saved:
- username
- email
- password

I converted FormData into plain objects using:

``` js
Object.fromEntries(new FormData(registrationForm));
```
This avoided serialization issues and made localStorage handling cleaner.

### ⭐ Clean Code Practices
I focused on:
- Avoiding repeated logic
- Writing reusable helper functions
- Keeping constants for messages and regex
- Maintaining readability and structure
- Organizing validation flow clearly

### ⭐ Improved Understanding of Event Listeners
This lab helped me understand event listeners much better.
I practiced:
- input
- blur
- submit
- DOMContentLoaded
- How each event affects validation timing and user experience

### ⭐ Regex Practice
Regex has always been challenging for me since college.
This project forced me to be more precise with:
- Lookaheads
- Character classes
- Email patterns
- Password strength rules

It helped reinforce my understanding of how regex works in real validation scenarios.

## 🧠 Reflection Questions
1. How did event.preventDefault() help in handling form submission?

    It prevented the browser from submitting the form and refreshing the page automatically.

    This allowed me to run custom validation logic, display error messages, save data to localStorage, and show a success alert without losing the form state.

2. What is the difference between HTML5 validation and JavaScript validation? Why use both?

    HTML5 validation is built-in, fast, and requires no JavaScript.

    JavaScript validation allows custom rules, dynamic feedback, duplicate detection, and personalized error messages.

    Using both provides a better user experience and more control over validation logic.

3. How did you use localStorage to persist and retrieve the username? What are its limitations?
    I saved user data using:

```js
localStorage.setItem("forms", JSON.stringify(forms));

```

And retrieved it with:

```js
forms = JSON.parse(localStorage.getItem("forms")) || [];

```

Limitations:

- Only stores strings
- Not secure for sensitive data (like passwords)
- Can be cleared by the user
- Not suitable for production authentication systems


4. Describe a challenge you faced in implementing real-time validation and how you solved it.

    A challenge was managing error messages and input highlight states without duplicating code.

    I solved this by creating reusable functions such as fieldStatus, changeSpan, and fieldColor, which centralized the logic and made the code cleaner and easier to maintain.

5. How did you ensure that custom error messages were user-friendly and displayed at the appropriate times?

    I used:

    - input events for real-time feedback
    - blur events to mark fields as touched
    - Dedicated <span> elements for each error
    - Clear, specific messages for each validation rule
    - Dynamic color changes to guide the user visually

## 📂 Project Structure
```bash
interactive-registration-form/
│── index.html
│── css/
│   ├── output.css   (Tailwind)
│   └── main.css     (SASS)
│── script/
│   └── app.js       (validation + localStorage)
```

## ✅ Final Thoughts
This lab helped me practice:
- DOM manipulation
- Event listeners
- Regex
- LocalStorage
- TailwindCSS and DaisyUI
-Clean code and reusable functions
- Real-time validation logic

I’m very satisfied with the result and with how much I improved my understanding of event listeners, regex, and UI feedback.