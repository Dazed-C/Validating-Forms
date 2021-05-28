// Validate form entries
function checkForm(form) {
    var re = /^\w+$/; // RegExp - Regular Expression

    // confirm username is not empty
    if (form.username.value == "") {
        form.username.focus();
        $("#username").css("border", "1px solid red");
        return false;
    }
    else {
        $("#username").css("border", "1px solid green");
    }

    // confirm username only contains letters, numbers and underscores
    if (!re.test(form.username.value)) {
        alert("Username can only contain letters, numbers and underscores");
        form.username.focus();
        $("#username").css("border", "1px solid red");
        return false;
    }
    else {
        $("#username").css("border", "1px solid green");
    }

    // confirm passwords match & ..
    if (form.password.value == form.password2.value) {

        // RegExp for at least one number, one lowercase letter, one uppercase letter, no whitespace and 6 characters long
        // password may contain special characters
        re = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )).{6,}$/;

        // confirm password complies with re
        if (!re.test(form.password.value)) {
            alert("The password you have entered is not valid");
            form.password.focus();
            $("#password").css("border", "1px solid red");
            return false;
        }
        else {
            $("#password").css("border", "1px solid green");
            $("#password2").css("border", "1px solid green");
        }

    }
    else {
        alert("Passwords do not match");
        form.password.focus();
        $("#password").css("border", "1px solid red");
        $("#password2").css("border", "1px solid red");
        return false;
    }

    // confirm username is not the same as the password
    if (form.username.value == form.password.value) {
        alert("Username and Password must not match");
        return false;
    }

    // RegExp for Date format
    re = /^(\d{2,4})([/-])(\d{2})([/-])(\d{2})$/;

    // confirm date is not empty and matches RegExp
    if (form.dob.value != "" && form.dob.value.match(re)) {

        // form value as var
        dobStr = form.dob.value;

        // form dob year
        yStr = dobStr.substring(0, 4);
        yNum = Number(yStr);
        //form dob month
        mStr = dobStr.substring(5, 7);
        mNum = Number(mStr) - 1;
        // form dob day
        dStr = dobStr.substring(8, 10);
        dNum = Number(dStr) - 1;

        // todays date, splite into Y M & D
        var t = new Date();
        var tYear = t.getFullYear();
        var tMonth = t.getMonth();
        var tDay = t.getDay();

        // confirm entered year is less than 18 years from today
        if (yNum > tYear - 18) {
            return dobError();
        }
        // if year is 18, check month
        else if ((yNum == tYear - 18) && (mNum > tMonth)) {
            return dobError();
        } // if year is 18 and month is this month, check day
        else if ((yNum == tYear - 18) && (mNum == tMonth) && (dNum > tDay)) {
            return dobError();

        }

        else {
            $("#dob").css("border", "1px solid green");
        }
        
    }
    else {
        dobError();
        return false;
    }
}

function dobError() {
    alert("you must be 18+ to submit this form");
    $("#dob").focus();
    $("#dob").css("border", "1px solid red");
    return false;
}

// Set custom message for T&C checkbox when not checked
document.getElementById("terms").setCustomValidity("Please check to indicate that you have read and accept the Terms and Conditions");

// Set terms checkbox to unchecked by default
$("#terms").prop("checked", false);