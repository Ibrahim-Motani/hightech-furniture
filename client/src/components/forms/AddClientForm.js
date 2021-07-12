import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddClientForm() {
  // imports from store with useContext
  const { addClient } = useContext(DataContext);
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

  // checking form validity for email
  let ifEmailIsEnteredAndValid;

  if (email.trim().length === 0) {
    ifEmailIsEnteredAndValid = true;
  } else {
    ifEmailIsEnteredAndValid = email.trim().length !== 0 && emailIsValid;
  }

  // checking overall form validity
  const formIsValid =
    nameIsValid && addressIsValid && numberIsValid && ifEmailIsEnteredAndValid;

  // submitting the form
  const handleSubmit = event => {
    event.preventDefault();
    // form will be submitted only if it is valid
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    // schema needed to be sent in the request body
    //     {
    //   "name": "hightech furniture",
    //   "email": "",
    //   "number": 7567829363,
    //   "address": "Hapa, Jamnagar",
    //   "bills": [],
    //   "firstPaymentRecieved": false,
    //   "totalAmountReceived": 0,
    //   "totalAmountPending": 0
    // }

    const formData = {
      name,
      email,
      number,
      address,
      bills: [],
      firstPaymentRecieved: false,
      totalAmountReceived: 0,
      totalAmountPending: 0,
    };

    // console.log(formData);

    nameReset();
    emailReset();
    addressReset();
    numberReset();

    // calling the imported function from store to add a new client and then navigating to the all clients page
    const result = addClient(formData);
    // console.log(result);
    swal("Success!", "Client added to the All Clients tab!", "success");

    setTimeout(() => {
      history.push("/all-clients");
    }, 1000);
  };

  return (
    <main>
      <div className="main__container">
        <form className="ui form" onSubmit={handleSubmit}>
          <h3 className="ui dividing header">Add a new Client</h3>
          <div className="two fields">
            <div className={`required field ${nameHasError ? "error" : ""}`}>
              <label>Name</label>
              <input
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                type="text"
                placeholder="Client Name"
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
                placeholder="Client Email"
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
                placeholder="Client Mobile Number"
              />
            </div>
            <div className={`required field ${addressHasError ? "error" : ""}`}>
              <label>Address</label>
              <textarea
                value={address}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                rows="2"
                placeholder="Client Address"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Client
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddClientForm;
