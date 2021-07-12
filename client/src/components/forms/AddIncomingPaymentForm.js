import React, { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddIncomingPaymentForm() {
  // state values for the form
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [id, setId] = useState("");
  const [selection, setSelection] = useState("");

  // history object to navigate
  const history = useHistory();

  // importing required data from store
  const { allClients, addIncomingPayment } = useContext(DataContext);

  // form state values with useInput hook
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

  // validating form
  const formIsValid = dateIsValid && amountIsValid && selection !== "";

  // selection of a client from dropdown and then prefilling the mobile number input
  const selectNameChange = event => {
    setSelection(event.target.value);
    const temp = allClients.filter(client => client._id === event.target.value);
    setName(temp[0].name);
    setId(temp[0]._id);
    setMobile(temp[0].number);
  };

  // handling submission of the form
  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    //       {
    //   "amount": 5000,
    //   "date": "2021-12-08",
    //   "name": "hightech furniture",
    //   "number": 7567829363
    // }

    const formData = {
      amount,
      date,
      name,
      number: mobile,
    };

    // console.log(formData);

    dateReset();
    amountReset();

    addIncomingPayment(formData, id);
        swal("Success!", "Incoming payment added to the All Incoming Payments tab!", "success");

    setTimeout(() => {
      history.push("/all-incoming-payments");
    }, 1000);
  };
  return (
    <main>
      <div className="main__container">
        <form className="ui form" onSubmit={handleSubmit}>
          <h3 className="ui dividing header">Add an Incoming Payment</h3>
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
                  <option value="">Select Client</option>
                  {allClients.map(client => {
                    return (
                      <option key={client._id} value={client._id}>
                        {client.name}
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
              <input
                value={mobile}
                disabled={true}
                type="number"
              />
            </div>
            <div className={`required field ${amountHasError ? "error" : ""}`}>
              <label>Amount</label>
              <input
                value={amount}
                onChange={amountChangeHandler}
                onBlur={amountBlurHandler}
                type="number"
                placeholder="Amount Received"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Incoming Payment
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddIncomingPaymentForm;
