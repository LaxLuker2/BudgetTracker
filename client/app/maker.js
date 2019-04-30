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
          The purpose of Budget Tracker is for you to enter in information on
          how your spending your money on bills, or items you pay for like
          tickets, a tv, snowmobile, etc. This in turn allows you to know how
          much you are spending.
        </h3>
        <br />
        <h3 className="whatIsDomoAge">
          This allows you to track your finances to be able to budget your money
          correctly. We all know that if we see something we like we
          automatically think “oh I have to get this” without thinking of if you
          will have the money in the long run. You don't know what will come
          around the corner unexpectedly . So this will allow you to know if you
          can spend a certain amount of money on an event or tickets or a tv
          today and be financially stable later. Allowing you the consumer to
          know and track your money that you have worked so hard to earn and
          plan correctly for the future while living and enjoying life today!
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

const BecomeASponsorWindow = props => {
  return (
    <div className="becomeASponsor">
      <img class="mainImg" src="/assets/img/brand.png" alt="Budget Tracker" />
      <section id="content">
        <h3 className="whatIsDomoName">
          Does Your Company Want To Be Come A Sponsor?
        </h3>
        <br />
        <h3 className="whatIsDomoAge">
          Would you like to spread become a sponsor of BudgetTracker and show
          your company's picture/ad on our website? If So please contact myself
          at the contact information below.
        </h3>
        <br />
        <h3 className="whatIsDomoAge">
          Please include your companys name and contact information when you
          send the text or email!
        </h3>
        <br />
        <h3 className="whatIsDomoSkill">
          Email: Moe.BudgetTracker@gmail.com
          <br />
          Phone: (347)942-8290
          <br /> &copy;BudgetTracker
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

  //Object of bills by date. Will contain an array for each day.
  //Contents of those arrays will be bill objects
  let billsByDate = {};

  //Loop through all of the bills we have gotten back
  for (let i = 0; i < props.domos.length; i++) {
    let bill = props.domos[i];
    let billDate = new Date(bill.createdData);
    let formatted = formateDate(billDate);

    //Create the array if it doesn't exist
    if (billsByDate[formatted] === undefined) {
      billsByDate[formatted] = [];
    }

    //Create the bill object and add it to the array for the current date
    let billObject = {
      date: formatted,
      rent: bill.rent,
      amount: bill.amount,
      paymentTime: bill.paymentTime
    };

    billsByDate[formatted].push(billObject);
  }

  //Create an array to hold our JSX for the table
  let ct = [];
  //Get an array of all the keys (days) in billsByDate)
  let dateKeys = Object.keys(billsByDate);

  //For every date, do the following
  for (let i = 0; i < dateKeys.length; i++) {
    //Create a new array to store the jsx html version of each days bills
    let dateBills = [];

    //For each bill (we index into billsByDate by the string key
    //from date keys to get that days bills))
    for (let j = 0; j < billsByDate[dateKeys[i]].length; j++) {
      //Create a jsx object for each bill and add it to the array
      dateBills.push(
        <tr>
          <td className="billsTableWidths">
            {billsByDate[dateKeys[i]][j].rent}
          </td>
          <td className="billsTableWidths">
            {billsByDate[dateKeys[i]][j].amount}
          </td>
          <td className="billsTableWidths">
            {billsByDate[dateKeys[i]][j].paymentTime}
          </td>
        </tr>
      );
    }

    //Once we have jsx for each bill, add them into a table for the day
    ct.push(
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th colSpan={3}>{dateKeys[i]}</th>
          </tr>
        </thead>
        <tbody>{dateBills}</tbody>
      </table>
    );
  }

  //Once we have each day as a table, render them all
  return (
    <div>
      <img
        className="mainImg"
        src="/assets/img/brand.png"
        alt="Budget Tracker"
      />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="billsTableWidths">
              Type
            </th>
            <th scope="col" className="billsTableWidths">
              Amount
            </th>
            <th scope="col" className="billsTableWidths">
              Payment Time
            </th>
          </tr>
        </thead>
      </table>
      {ct}
    </div>
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

const createWhatIsBTWindow = csrf => {
  ReactDOM.render(
    <WhatIsBTWindow csrf={csrf} />,
    document.querySelector("#domos")
  );
};

const createBecomeASponsorWindow = csrf => {
  ReactDOM.render(
    <BecomeASponsorWindow csrf={csrf} />,
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

  const becomeASponsorButton = document.querySelector("#becomeASponsorButton");
  becomeASponsorButton.addEventListener("click", e => {
    e.preventDefault();
    createBecomeASponsorWindow(csrf);
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
