import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddDealerForm() {
  // imports from store with useContext
  const { addDealer } = useContext(DataContext);
  // usage of useHistory hook to navigate after submission is made
  const history = useHistory();

  // with help of useInput hook initialising and validating state input values
  const {
    enteredValue: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(value => value.includes("@"));

  const {
    enteredValue: number,
    isValid: numberIsValid,
    hasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    valueBlurHandler: numberBlurHandler,
    reset: numberReset,
  } = useInput(value => value.trim().length !== 0 && value.length === 10);

  const {
    enteredValue: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(value => value.trim().length !== 0);

  // checking form validity
  let ifEmailIsEnteredAndValid;

  if (email.trim().length === 0) {
    ifEmailIsEnteredAndValid = true;
  } else {
    ifEmailIsEnteredAndValid = email.trim().length !== 0 && emailIsValid;
  }

  const formIsValid =
    nameIsValid && addressIsValid && numberIsValid && ifEmailIsEnteredAndValid;

  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    // schema for sending request body
    //       {
    //   "name": "skyline",
    //   "email": "",
    //   "number": 7567829363,
    //   "address": "Morbi",
    //   "bills": [],
    //   "firstPaymentPaid": false,
    //   "totalAmountPaid": 0,
    //   "totalAmountPending": 0
    // }

    const formData = {
      name,
      email,
      number,
      address,
      bills: [],
      firstPaymentPaid: false,
      totalAmountPaid: 0,
      totalAmountPending: 0,
    };

    // console.log(formData);

    nameReset();
    emailReset();
    addressReset();
    numberReset();

    // sending form data to the function in store to add to the tables
    addDealer(formData);
    swal("Success!", "DEaler added to the All Dealers tab!", "success");

    setTimeout(() => {
      history.push("/all-dealers");
    }, 1000);
  };

  return (
    <main>
      <div className="main__container">
        <form className="ui form" onSubmit={handleSubmit}>
          <h3 className="ui dividing header">Add a new Dealer</h3>
          <div className="two fields">
            <div className={`required field ${nameHasError ? "error" : ""}`}>
              <label>Name</label>
              <input
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                type="text"
                placeholder="Dealer Name"
              />
            </div>
            <div
              className={`field ${
                ifEmailIsEnteredAndValid && !emailHasError ? "" : "error"
              }`}
            >
              <label>Email</label>
              <input
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                type="email"
                placeholder="Dealer Email"
              />
            </div>
          </div>
          <div className="two fields">
            <div className={`required field ${numberHasError ? "error" : ""}`}>
              <label>Mobile Number</label>
              <input
                value={number}
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                type="number"
                placeholder="Dealer Mobile Number"
              />
            </div>
            <div className={`required field ${addressHasError ? "error" : ""}`}>
              <label>Address</label>
              <textarea
                value={address}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                rows="2"
                placeholder="Dealer Address"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Dealer
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddDealerForm;
