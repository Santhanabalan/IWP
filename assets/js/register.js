function validateForm() {
  let a = 0;
  
  var name = document.form.name.value;
  if (name == null || name == "") {
    alert("Name must be filled");
    return false;
  }

  
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

  
  var pass = document.form.pass.value;
  var repass = document.form.repass.value;

  if (pass != repass) {
    alert("Password is not same!");
    return false;
  }

  

  var num = document.form.number.value;
  if (isNaN(num)) {
    alert("Number invalid");
    return false;
  } else if (num.length != 10) {
    alert("Enter appropriate phone number");
    return false;
  } else {
    alert("Registration Successful Click OK to go to Homepage")
    return true;
  }
}
