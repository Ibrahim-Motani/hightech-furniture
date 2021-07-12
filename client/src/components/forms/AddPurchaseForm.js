import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useInput from "../../hooks/use-input";
import DataContext from "../../store/data-context";
import { useHistory } from "react-router-dom";
import "./form.css";
import swal from "sweetalert";

function AddPurchaseForm() {
  const { addPurchase } = useContext(DataContext);
  const history = useHistory();

  const [items, setItems] = useState([
    {
      id: uuidv4(),
      name: "",
      price: "",
      quantity: 1,
    },
  ]);
  const [amountPaidWhileOrderning, setAmountPaidWhileOrdering] = useState("");
  const [invoiceType, setInvoiceType] = useState("cash");

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

  const purchaseFormTotal = items.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid) {
      alert("Form is invalid. Please fill out proper details");
      return;
    }

    // schema data example of request body
    //     {
    //   "id": "1208",
    //   "date": "2001-12-12",
    //   "name": "skyline",
    //   "email": "",
    //   "address": "Morbi",
    //   "number": 7567829363,
    //   "items": [
    //     {
    //       "name": "p2",
    //       "price": "500",
    //       "quantity": "1"
    //     },
    //     {
    //       "name": "p3",
    //       "price": "500",
    //       "quantity": "1"
    //     }
    //   ],
    //   "purchaseType": "Credit",
    //   "purchaseBillTotal": 2000,
    //   "amountPaidForThisPurchase": 1000,
    //   "amountYetToBePaidForThisPurchase": 1000
    // }

    const formData = {
      id: uuidv4(),
      date,
      name,
      email,
      address,
      number,
      items,
      purchaseType: invoiceType,
      purchaseBillTotal: purchaseFormTotal,

      amountPaidForThisPurchase:
        invoiceType === "cash" ? purchaseFormTotal : amountPaidWhileOrderning,
      amountYetToBePaidForThisPurchase:
        invoiceType === "cash"
          ? 0
          : purchaseFormTotal - amountPaidWhileOrderning,
    };
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

    addPurchase(formData);
    swal("Success!", "Purchase added to the All Purchases tab!", "success");
    
    setTimeout(() => {
      history.push("/all-purchases");
    }, 1000);
  };

  const handleChange = (id, event) => {
    const newItems = items.map(item => {
      if (id === item.id) {
        item[event.target.name] = event.target.value;
      }
      return item;
    });

    setItems(newItems);
  };

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
  return (
    <main>
      <div className="main__container">
        <form onSubmit={handleSubmit} className="ui form">
          <h3 className="ui dividing header">Add a new Purchase</h3>
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
              type="date"
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
                    name="name"
                    value={item.name}
                    onChange={event => handleChange(item.id, event)}
                    type="text"
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
                    ? purchaseFormTotal
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
                    : purchaseFormTotal - amountPaidWhileOrderning
                }
                disabled={true}
                type="number"
                placeholder="Amount Remaining for this Invoice"
              />
            </div>
            <div className="field">
              <label>Grand Total</label>
              <input
                value={purchaseFormTotal}
                type="number"
                disabled={true}
                placeholder="Grand Total"
              />
            </div>
          </div>
          <button type="submit" className="ui secondary button">
            Add Purchase
          </button>
          <button className="ui button">Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default AddPurchaseForm;
