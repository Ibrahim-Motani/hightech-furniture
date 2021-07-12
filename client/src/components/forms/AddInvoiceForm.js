import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddInvoiceForm() {
  // importing function from store
  const { addInvoice } = useContext(DataContext);
  // importing and using history for navigation after submission
  const history = useHistory();

  // this state is for dynamic adding and deleting of the products form part of the invoice form
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      name: "",
      price: "",
      quantity: 1,
    },
  ]);

  // more state variables to be used in the form
  const [amountPaidWhileOrderning, setAmountPaidWhileOrdering] = useState("");
  const [invoiceType, setInvoiceType] = useState("cash");

  // inputs for state initialised with useInput hook
  const {
    enteredValue: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    valueBlurHandler: dateBlurHandler,
    reset: dateReset,
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

  // validation of the overall form by validating email, other states and products forms
  let ifEmailIsEnteredAndValid;

  if (email.trim().length === 0) {
    ifEmailIsEnteredAndValid = true;
  } else {
    ifEmailIsEnteredAndValid = email.trim().length !== 0 && emailIsValid;
  }

  let productsFormIsValid = true;

  if (items.length < 1) {
    productsFormIsValid = false;
  } else if (items.length >= 1) {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i].name.trim().length === 0 ||
        items[i].price.trim().length === 0 ||
        items[i].price < 1 ||
        items[i].quantity < 1
      ) {
        productsFormIsValid = false;
        break;
      }
    }
  }

  const formIsValid =
    nameIsValid &&
    addressIsValid &&
    numberIsValid &&
    ifEmailIsEnteredAndValid &&
    dateIsValid &&
    productsFormIsValid;

  // function for calculating invoice form total
  const invoiceFormTotal = items.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );

  // handling submission of the form
  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    //     {
    //   "id": "htc123",
    //   "date": "2021-06-19",
    //   "name": "hightech furniture",
    //   "email": "",
    //   "number": 7567829363,
    //   "address": "Hapa, Jamnagar",
    //   "items": [
    //     {
    //       "id": "be4246a4-7319-4929-99e4-606ca50e2ac2",
    //       "name": "ruler",
    //       "price": "20",
    //       "quantity": "100"
    //     }
    //   ],
    //   "invoiceType": "credit",
    //   "invoiceFormTotal": 2000,
    //   "amountPaidForThisInvoice": 1000,
    //   "amountYetToBePaidForThisInvoice": 1000
    // }

    const formData = {
      id: uuidv4(),
      date,
      name,
      email,
      number,
      address,
      items,
      invoiceType,
      invoiceFormTotal,
      amountPaidForThisInvoice:
        invoiceType === "cash" ? invoiceFormTotal : amountPaidWhileOrderning,
      amountYetToBePaidForThisInvoice:
        invoiceType === "cash"
          ? 0
          : invoiceFormTotal - amountPaidWhileOrderning,
    };

    addInvoice(formData);

    // console.log(formData);

    nameReset();
    emailReset();
    addressReset();
    numberReset();
    dateReset();
    setAmountPaidWhileOrdering(0);
    setItems([
      {
        id: uuidv4(),
        name: "",
        price: "",
        quantity: 1,
      },
    ]);

    swal("Success!", "Invoice added to the All Invoices tab!", "success");

    setTimeout(() => {
      history.push("/all-invoices");
    }, 1000);
  };

  // dynamic adding and deleting of product forms
  const handleAddItems = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        name: "",
        price: "",
        quantity: 1,
      },
    ]);
  };

  const handleRemoveItems = id => {
    const newItems = [...items];
    newItems.splice(
      newItems.findIndex(item => item.id === id),
      1
    );
    setItems(newItems);
  };

  // handling change to the products form
  const handleChange = (id, event) => {
    const newItems = items.map(item => {
      if (id === item.id) {
        item[event.target.name] = event.target.value;
      }
      return item;
    });

    setItems(newItems);
  };

  return (
    <main>
      <div className="main__container">
        <form onSubmit={handleSubmit} className="ui form">
          <h3 className="ui dividing header">Add an Invoice</h3>
          <div className="three fields">
            <div className={`required field ${dateHasError ? "error" : ""}`}>
              <label>Date</label>
              <input
                value={date}
                onChange={dateChangeHandler}
                onBlur={dateBlurHandler}
                type="date"
              />
            </div>
            <div className={`field ${emailHasError ? "error" : ""}`}>
              <label>Email</label>
              <input
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className={`required field ${nameHasError ? "error" : ""}`}>
              <label>Name</label>
              <input
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                type="text"
                placeholder="Customer Name"
              />
            </div>
          </div>
          <div className={`required field ${addressHasError ? "error" : ""}`}>
            <label>Address</label>
            <textarea
              value={address}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
              rows="2"
            />
          </div>
          <div className="two fields">
            <div className={`required field ${numberHasError ? "error" : ""}`}>
              <label>Mobile Number</label>
              <input
                value={number}
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                type="number"
                placeholder="Mobile Number"
              />
            </div>
            <div className="required field">
              <div className="required field">
                <label>Invoice Type</label>
                <select
                  onChange={event => setInvoiceType(event.target.value)}
                  className="ui dropdown"
                >
                  <option value="">Select Invoice Type</option>
                  <option value="cash">Cash</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
            </div>
          </div>
          <h3 className="ui dividing header">Products</h3>
          {items.map(item => {
            return (
              <div key={item.id} className="five fields">
                <div className="required field">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={event => handleChange(item.id, event)}
                    placeholder="Name"
                  />
                </div>
                <div className="required field">
                  <label>Product Price</label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={event => handleChange(item.id, event)}
                    placeholder="Price"
                  />
                </div>
                <div className="required field">
                  <label>Product Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={item.quantity}
                    onChange={event => handleChange(item.id, event)}
                    placeholder="Quantity"
                  />
                </div>
                <div className="field">
                  <label>Product Total</label>
                  <input
                    type="number"
                    name="total"
                    value={item.price * item.quantity}
                    disabled={true}
                    placeholder="Total"
                  />
                </div>
                <div className="field">
                  <i
                    className="trash icon"
                    style={{
                      fontSize: "20px",
                      color: "tomato",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveItems(item.id)}
                  ></i>
                </div>
              </div>
            );
          })}
          <i
            className="plus square icon"
            style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
            onClick={handleAddItems}
          ></i>
          <div className="three fields">
            <div className="field">
              <label>Amount Paid</label>
              <input
                value={
                  invoiceType === "cash"
                    ? invoiceFormTotal
                    : amountPaidWhileOrderning
                }
                onChange={event => {
                  setAmountPaidWhileOrdering(event.target.value);
                }}
                disabled={invoiceType === "cash"}
                type="number"
                placeholder="Paid for this invoice"
              />
            </div>
            <div className=" field">
              <label>Amount Remaining</label>
              <input
                value={
                  invoiceType === "cash"
                    ? 0
                    : invoiceFormTotal - amountPaidWhileOrderning
                }
                disabled={true}
                type="number"
                placeholder="Amount Remaining for this invoice"
              />
            </div>
            <div className="field">
              <label>Grand Total</label>
              <input value={invoiceFormTotal} type="number" disabled={true} />
            </div>
          </div>
          <button className="ui secondary button">Add Invoice</button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddInvoiceForm;
