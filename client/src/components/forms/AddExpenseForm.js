import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

const AddExpenseForm = () => {
  // importing function from store to add expense to database
  const { addExpense } = useContext(DataContext);
  // using history object for navigation
  const history = useHistory();

  // initialising states with useInput hook for the form
  const {
    enteredValue: expenseName,
    isValid: expenseNameIsValid,
    hasError: expenseNameHasError,
    valueChangeHandler: expenseNameChangeHandler,
    valueBlurHandler: expenseNameBlurHandler,
    reset: expenseNameReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: expenseAmount,
    isValid: expenseAmountIsValid,
    hasError: expenseAmountHasError,
    valueChangeHandler: expenseAmountChangeHandler,
    valueBlurHandler: expenseAmountBlurHandler,
    reset: expenseAmountReset,
  } = useInput(value => value.trim().length !== 0 && value >= 1);

  const {
    enteredValue: expensePaidTo,
    isValid: expensePaidToIsValid,
    hasError: expensePaidToHasError,
    valueChangeHandler: expensePaidToChangeHandler,
    valueBlurHandler: expensePaidToBlurHandler,
    reset: expensePaidToReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: expenseDate,
    isValid: expenseDateIsValid,
    hasError: expenseDateHasError,
    valueChangeHandler: expenseDateChangeHandler,
    valueBlurHandler: expenseDateBlurHandler,
    reset: expenseDateReset,
  } = useInput(value => value.trim().length !== 0);

  // form validity checking
  const formIsValid =
    expenseNameIsValid &&
    expenseDateIsValid &&
    expensePaidToIsValid &&
    expenseAmountIsValid;

  // handling submission of form
  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    // schema design for request body
    //     {
    //   "name": "Expense 1",
    //   "amount": 1000,
    //   "date": "2021-06-09",
    //   "paidTo": "Hashim"
    // }

    const formData = {
      name: expenseName,
      amount: expenseAmount,
      date: expenseDate,
      paidTo: expensePaidTo,
    };

    // console.log(formData);

    // resetting form values
    expenseNameReset();
    expenseAmountReset();
    expenseDateReset();
    expensePaidToReset();

    // sending data to backend with imported function and navigating to all expenses page
    addExpense(formData);
    swal("Success!", "Expense added to the All Expenses tab!", "success");

    setTimeout(() => {
      history.push("/all-expenses");
    }, 1000);
  };

  return (
    <main>
      <div className="main__container">
        <form onSubmit={handleSubmit} className="ui form">
          <h3 className="ui dividing header">Add Expense</h3>
          <div
            className={`required field ${expenseNameHasError ? "error" : ""}`}
          >
            <label>Name</label>
            <input
              value={expenseName}
              onChange={expenseNameChangeHandler}
              onBlur={expenseNameBlurHandler}
              type="text"
            />
          </div>
          <div className="three fields">
            <div
              className={`required field ${
                expensePaidToHasError ? "error" : ""
              }`}
            >
              <label>Paid To</label>
              <input
                value={expensePaidTo}
                onChange={expensePaidToChangeHandler}
                onBlur={expensePaidToBlurHandler}
                type="text"
                placeholder="Paid To"
              />
            </div>
            <div
              className={`required field ${
                expenseAmountHasError ? "error" : ""
              }`}
            >
              <label>Amount</label>
              <input
                value={expenseAmount}
                onChange={expenseAmountChangeHandler}
                onBlur={expenseAmountBlurHandler}
                type="text"
                placeholder="Amount"
              />
            </div>
            <div
              className={`required field ${expenseDateHasError ? "error" : ""}`}
            >
              <label>Date</label>
              <input
                value={expenseDate}
                onChange={expenseDateChangeHandler}
                onBlur={expenseDateBlurHandler}
                type="date"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Expense
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
};

export default AddExpenseForm;
