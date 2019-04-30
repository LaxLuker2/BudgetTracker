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
        "Purpose: The purpose of Budget Tracker is for you to enter your information on how your spending your money on bills, or items you pay for like tickets, a tv, snowmobile, etc and know how much you are spending."
      ),
      React.createElement("br", null),
      React.createElement(
        "h3",
        { className: "whatIsDomoAge" },
        "This allows you to track your financies if you can spend a certain amount of money on an event or tickets or what not today and be financially stable later. Allowing you the consumer to know and track your money that you have worked so hard to earn and plan correctly for the future while living and enjoying life today!"
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
  var date = new Date();

  //array of bills dates
  var billsByDate = [];

  //else use map to create UI for each Finance bill stored
  //every bill will generate a bill tr and add to domoNodes
  var domoNodes = props.domos.map(function (domo) {
    var billDate = new Date(domo.createdData);
    var formatted = formateDate(billDate);
    date = formatted;

    if (billsByDate[formatted] === undefined) {
      //add element to billsByDate
      billsByDate[formatted] = [];
      // billsByDate[formatted].push(
      //   <tr key={domo._id}>
      //     <td>{formatted}</td>
      //     <td>{domo.rent}</td>
      //     <td>{domo.amount}</td>
      //     <td>{domo.paymentTime}</td>
      //   </tr>
      // );
    }

    // console.log(formatted);
    // console.log(billsByDate[formatted]);

    var billObject = {
      date: formatted,
      rent: domo.rent,
      amount: domo.amount,
      paymentTime: domo.paymentTime
    };

    billsByDate.push(billObject);
    // billsByDate[formatted][domo] = (
    //   <tr key={domo._id}>
    //     <td>{formatted}</td>
    //     <td>{domo.rent}</td>
    //     <td>{domo.amount}</td>
    //     <td>{domo.paymentTime}</td>
    //   </tr>
    // );

    // console.log("billsByDate");
    // console.log(billsByDate);

    //let keys = Object.keys(billsByDate);

    // let createdTables;

    // for (var i = 0; i < billsByDate.length; i++) {
    //   createdTables += (
    //     <table className="table">
    //       <thead className="thead-light">
    //         <tr>
    //           <th colspan="4">{billsByDate[i]}</th>
    //         </tr>
    //       </thead>
    //       <tbody>{billsByDate[i][i]}</tbody>
    //     </table>
    //   );
    // }

    // console.log(createdTables);
    // console.log("createdTables");

    // let keys = Object.keys(billsByDate);

    // for (var i = 0; i < keys.length; i++) {
    //   console.log(billsByDate);
    //   console.log("billsByDate");
    //   console.log(billObject);
    //   console.log("billObject");
    // }

    return billsByDate;
  });

  console.log(domoNodes[0]);
  console.log("domoNodes[0]");

  console.log(domoNodes[0][0]);
  console.log("domoNodes[0][0]");
  console.log(domoNodes[0][1]);
  console.log("domoNodes[0][1]");

  var ct = [];

  for (var i = 0; i < domoNodes[0].length; i++) {
    if (i + 1 < domoNodes[0].length) {
      if (domoNodes[0][i][date] == domoNodes[0][i + 1][date]) {
        ct += React.createElement(
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
                { colspan: "4" },
                domoNodes[0][i][date]
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                domoNodes[0][i][date]
              ),
              React.createElement(
                "td",
                null,
                domoNodes[0][i][amount]
              ),
              React.createElement(
                "td",
                null,
                domoNodes[0][i][paymentTime]
              )
            )
          )
        );
      }
    }
  }

  console.log("ct");
  console.log(ct);

  // let createdTables = [];
  // for (var i = 0; i < domoNodes.length; i++) {
  //   console.log(billsByDate);
  //   console.log("billsByDate");
  //   console.log(billObject);
  //   console.log("billObject");
  // }

  // for (var i = 0; i < keys.length; i++) {
  //   createdTables.push(
  //     <table className="table">
  //       <thead className="thead-light">
  //         <tr>
  //           <th colspan="4">{keys[i]}</th>
  //         </tr>
  //       </thead>
  //       <tbody>{billObject[i][i]}</tbody>
  //     </table>
  //   );
  // }

  // let keys = Object.keys(domoNodes);

  // let createdTables = [];

  // for (var i = 0; i < keys.length; i++) {
  //   createdTables.push(
  //     <table className="table">
  //       <thead className="thead-light">
  //         <tr>
  //           <th colspan="4">{keys[i]}</th>
  //         </tr>
  //       </thead>
  //       <tbody>{keys[i]}</tbody>
  //     </table>
  //   );
  // }

  // console.log(createdTables);
  // console.log("createdTables");

  // console.log(billDate);

  //check if date create is same as todays date
  // let isItSameDay = isToday(billDate);

  // console.log(isItSameDay);

  // if (isItSameDay) {
  //dont want to add header bar with new date so just add the finace info
  // } else {
  //add new header to seperate the old data with new
  // }

  //render out a domoList with our domoNodes array
  // return <div className="domoList">{domoNodes}</div>;
  return (
    // <div>
    //   <img
    //     className="mainImg"
    //     src="/assets/img/brand.png"
    //     alt="Budget Tracker"
    //   />
    //   <table className="table">
    //     <thead className="thead-dark">
    //       <tr>
    //         <th scope="col">Date</th>
    //         <th scope="col">Type</th>
    //         <th scope="col">Amount</th>
    //         <th scope="col">Payment Time</th>
    //       </tr>
    //     </thead>
    //     <tbody>{domoNodes}</tbody>
    //   </table>
    //   <table className="table">
    //     <thead className="thead-light">
    //       <tr>
    //         <th colspan="4">{date}</th>
    //       </tr>
    //     </thead>
    //     <tbody>{domoNodes}</tbody>
    //   </table>
    // </div>
    React.createElement(
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
              { scope: "col" },
              "Date"
            ),
            React.createElement(
              "th",
              { scope: "col" },
              "Type"
            ),
            React.createElement(
              "th",
              { scope: "col" },
              "Amount"
            ),
            React.createElement(
              "th",
              { scope: "col" },
              "Payment Time"
            )
          )
        )
      ),
      ct
    )
  );
};

//using for project 3
// let something;
// billDate = domo.createdData;
// console.log(billDate);

// //check if date create is same as current date
// let isItSameDay = isToday(domo.createdData);

// console.log(isItSameDay);

// if (isItSameDay) {
//   //dont want to add header bar with new date
//   something = (
//     <table id="fin-table">
//       <tr>
//         <th colspan="2">{formateDate(domo.createdData)}</th>
//       </tr>
//       <tr>
//         <th>Type</th>
//         <th>Amount</th>
//       </tr>
//       <tr key={domo._id}>
//         <td>{domo.rent}</td>
//         <td>{domo.amount}</td>
//         <td>{domo.createdData}</td>
//       </tr>
//     </table>
//   );
// } else {
//   //add new header to seperate
//   something = (
//     <table id="fin-table2">
//       <tr>
//         <th colspan="2">{formateDate(domo.createdData)}</th>
//       </tr>
//       <tr>
//         <th>Type</th>
//         <th>Amount</th>
//       </tr>
//       <tr key={domo._id}>
//         <td>{domo.rent}</td>
//         <td>{domo.amount}</td>
//         <td>{domo.createdData}</td>
//       </tr>
//     </table>
//   );

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

//setup the render
var setup = function setup(csrf) {
  //what is Budget Tracker Window
  var whatIsBTButton = document.querySelector("#whatIsBTButton");
  whatIsBTButton.addEventListener("click", function (e) {
    e.preventDefault();
    createWhatIsBTWindow(csrf);
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
