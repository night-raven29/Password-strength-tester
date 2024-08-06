
let password = document.querySelector("#password-field");
let strengthContainer = document.querySelector(".strength-container");
let strengthBar = document.querySelector("#strength-bar");
let strengthText = document.querySelector(".strength-text");
let eyeicon = document.getElementById("eyeicon");
// Get the password input field and submit button
const passwordField = document.getElementById('password-field');
const submit = document.getElementById('submit');

// Add an event listener to the password input field
passwordField.addEventListener('input', () => {
  // Check if the password field is not empty
  if (passwordField.value.trim() !== '') {
    // Enable the submit button
    submit.disabled = false;
  } else {
    // Disable the submit button
    submit.disabled = true;
  }
});

const generator = document.getElementById("generator-field");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialChar = "!@#$%^&*()_+~`|}{[]:;";

const allchars = upperCase + lowerCase+numbers+specialChar;

function createPassword(){
	let password = "";
	password += upperCase[Math.floor(Math.random() * upperCase.length)];
	password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
	password += numbers[Math.floor(Math.random() * numbers.length)];
	password += specialChar[Math.floor(Math.random() * specialChar.length)];

	while(length>password.length){
		password += allchars[Math.floor(Math.random() * allchars.length)];
	}
	generator.value = password;
}

function copypassword(){
	generator.select();
	document.execCommand("copy");
}


eyeicon.onclick = function(){
	if(password.type == "password"){
		password.type = "text";	
		eyeicon.src = "eye-close.png"
	}else{
		password.type = "password";
		eyeicon.src = "eye (open).png"

	}
}

password.addEventListener("focus", function(){
	strengthContainer.style.display = "block";
});
password.addEventListener("blur", function(){
	strengthContainer.style.display = "none";
});

function setStrength(value){
	strengthBar.style.width = value + "%";
}

function setColorAndText(color, text){
	strengthBar.style.backgroundColor = color;
	strengthText.innerHTML = text;
	strengthText.style.color = color;
}

function clearStrength(){
	strengthBar.style.width = 0;
	strengthBar.style.backgroundColor = "";
	strengthText.innerHTML = "";
}

password.addEventListener("keyup", checkPasswordStrength);
function checkPasswordStrength(){
	let strength = 0;

	if(password.value == ""){
		clearStrength();
		return false;
	}

	if(password.value.match(/\s/)){
		setColorAndText("red", "White space is not allowed");
		return false;
	}

	if(password.value.match(/<|>/)){
		setColorAndText("red", "< > characters are not allowed");
		return false;
	}

	if(password.value.length > 12){
		setColorAndText("red", "Password greater than 12 char.");
		return false;
	}

	if(password.value.length < 7){
		strength = 20;
		setColorAndText("red", "Too short"); // short
	}else{
		
		let lowerCase = password.value.match(/[a-z]/);
		let upperCase = password.value.match(/[A-Z]/);
		let numbers = password.value.match(/[0-9]/);
		let specialCharacters = password.value.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);

		if(lowerCase || upperCase || numbers || specialCharacters){
			strength = 40;
			setColorAndText("red", "Weak"); // weak
		}

		if( 
			(lowerCase && upperCase) || (lowerCase && numbers) || (lowerCase && specialCharacters) ||
			(upperCase && numbers) || (upperCase && specialCharacters) || (numbers && specialCharacters)
		  )
		{
			strength = 60;
			setColorAndText("orange", "Medium");	// medium		
		} 
		
		if( (lowerCase && upperCase && numbers) || (lowerCase && upperCase && specialCharacters) ||
		    (lowerCase && numbers && specialCharacters) ||  (upperCase && numbers && specialCharacters)
		  )
		{
			strength = 80;
			setColorAndText("#088f08", "Strong");	// strong
		}

		if( lowerCase && upperCase && numbers && specialCharacters ) 
		{
			strength = 100;
			setColorAndText("green", "Very Strong");	// very strong
		}
	}
	setStrength(strength);
}
