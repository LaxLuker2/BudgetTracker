"use strict";

//make react comps
// const handleDomo = e => {
//   e.preventDefault();

//   $("#domoMessage").animate({ width: "hide" }, 350);

//   if (
//     $("#domoName").val() == "" ||
//     $("#domoAge").val() == "" ||
//     $("#domoSkill").val() == ""
//   ) {
//     handleError("RAWR! All fields are required");
//     return false;
//   }

//   sendAjax(
//     "POST",
//     $("#domoForm").attr("action"),
//     $("#domoForm").serialize(),
//     function() {
//       loadDomosFromServer();
//     }
//   );

//   return false;
// };

var handleFinances = function handleFinances(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if ($("#typeOfBill").val() == "" || $("#amount").val() == "" || $("#paymentDateDropDown").val() == "") {
    handleError("Please enter your the type, the amount, and select a correct payment date");
    return false;
  }

  sendAjax("POST", $("#rentForm").attr("action"), $("#rentForm").serialize(), function () {
    loadFinancesFromServer();
  });

  return false;
};

// const deleteDomo = e => {
//   e.preventDefault();

//   $("#domoMessage").animate({ width: "hide" }, 350);

//   console.log("delete all");

//   sendAjax("DELETE", $("#deleteDomo").attr("action"), function() {
//     deleteDomosFromServer();
//   });

//   return false;
// };

//react JSX for add domo form
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
        id: "paymentDateDropDown",
        className: "btn btn-secondary dropdown",
        onchange: "onDropDownClick()"
      },
      React.createElement(
        "option",
        { value: "" },
        "Payment Date"
      ),
      React.createElement(
        "option",
        { value: "day" },
        "Day"
      ),
      React.createElement(
        "option",
        { value: "month" },
        "Month"
      ),
      React.createElement(
        "option",
        { value: "year" },
        "Year"
      )
    ),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "btn rentSubmit", type: "submit", value: "Submit Bill" })
  );
};

// //react JSX for add domo form
// const DomoForm = props => {
//   return (
//     <form
//       id="domoForm"
//       onSubmit={handleDomo}
//       name="domoForm"
//       action="/maker"
//       method="POST"
//       className="domoForm"
//     >
//       <label htmlFor="name">Rent: </label>
//       <input id="usersRent" type="text" name="rent" placeholder="Rent" />
//       <label htmlFor="age">Age: </label>
//       <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
//       <label htmlFor="skill">Skill: </label>
//       <input
//         id="domoSkill"
//         type="text"
//         name="skill"
//         placeholder="Domos Skill"
//       />
//       <input type="hidden" name="_csrf" value={props.csrf} />
//       <input className="makeDomoSubmit" type="submit" value="Make Domo" />
//     </form>
//   );
// };

// const WhatIsADomoWindow = props => {
//   return (
//     <div className="whatIsdomo">
//       <img
//         src="/assets/img/domoface.jpeg"
//         alt="domo face"
//         className="domoFace"
//       />
//       <h3 className="whatIsDomoName">
//         Name: A Domo gets his name from his very own creator
//       </h3>
//       <br />
//       <h3 className="whatIsDomoAge">Age: A Domo lives and never dies.</h3>
//       <br />
//       <h3 className="whatIsDomoSkill">
//         Skill: Domos are legends that are never forgotton with the skills of
//         gods!
//       </h3>
//     </div>
//   );
// };

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

  //find current date
  var newD = new Date();
  // let isIt = isToday(newD);
  var billDate = new Date();

  // console.log(isIt);

  // if (isIt) {
  //   //dont want to add header bar with new date
  // } else {
  //   //add new header to seperate
  // }

  //else use map to create UI for each Finance bill stored
  //every bill will generate a bill tr and add to domoNodes
  var domoNodes = props.domos.map(function (domo) {
    // return (
    //   <div key={domo._id} className="domo">
    //     {/* <img
    //       src="/assets/img/domoface.jpeg"
    //       alt="domo face"
    //       className="domoFace"
    //     /> */}
    //     <h3 className="domoName">Rent: {domo.rent}</h3>
    //   </div>
    // );
    billDate = domo.createdData;
    return React.createElement(
      "tr",
      { key: domo._id },
      React.createElement(
        "td",
        null,
        formateDate(domo.createdData)
      ),
      React.createElement(
        "td",
        null,
        domo.rent
      ),
      React.createElement(
        "td",
        null,
        domo.amount
      )
    );
  });
  console.log(billDate);

  //check if date create is same as current date
  // let isItSameDay = isToday(billDate);

  // console.log(isItSameDay);

  // if (isItSameDay) {
  //dont want to add header bar with new date
  // } else {
  //add new header to seperate
  // }

  //render out a domoList with our domoNodes array
  // return <div className="domoList">{domoNodes}</div>;
  return React.createElement(
    "table",
    null,
    React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        null,
        "Date"
      ),
      React.createElement(
        "th",
        null,
        "Type"
      ),
      React.createElement(
        "th",
        null,
        "Amount"
      )
    ),
    domoNodes
  );
};

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

//delete all domos
// const deleteDomosFromServer = () => {
//   sendAjax("DELETE", "/deleteDomos", null, data => {
//     ReactDOM.render(<DomoList domos={[]} />, document.querySelector("#domos"));
//   });
// };

// const createWhatIsADomoWindow = csrf => {
//   ReactDOM.render(
//     <WhatIsADomoWindow csrf={csrf} />,
//     document.querySelector("#domos")
//   );
// };

var setup = function setup(csrf) {
  // const whatIsADomoButton = document.querySelector("#whatIsADomoButton");

  // whatIsADomoButton.addEventListener("click", e => {
  //   e.preventDefault();
  //   createWhatIsADomoWindow(csrf);
  //   return false;
  // });

  ReactDOM.render(React.createElement(RentForm, { csrf: csrf }), document.querySelector("#rent"));
  // ReactDOM.render(<WageForm csrf={csrf} />, document.querySelector("#wage"));
  // ReactDOM.render(
  //   <ExpenseForm csrf={csrf} />,
  //   document.querySelector("#expenses")
  // );

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

//get value of drop down
var onDropDownClick = function onDropDownClick() {
  alert($("#myddl").val());
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
