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

    if(formemail()){
        var username = document.forms["signupform"]["Name"].value;
        var password = document.forms["signupform"]["Password"].value;

        // Save the username and password to sessionStorage
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        
        alert("Successful signup, please login");

        return true;
    } else {
        return false;
    }
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
//function for checking email domains
function properemail (email) {
    const properEmails = ['hotmail.com', 'gmail.com', 'yahoo.com', 'outlook.com'];
    const emailsections = email.split('@');

    if(emailsections.length == 2 && properEmails.includes(emailsections[1])) {
        return true
    } else {
        return false
    }
}

function formemail (){
    formEmail = document.forms["signupform"]["email"].value.trim();
    if (properemail(formEmail)){
        return true
    } else {
        alert("Enter a proper email domain");
        return false;
    }
}

const youth_checkbox = document.getElementById("account-youth");
const adult_checkbox = document.getElementById("account-adult");
const returnedInterest = document.getElementById("interest");
const start = document.getElementById("computer-interest");

    
start.addEventListener("click",display_interest);

let interest_rate = 0;
let total_interest = 0;
function checked_boxes(){
    const youth_checkbox = document.getElementById("account-youth");
    const adult_checkbox = document.getElementById("account-adult");

    if (youth_checkbox.checked && adult_checkbox.checked){
        alert("pelase select only one");
        interest_rate = 0;
    } else if (youth_checkbox.checked){
        interest_rate = .035;
    } else if (adult_checkbox.checked){
        interest_rate = .045;
    } else{
        return false
    }
    return interest_rate;
}

function interest_compute(amount, time_num){
    if (time_num == 6){
        total_interest = amount*interest_rate*.5;
    } else if (time_num == 1){
        total_interest = amount*interest_rate*1;
    } else if (time_num == 2){
        total_interest = amount*interest_rate*2;
    } else if (time_num == 4){
        total_interest = amount*interest_rate*4;
    }
    return total_interest;
}
function display_interest(event){
    event.preventDefault();
    const starting_amount = parseFloat(document.getElementById("amount").value)
    const time = document.getElementById("time").value
    const time_num = parseInt(time.split("")[0]);
    if (isNaN(starting_amount) || starting_amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    const rate = checked_boxes();
    if (rate === 0) {
        return;
    }
    const calculatedInterest = interest_compute(starting_amount, time_num);

    returnedInterest.value = calculatedInterest.toFixed(2); 
    returnedInterest.setAttribute('readonly', true)
}



const check_this = document.getElementById("checking-code");
check_this.addEventListener("click", function(){
    const numofitems = sessionStorage.length;
    alert(numofitems);
});
