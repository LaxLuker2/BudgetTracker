"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#user").val() == "" || $("#pass").val() == "") {
    handleError("Come On Man! Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf").val());

  sendAjax("POST", $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#user").val() == "" || $("#pass").val() == "" || $("#pass2").val() == "") {
    handleError("Come On Man! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Come On Man! Passwords do not match");
    return false;
  }

  sendAjax("POST", $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#user").val() == "" || $("#pass").val() == "" || $("#pass2").val() == "") {
    handleError("Come On, Man! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Come On, Man! Passwords do not match");
    return false;
  }

  sendPassAjax("POST", $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
  //look up syntax for handling response
  //handle the 403 to then point to the singup

  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    "div",
    { "class": "wrapper fadeInDown" },
    React.createElement(
      "div",
      { id: "formContent" },
      React.createElement(
        "form",
        {
          id: "loginForm",
          name: "loginForm",
          onSubmit: handleLogin,
          action: "/login",
          method: "POST"
        },
        React.createElement("br", null),
        React.createElement("input", {
          id: "user",
          className: "logInput",
          type: "text",
          name: "username",
          placeholder: "Username"
        }),
        React.createElement("input", {
          id: "pass",
          className: "logInput",
          type: "password",
          name: "pass",
          placeholder: "Password"
        }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign In" })
      ),
      React.createElement(
        "button",
        {
          id: "changePasswordButton",
          className: "forgotPassword",
          onClick: function onClick() {
            getChangePass(props.csrf);
          }
        },
        "Forgot Password?"
      ),
      React.createElement("br", null)
    )
  );
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    "div",
    { "class": "wrapper fadeInDown" },
    React.createElement(
      "div",
      { id: "formContent" },
      React.createElement(
        "form",
        {
          id: "signupForm",
          name: "signupForm",
          onSubmit: handleSignup,
          action: "/signup",
          method: "POST",
          className: "mainForm"
        },
        React.createElement("br", null),
        React.createElement(
          "label",
          { htmlFor: "username" },
          "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
          "label",
          { htmlFor: "pass" },
          "Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
          "label",
          { htmlFor: "pass2" },
          "Password: "
        ),
        React.createElement("input", {
          id: "pass2",
          type: "password",
          name: "pass2",
          placeholder: "retype password"
        }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
      )
    )
  );
};

var ChangePasswordWindow = function ChangePasswordWindow(props) {
  return React.createElement(
    "div",
    { "class": "wrapper fadeInDown" },
    React.createElement(
      "div",
      { id: "formContent" },
      React.createElement(
        "form",
        {
          id: "changePassForm",
          name: "changePassForm",
          onSubmit: handleChangePass,
          action: "/changePass",
          method: "POST",
          className: "mainForm"
        },
        React.createElement("br", null),
        React.createElement(
          "label",
          { htmlFor: "username" },
          "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
          "label",
          { htmlFor: "pass" },
          "New Password: "
        ),
        React.createElement("input", {
          id: "pass",
          type: "password",
          name: "pass",
          placeholder: "new password"
        }),
        React.createElement(
          "label",
          { htmlFor: "pass2" },
          "New Password: "
        ),
        React.createElement("input", {
          id: "pass2",
          type: "password",
          name: "pass2",
          placeholder: "retype new password"
        }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Change Password" })
      )
    )
  );
};

var getChangePass = function getChangePass(csrf) {
  createChangePasswordWindow(csrf);
};

//render the pages in react
var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createChangePasswordWindow = function createChangePasswordWindow(csrf) {
  ReactDOM.render(React.createElement(ChangePasswordWindow, { csrf: csrf }), document.querySelector("#content"));
};

//attach events to the page btns
//user hits login or signup pgs UI re-render with correct html w/out changing pg
//default to LoginWindow view
var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); //default view

  var changePasswordButton = document.querySelector("#changePasswordButton");

  changePasswordButton.addEventListener("click", function (e) {
    e.preventDefault();
    createChangePasswordWindow(csrf);
    return false;
  });
};

//get new CSRF token
var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

//pg loads get token and setup the rest of the page to show our react components
$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  // $("#domoMessage").animate({ width: "toggle" }, 350);
  alert(message);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: "hide" }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

//create send pass ajax similar to the one above then send a error function to pass
var sendPassAjax = function sendPassAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
      window.location = "/";
    }
  });
};
