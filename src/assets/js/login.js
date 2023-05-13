function validateForm() {
  let a = 0;
 
  var email = document.form.email.value;
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  console.log(email);
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    alert(" Enter a valid e-mail address ");
    return false;
  }

  
  var pass = document.form.pass.value;
  if (pass.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }
  else {
    alert("Login Successful Click OK to go to Homepage")
    return true;
  }
}
