import React, { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddOutgoingPayment() {
  // state values
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [id, setId] = useState("");
  const [selection, setSelection] = useState("");

  // history for navigation after form submission
  const history = useHistory();

  // imported values from the store
  const { allDealers, addOutgoingPayment } = useContext(DataContext);

  // form states with useInput hook
  const {
    enteredValue: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    valueBlurHandler: dateBlurHandler,
    reset: dateReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    valueBlurHandler: amountBlurHandler,
    reset: amountReset,
  } = useInput(value => value.trim().length !== 0 && value >= 1);

  // form validations
  const formIsValid = dateIsValid && amountIsValid && selection !== "";

  // handling changes for select option and prefilling phone number
  const selectNameChange = event => {
    setSelection(event.target.value);
    const temp = allDealers.filter(dealer => dealer._id === event.target.value);
    setName(temp[0].name);
    setId(temp[0]._id);
    setMobile(temp[0].number);
  };

  // handle submit
  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    //     {
    //   "amount": 2000,
    //   "date": "2021-12-08",
    //   "name": "skyline",
    //   "number": 7567829363
    // }

    // constructing form for the body in the request
    const formData = {
      amount,
      date,
      name,
      number: mobile,
    };

    // console.log(formData);

    // resetting the form data
    dateReset();
    amountReset();

    // sending data to the backend and navigating to all outgoing payment page
    addOutgoingPayment(formData, id);
    swal(
      "Success!",
      "Payment added to the All Outgoing Payments tab!",
      "success"
    );

    setTimeout(() => {
      history.push("/all-outgoing-payments");
    }, 1000);
  };

  return (
    <main>
      <div className="main__container">
        <form onSubmit={handleSubmit} className="ui form">
          <h3 className="ui dividing header">Add an Outgoing Payment</h3>
          <div className="two fields">
            <div className={`required field ${dateHasError ? "error" : ""}`}>
              <label>Date</label>
              <input
                value={date}
                onChange={dateChangeHandler}
                onBlur={dateBlurHandler}
                type="date"
              />
            </div>
            <div className="required field">
              <div className="required field">
                <label>Name</label>
                <select
                  className="ui dropdown"
                  value={selection}
                  onChange={event => selectNameChange(event)}
                >
                  <option value="">Select dealer</option>
                  {allDealers.map(dealer => {
                    return (
                      <option key={dealer._id} value={dealer._id}>
                        {dealer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="two fields">
            <div className="required field">
              <label>Mobile Number</label>
              <input value={mobile} disabled={true} type="number" />
            </div>
            <div className={`required field ${amountHasError ? "error" : ""}`}>
              <label>Amount</label>
              <input
                value={amount}
                onChange={amountChangeHandler}
                onBlur={amountBlurHandler}
                type="number"
                placeholder="Amount Paid"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Outgoing Payment
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddOutgoingPayment;
