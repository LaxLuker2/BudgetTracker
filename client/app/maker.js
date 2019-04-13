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

const handleFinances = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if (
    $("#typeOfBill").val() == "" ||
    $("#amount").val() == "" ||
    $("#paymentDateDropDown").val() == ""
  ) {
    handleError(
      "Please enter your the type, the amount, and select a correct payment date"
    );
    return false;
  }

  sendAjax(
    "POST",
    $("#rentForm").attr("action"),
    $("#rentForm").serialize(),
    function() {
      loadFinancesFromServer();
    }
  );

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
const RentForm = props => {
  return (
    <form
      id="rentForm"
      onSubmit={handleFinances}
      name="rentForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="rent">Type: </label>
      <input
        id="typeOfBill"
        type="text"
        name="rent"
        placeholder="Rent or Salary"
      />
      <label htmlFor="amount">Amount: </label>
      <input id="amount" type="number" name="amount" placeholder="Amount" />
      <select
        id="paymentDateDropDown"
        className="btn btn-secondary dropdown"
        onchange="onDropDownClick()"
      >
        <option value="">Payment Date</option>
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="btn rentSubmit" type="submit" value="Submit Bill" />
    </form>
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
const FinanceList = function(props) {
  //if empty show no domos yet
  if (props.domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Finances Recorded Yet</h3>
      </div>
    );
  }

  //find current date
  let newD = new Date();
  let isIt = isToday(newD);

  console.log(isIt);

  if (isIt) {
    //dont want to add header bar with new date
  } else {
    //add new header to seperate
  }

  //else use map to create UI for each Finance bill stored
  //every bill will generate a bill tr and add to domoNodes
  const domoNodes = props.domos.map(function(domo) {
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
    return (
      <tr key={domo._id}>
        <td>{domo.rent}</td>
        <td>{domo.amount}</td>
      </tr>
    );
  });
  //render out a domoList with our domoNodes array
  // return <div className="domoList">{domoNodes}</div>;
  return (
    <table>
      <tr>
        <th colspan="2">{formateDate(newD)}</th>
      </tr>
      <tr>
        <th>Type</th>
        <th>Amount</th>
      </tr>
      {domoNodes}
    </table>
  );
};

//grab domos from server and render a Domolist
//since async we need to render on success
const loadFinancesFromServer = () => {
  sendAjax("GET", "/getDomos", null, data => {
    ReactDOM.render(
      <FinanceList domos={data.domos} />,
      document.querySelector("#domos")
    );
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

const setup = function(csrf) {
  // const whatIsADomoButton = document.querySelector("#whatIsADomoButton");

  // whatIsADomoButton.addEventListener("click", e => {
  //   e.preventDefault();
  //   createWhatIsADomoWindow(csrf);
  //   return false;
  // });

  ReactDOM.render(<RentForm csrf={csrf} />, document.querySelector("#rent"));
  // ReactDOM.render(<WageForm csrf={csrf} />, document.querySelector("#wage"));
  // ReactDOM.render(
  //   <ExpenseForm csrf={csrf} />,
  //   document.querySelector("#expenses")
  // );

  ReactDOM.render(<FinanceList domos={[]} />, document.querySelector("#domos"));

  loadFinancesFromServer();
};

//get csrf token
const getToken = () => {
  sendAjax("GET", "/getToken", null, result => {
    setup(result.csrfToken);
  });
};

//pg loads get token and setup the rest of the page to show our react components
$(document).ready(function() {
  getToken();
});

//check date is today or not
const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

//format Date  https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
const formateDate = someDate => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = someDate.getDate();
  let month = months[someDate.getMonth()];

  return month + " " + day;
};

//setting the date
const todaysDate = () => {
  const newDate = new Date();
  if (isToday(newDate)) {
    return true;
  } else {
    return false;
  }
};

//get value of drop down
const onDropDownClick = () => {
  alert($("#myddl").val());
};
