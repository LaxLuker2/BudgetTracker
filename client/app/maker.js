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
  // let billDate = new Date();

  //else use map to create UI for each Finance bill stored
  //every bill will generate a bill tr and add to domoNodes
  const domoNodes = props.domos.map(function(domo) {
    // billDate = domo.createdData;
    return (
      <tr key={domo._id}>
        <td>{domo.createdData}</td>
        <td>{domo.rent}</td>
        <td>{domo.amount}</td>
        <td>{domo.paymentTime}</td>
      </tr>
    );
  });

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
    <div>
      {/* <table>
         <tr>
        <th colspan="2">{formateDate(billDate)}</th>
      </tr>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
        {domoNodes}
      </table> */}
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
        <tbody>{domoNodes}</tbody>
      </table>
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

//setup the render
const setup = function(csrf) {
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
