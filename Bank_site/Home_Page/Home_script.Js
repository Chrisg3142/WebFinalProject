let logged = false
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
    var loggedin = 1
    sessionStorage.setItem("logged in", loggedin)
    //to make sure the login works
    alert("Login successful");
    
    //checkSessionAndReplaceHTML();

    return true;
}
checkSessionAndReplaceHTML();

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
            // Remove the username and password from sessionStorage
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



/*
function checkSessionAndReplaceHTML() {
        //gets username
        var username = sessionStorage.getItem("username");
        
        // gets the div with class '.buttonsforacc'
        const buttonsDiv = document.querySelector(".buttonsforacc");
    
        if (username)
        {
            // replace html content
            buttonsDiv.innerHTML = `
                <div id="username">Welcome, ${username}!</div>
                <button id="logoutbuttonn">Log Out</button>
            `;
            let logoutbutt = document.getElementById("logoutbuttonn");
            logoutbutt.addEventListener("click", function() {
                    sessionStorage.removeItem("username");
                    sessionStorage.removeItem("password");
                    location.reload(); // Reload the page to show the login/signup buttons again
            });
        } else {
            //original html code :)
            buttonsDiv.innerHTML = `
                <button popovertarget="Login-pop" id="loginbutton">Login</button>
                <p id="buttonline">|</p>
                <button popovertarget="signup-pop" id="signupbutton">Sign Up</button>
            `;
        }
*/
//---------------------------------------------------------------------------------------------------
/*
function signupCheck() {
    // Validate form inputs
    if (document.forms["signupform"]["Name"].value.trim() == "" || document.forms["signupform"]["Name"].value.trim() == null) {
        alert("Username needs to be filled");
        return false;
    }

    if (document.forms["signupform"]["email"].value.trim() == "" || document.forms["signupform"]["email"].value.trim() == null) {
        alert("Please enter an email");
        return false;
    }

    if (document.forms["signupform"]["Password"].value.trim() == "" || document.forms["signupform"]["Password"].value.trim() == null) {
        alert("Please enter a Password");
        return false;
    }

    if (document.forms["signupform"]["ConfirmPassword"].value.trim() == "" || document.forms["signupform"]["ConfirmPassword"].value.trim() == null) {
        alert("Please confirm your password");
        return false;
    }

    if (document.forms["signupform"]["ConfirmPassword"].value !== document.forms["signupform"]["Password"].value) {
        alert("Passwords do not match");
        return false;
    }

    // Store the credentials in sessionStorage (only store, no login action)
    var username = document.forms["signupform"]["Name"].value.trim();
    var password = document.forms["signupform"]["Password"].value.trim();

    // Save username and password in sessionStorage
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);

    // Inform the user that the signup was successful
    alert("Successful signup, please login");

    return true;
}


function logincheck() {
    // Retrieve stored credentials from sessionStorage
    var storedUsername = sessionStorage.getItem("username");
    var storedPassword = sessionStorage.getItem("password");

    // Validate the form inputs
    if (document.forms["loginform"]["Name"].value == "" || document.forms["loginform"]["Name"].value == null) {
        alert("Enter username");
        return false;
    }

    if (document.forms["loginform"]["Password"].value == "" || document.forms["loginform"]["Password"].value == null) {
        alert("Enter password");
        return false;
    }

    // Check if entered credentials match the stored credentials
    if (document.forms["loginform"]["Name"].value !== storedUsername || document.forms["loginform"]["Password"].value !== storedPassword) {
        alert("Either username or password is incorrect");
        return false;
    }

    // If login is successful, show a success message
    alert("Login successful");

    // Update the page to show the logged-in state
    checkSessionAndReplaceHTML();

    return true;
}

function checkSessionAndReplaceHTML() {
    // Retrieve the username from sessionStorage
    const username = sessionStorage.getItem("username");

    // Get the div that contains the login/signup buttons
    const buttonsDiv = document.querySelector(".buttonsforacc");

    if (username) {
        // If the user is logged in, display a welcome message and logout button
        buttonsDiv.innerHTML = `
            <div id="username">Welcome, ${username}!</div>
            <button id="logoutbutton">Log Out</button>
        `;

        // Add an event listener for the logout button
        const logoutButton = document.getElementById("logoutbutton");
        logoutButton.addEventListener("click", function() {
            // Remove the username and password from sessionStorage
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("password");

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

// Call checkSessionAndReplaceHTML when the page loads to check if the user is logged in
window.onload = function() {
    checkSessionAndReplaceHTML();
};
*/
const button = document.getElementById("checkingscript");

button.addEventListener("click", function(){
    const numofitems = sessionStorage.length;
    alert(numofitems);
});