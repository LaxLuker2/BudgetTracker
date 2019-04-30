"use strict";

//make react comps

var handleFinances = function handleFinances(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#typeOfBill").val() == "" || $("#amount").val() == "" || $("#paymentTime").val() == "") {
    handleError("Please enter your the type, the amount, and select a correct payment time");
    return false;
  }

  sendAjax("POST", $("#rentForm").attr("action"), $("#rentForm").serialize(), function () {
    loadFinancesFromServer();
  });

  return false;
};

//react JSX for add Finance Bill form
var RentForm = function RentForm(props) {
  return React.createElement(
    "form",
    {
      id: "rentForm",
      onSubmit: handleFinances,
      name: "rentForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "label",
      { htmlFor: "rent" },
      "Type: "
    ),
    React.createElement("input", {
      id: "typeOfBill",
      type: "text",
      name: "rent",
      placeholder: "Rent or Salary"
    }),
    React.createElement(
      "label",
      { htmlFor: "amount" },
      "Amount: "
    ),
    React.createElement("input", { id: "amount", type: "number", name: "amount", placeholder: "Amount" }),
    React.createElement(
      "select",
      {
        id: "paymentTime",
        name: "paymentTime",
        className: "btn btn-secondary dropdown",
        onchange: "onDropDownClick()"
      },
      React.createElement(
        "option",
        { value: "" },
        "Payment Time"
      ),
      React.createElement(
        "option",
        { value: "Day" },
        "Day"
      ),
      React.createElement(
        "option",
        { value: "Week" },
        "Week"
      ),
      React.createElement(
        "option",
        { value: "Month" },
        "Month"
      ),
      React.createElement(
        "option",
        { value: "Year" },
        "Year"
      )
    ),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "btn rentSubmit", type: "submit", value: "Submit Bill" })
  );
};

var WhatIsBTWindow = function WhatIsBTWindow(props) {
  return React.createElement(
    "div",
    { className: "whatIsBT" },
    React.createElement("img", { "class": "mainImg", src: "/assets/img/brand.png", alt: "Budget Tracker" }),
    React.createElement(
      "section",
      { id: "content" },
      React.createElement(
        "h3",
        { className: "whatIsDomoName" },
        "The purpose of Budget Tracker is for you to enter in information on how your spending your money on bills, or items you pay for like tickets, a tv, snowmobile, etc. This in turn allows you to know how much you are spending."
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoAge" },
        "This allows you to track your finances to be able to budget your money correctly. We all know that if we see something we like we automatically think \u201Coh I have to get this\u201D without thinking of if you will have the money in the long run. You don't know what will come around the corner unexpectedly . So this will allow you to know if you can spend a certain amount of money on an event or tickets or a tv today and be financially stable later. Allowing you the consumer to know and track your money that you have worked so hard to earn and plan correctly for the future while living and enjoying life today!"
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoSkill" },
        "All your entered information is secured and protected so that only YOU see your information! \xA9BudgetTracker"
      )
    )
  );
};

var BecomeASponsorWindow = function BecomeASponsorWindow(props) {
  return React.createElement(
    "div",
    { className: "becomeASponsor" },
    React.createElement("img", { "class": "mainImg", src: "/assets/img/brand.png", alt: "Budget Tracker" }),
    React.createElement(
      "section",
      { id: "content" },
      React.createElement(
        "h3",
        { className: "whatIsDomoName" },
        "Does Your Company Want To Be Come A Sponsor?"
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoAge" },
        "Would you like to spread become a sponsor of BudgetTracker and show your company's picture/ad on our website? If So please contact myself at the contact information below."
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoAge" },
        "Please include your companys name and contact information when you send the text or email!"
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoSkill" },
        "Email: Moe.BudgetTracker@gmail.com",
        React.createElement("br", null),
        "Phone: (347)942-8290",
        React.createElement("br", null),
        " \xA9BudgetTracker"
      )
    )
  );
};

//determine what to draw
//can update via Ajax and every time state updates page creates UI and shows
var FinanceList = function FinanceList(props) {
  //if empty show no domos yet
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Finances Recorded Yet"
      )
    );
  }

  //find current date of bill

  //Object of bills by date. Will contain an array for each day.
  //Contents of those arrays will be bill objects
  var billsByDate = {};

  //Loop through all of the bills we have gotten back
  for (var i = 0; i < props.domos.length; i++) {
    var bill = props.domos[i];
    var billDate = new Date(bill.createdData);
    var formatted = formateDate(billDate);

    //Create the array if it doesn't exist
    if (billsByDate[formatted] === undefined) {
      billsByDate[formatted] = [];
    }

    //Create the bill object and add it to the array for the current date
    var billObject = {
      date: formatted,
      rent: bill.rent,
      amount: bill.amount,
      paymentTime: bill.paymentTime
    };

    billsByDate[formatted].push(billObject);
  }

  //Create an array to hold our JSX for the table
  var ct = [];
  //Get an array of all the keys (days) in billsByDate)
  var dateKeys = Object.keys(billsByDate);

  //For every date, do the following
  for (var _i = 0; _i < dateKeys.length; _i++) {
    //Create a new array to store the jsx html version of each days bills
    var dateBills = [];

    //For each bill (we index into billsByDate by the string key
    //from date keys to get that days bills))
    for (var j = 0; j < billsByDate[dateKeys[_i]].length; j++) {
      //Create a jsx object for each bill and add it to the array
      dateBills.push(React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "billsTableWidths" },
          billsByDate[dateKeys[_i]][j].rent
        ),
        React.createElement(
          "td",
          { className: "billsTableWidths" },
          billsByDate[dateKeys[_i]][j].amount
        ),
        React.createElement(
          "td",
          { className: "billsTableWidths" },
          billsByDate[dateKeys[_i]][j].paymentTime
        )
      ));
    }

    //Once we have jsx for each bill, add them into a table for the day
    ct.push(React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        { className: "thead-light" },
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { colSpan: 3 },
            dateKeys[_i]
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        dateBills
      )
    ));
  }

  //Once we have each day as a table, render them all
  return React.createElement(
    "div",
    null,
    React.createElement("img", {
      className: "mainImg",
      src: "/assets/img/brand.png",
      alt: "Budget Tracker"
    }),
    React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        { className: "thead-dark" },
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { scope: "col", className: "billsTableWidths" },
            "Type"
          ),
          React.createElement(
            "th",
            { scope: "col", className: "billsTableWidths" },
            "Amount"
          ),
          React.createElement(
            "th",
            { scope: "col", className: "billsTableWidths" },
            "Payment Time"
          )
        )
      )
    ),
    ct
  );
};

//grab domos from server and render a Domolist
//since async we need to render on success
var loadFinancesFromServer = function loadFinancesFromServer() {
  sendAjax("GET", "/getDomos", null, function (data) {
    ReactDOM.render(React.createElement(FinanceList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var createWhatIsBTWindow = function createWhatIsBTWindow(csrf) {
  ReactDOM.render(React.createElement(WhatIsBTWindow, { csrf: csrf }), document.querySelector("#domos"));
};

var createBecomeASponsorWindow = function createBecomeASponsorWindow(csrf) {
  ReactDOM.render(React.createElement(BecomeASponsorWindow, { csrf: csrf }), document.querySelector("#domos"));
};

//setup the render
var setup = function setup(csrf) {
  //what is Budget Tracker Window
  var whatIsBTButton = document.querySelector("#whatIsBTButton");
  whatIsBTButton.addEventListener("click", function (e) {
    e.preventDefault();
    createWhatIsBTWindow(csrf);
    return false;
  });

  var becomeASponsorButton = document.querySelector("#becomeASponsorButton");
  becomeASponsorButton.addEventListener("click", function (e) {
    e.preventDefault();
    createBecomeASponsorWindow(csrf);
    return false;
  });

  ReactDOM.render(React.createElement(RentForm, { csrf: csrf }), document.querySelector("#rent"));

  ReactDOM.render(React.createElement(FinanceList, { domos: [] }), document.querySelector("#domos"));

  loadFinancesFromServer();
};

//get csrf token
var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

//pg loads get token and setup the rest of the page to show our react components
$(document).ready(function () {
  getToken();
});

//check date is today or not
var isToday = function isToday(someDate) {
  var today = new Date();
  return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
};

//format Date  https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
var formateDate = function formateDate(someDate) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var day = someDate.getDate();
  var month = months[someDate.getMonth()];

  return month + " " + day;
};

//setting the date
var todaysDate = function todaysDate() {
  var newDate = new Date();
  if (isToday(newDate)) {
    return true;
  } else {
    return false;
  }
};
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
