function signupCheck() {
    // check if the username is empty
    if (document.forms["signupform"]["Name"].value.trim() == null || document.forms["signupform"]["Name"].value.trim() == "") {
        alert("Username needs to be filled");
        return false;
    }

    // check if the email is empty
    if (document.forms["signupform"]["email"].value.trim() == null || document.forms["signupform"]["email"].value.trim() == "") {
        alert("Please enter an email");
        return false;
    }

    // check if the password is empty
    if (document.forms["signupform"]["Password"].value.trim() == null || document.forms["signupform"]["Password"].value.trim() == "") {
        alert("Please enter a Password");
        return false;
    }

    // check if the confirm password is empty
    if (document.forms["signupform"]["ConfirmPassword"].value.trim() == null || document.forms["signupform"]["ConfirmPassword"].value.trim() == "") {
        alert("Please confirm your password");
        return false;
    }

    // check if the passwords match
    if (document.forms["signupform"]["ConfirmPassword"].value != document.forms["signupform"]["Password"].value) {
        alert("Please make sure your passwords are the same");
        return false;
    }

    // Save username and password in sessionStorage but don't auto-login
    var username = document.forms["signupform"]["Name"].value;
    var password = document.forms["signupform"]["Password"].value;

    // Save the username and password to sessionStorage
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    
    alert("Successful signup, please login");

    return true;
}
function logincheck() {
    //getting user and pass from session storage in signup form 
    var storedUsername= sessionStorage.getItem("username");
    var storedPassword = sessionStorage.getItem("password");

    //form checking --learned in class
    if (document.forms["loginform"]["Name"].value == null || document.forms["loginform"]["Name"].value == ""){
        alert("Enter username");
        return false;
    }
    if (document.forms["loginform"]["Password"].value == null || document.forms["loginform"]["Password"].value == ""){
        alert("Enter password");
        return false; 
    }
    if (document.forms["loginform"]["Name"].value != storedUsername || document.forms["loginform"]["Password"].value != storedPassword) {
        alert("Either Username or password is incorrect");
        return false;
    }

    // if user logs in sets loggedin varible to 1 and adds to session storage
    var loggedin = 1
    sessionStorage.setItem("logged in", loggedin)
    //to make sure the login works
    alert("Login successful");
    return true;
}
function checkSessionAndReplaceHTML() {
    // Retrieve the username from sessionStorage
    const username = sessionStorage.getItem("username");

    // Get the div that contains the login/signup buttons
    const buttonsDiv = document.querySelector(".buttonsforacc");

    if (sessionStorage.length == 4) {
        // If the user is logged in, display a welcome message and logout button
        buttonsDiv.innerHTML = `
            <div id="username">Welcome, ${username}!</div>
            <button id="logoutbutton">Log Out</button>
        `;

        // Add an event listener for the logout button
        const logoutButton = document.getElementById("logoutbutton");
        logoutButton.addEventListener("click", function() {
            // Remove the username and password and loggedin from sessionStorage
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("password");
            sessionStorage.removeItem("logged in");

            // Refresh the page to update the UI and show the login/signup buttons again
            location.reload();
        });
    } else {
        // If no username is found in sessionStorage, show the login/signup buttons
        buttonsDiv.innerHTML = `
            <button popovertarget="Login-pop" id="loginbutton">Login</button>
            <p id="buttonline">|</p>
            <button popovertarget="signup-pop" id="signupbutton">Sign Up</button>
        `;
    }
}
checkSessionAndReplaceHTML();
//end of nav buttons

const emailinput = document.getElementById("emailinput");
const buttonfriend = document.getElementById("friendsemail");

//function for checking email domains
function properemail (email) {
    const properEmails = ['hotmail.com', 'gmail.com', 'yahoo.com', 'outlook.com'];
    const emailsections = email.split('@');

    if( emailsections.length == 2 && properEmails.includes(emailsections[1])) {
        return true
    } else {
        return false
    }
}

//function for checking the email and changing the text within the input box
 function sendemail () {
    const email = emailinput.value.trim();

    if (properemail(email)){
        emailinput.value = 'Email sent, thank you!'
    } else {
        emailinput.value = 'Not a valid email domain.'
    }
    emailinput.setAttribute('readonly', true);
}

//adding interaction with the button 
buttonfriend.addEventListener('click', sendemail)

//being able to add a new email
emailinput.addEventListener('click', function(){
    if (emailinput.readOnly) {
        emailinput.removeAttribute('readonly');
        emailinput.value = ''
    }
})


const button = document.getElementById("checkingscript");

button.addEventListener("click", function(){
    const numofitems = sessionStorage.length;
    alert(numofitems);
});