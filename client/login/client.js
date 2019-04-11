const handleLogin = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#user").val() == "" || $("#pass").val() == "") {
    handleError("RAWR! Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf").val());

  sendAjax(
    "POST",
    $("#loginForm").attr("action"),
    $("#loginForm").serialize(),
    redirect
  );

  return false;
};

const handleSignup = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if (
    $("#user").val() == "" ||
    $("#pass").val() == "" ||
    $("#pass2").val() == ""
  ) {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  sendAjax(
    "POST",
    $("#signupForm").attr("action"),
    $("#signupForm").serialize(),
    redirect
  );

  return false;
};

const LoginWindow = props => {
  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <form
          id="loginForm"
          name="loginForm"
          onSubmit={handleLogin}
          action="/login"
          method="POST"
        >
          <br />
          {/* <label htmlFor="username">Username: </label> */}
          <input
            id="user"
            className="logInput"
            type="text"
            name="username"
            placeholder="Username"
          />
          {/* <label htmlFor="pass">Password: </label> */}
          <input
            id="pass"
            className="logInput"
            type="password"
            name="pass"
            placeholder="Password"
          />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input className="formSubmit" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
};

const SignupWindow = props => {
  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <form
          id="signupForm"
          name="signupForm"
          onSubmit={handleSignup}
          action="/signup"
          method="POST"
          className="mainForm"
        >
          <br />
          <label htmlFor="username">Username: </label>
          <input id="user" type="text" name="username" placeholder="username" />
          <label htmlFor="pass">Password: </label>
          <input id="pass" type="password" name="pass" placeholder="password" />
          <label htmlFor="pass2">Password: </label>
          <input
            id="pass2"
            type="password"
            name="pass2"
            placeholder="retype password"
          />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

//render the pages in react
const createLoginWindow = csrf => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = csrf => {
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

//attach events to the page btns
//user hits login or signup pgs UI re-render with correct html w/out changing pg
//default to LoginWindow view
const setup = csrf => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", e => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", e => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); //default view
};

//get new CSRF token
const getToken = () => {
  sendAjax("GET", "/getToken", null, result => {
    setup(result.csrfToken);
  });
};

//pg loads get token and setup the rest of the page to show our react components
$(document).ready(function() {
  getToken();
});
