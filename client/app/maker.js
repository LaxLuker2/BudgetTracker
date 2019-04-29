//make react comps

const handleFinances = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: "hide" }, 350);

  if (
    $("#typeOfBill").val() == "" ||
    $("#amount").val() == "" ||
    $("#paymentTime").val() == ""
  ) {
    handleError(
      "Please enter your the type, the amount, and select a correct payment time"
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

//react JSX for add Finance Bill form
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
        id="paymentTime"
        name="paymentTime"
        className="btn btn-secondary dropdown"
        onchange="onDropDownClick()"
      >
        <option value="">Payment Time</option>
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
        <option value="Year">Year</option>
      </select>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="btn rentSubmit" type="submit" value="Submit Bill" />
    </form>
  );
};

const WhatIsBTWindow = props => {
  return (
    <div className="whatIsBT">
      <img class="mainImg" src="/assets/img/brand.png" alt="Budget Tracker" />
      <section id="content">
        <h3 className="whatIsDomoName">
          Purpose: The purpose of Budget Tracker is for you to enter your
          information on how your spending your money on bills, or items you pay
          for like tickets, a tv, snowmobile, etc and know how much you are
          spending.
        </h3>
        <br />
        <h3 className="whatIsDomoAge">
          This allows you to track your financies if you can spend a certain
          amount of money on an event or tickets or what not today and be
          financially stable later. Allowing you the consumer to know and track
          your money that you have worked so hard to earn and plan correctly for
          the future while living and enjoying life today!
        </h3>
        <br />
        <h3 className="whatIsDomoSkill">
          All your entered information is secured and protected so that only YOU
          see your information! &copy;BudgetTracker
        </h3>
      </section>
    </div>
  );
};

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

  //find current date of bill
  let date = new Date();

  //array of bills dates
  let billsByDate = {};

  //else use map to create UI for each Finance bill stored
  //every bill will generate a bill tr and add to domoNodes
  const domoNodes = props.domos.map(function(domo) {
    let billDate = new Date(domo.createdData);
    let formatted = formateDate(billDate);
    date = formatted;

    if (billsByDate != formatted) {
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

    billsByDate[formatted].push(
      <tr key={domo._id}>
        <td>{formatted}</td>
        <td>{domo.rent}</td>
        <td>{domo.amount}</td>
        <td>{domo.paymentTime}</td>
      </tr>
    );
    // billsByDate[formatted][domo] = (
    //   <tr key={domo._id}>
    //     <td>{formatted}</td>
    //     <td>{domo.rent}</td>
    //     <td>{domo.amount}</td>
    //     <td>{domo.paymentTime}</td>
    //   </tr>
    // );

    console.log("billsByDate");
    console.log(billsByDate);

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

    return billsByDate;
  });

  console.log(domoNodes);
  console.log("domoNodes");

  let createdTables = {};

  for (var i = 0; i < domoNodes.length; i++) {
    createdTables += (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th colspan="4">{billsByDate[i]}</th>
          </tr>
        </thead>
        <tbody>{billsByDate[i]}</tbody>
      </table>
    );
  }

  console.log(createdTables);
  console.log("createdTables");

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
    <div>
      <img
        className="mainImg"
        src="/assets/img/brand.png"
        alt="Budget Tracker"
      />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Time</th>
          </tr>
        </thead>
      </table>
      {createdTables}
    </div>
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
const loadFinancesFromServer = () => {
  sendAjax("GET", "/getDomos", null, data => {
    ReactDOM.render(
      <FinanceList domos={data.domos} />,
      document.querySelector("#domos")
    );
  });
};

const createWhatIsBTWindow = csrf => {
  ReactDOM.render(
    <WhatIsBTWindow csrf={csrf} />,
    document.querySelector("#domos")
  );
};

//setup the render
const setup = function(csrf) {
  //what is Budget Tracker Window
  const whatIsBTButton = document.querySelector("#whatIsBTButton");
  whatIsBTButton.addEventListener("click", e => {
    e.preventDefault();
    createWhatIsBTWindow(csrf);
    return false;
  });

  ReactDOM.render(<RentForm csrf={csrf} />, document.querySelector("#rent"));

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
