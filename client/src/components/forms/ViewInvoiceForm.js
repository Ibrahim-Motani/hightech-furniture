import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import { useParams } from "react-router-dom";
import "./form.css";

function ViewInvoiceForm() {
  const params = useParams();
  // importing function from store
  const { allInvoices } = useContext(DataContext);
  // importing and using history for navigation after submission

  const filteredInvoice = allInvoices.filter(
    invoice => invoice.id === params.id
  );

  return (
    <main>
      <div className="main__container">
        <form className="ui form">
          <div className="three fields">
            <div className={`required field`}>
              <label>Date</label>
              <input
                value={new Date(filteredInvoice[0].date).toDateString()}
                disabled
                type="text"
              />
            </div>
            <div className={`field `}>
              <label>Email</label>
              <input
                value={filteredInvoice[0].email}
                disabled
                type="email"
                placeholder="Email"
              />
            </div>
            <div className={`required field`}>
              <label>Name</label>
              <input
                value={filteredInvoice[0].name}
                disabled
                type="text"
                placeholder="Customer Name"
              />
            </div>
          </div>
          <div className={`required field `}>
            <label>Address</label>
            <textarea value={filteredInvoice[0].address} disabled rows="2" />
          </div>
          <div className="two fields">
            <div className={`required `}>
              <label>Mobile Number</label>
              <input
                value={filteredInvoice[0].number}
                disabled
                type="number"
                placeholder="Mobile Number"
              />
            </div>
            <div className="required field">
              <div className="required field">
                <label>Invoice Type</label>
                <select
                  value={filteredInvoice[0].invoiceType}
                  disabled
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
          {filteredInvoice[0].items.map(item => {
            return (
              <div key={item.id} className="four fields">
                <div className="required field">
                  <label>Product Name</label>
                  <input
                    value={item.name}
                    disabled
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="required field">
                  <label>Product Price</label>
                  <input
                    disabled
                    value={item.price}
                    type="number"
                    name="price"
                    placeholder="Price"
                  />
                </div>
                <div className="required field">
                  <label>Product Quantity</label>
                  <input
                    value={item.quantity}
                    disabled
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="Quantity"
                  />
                </div>
                <div className="field">
                  <label>Product Total</label>
                  <input
                    value={item.price * item.quantity}
                    type="number"
                    name="total"
                    disabled={true}
                    placeholder="Total"
                  />
                </div>
              </div>
            );
          })}

          <div className="three fields">
            <div className="field">
              <label>Amount Paid</label>
              <input
                value={filteredInvoice[0].amountPaidForThisInvoice}
                disabled
                type="number"
                placeholder="Paid for this invoice"
              />
            </div>
            <div className=" field">
              <label>Amount Remaining</label>
              <input
                value={filteredInvoice[0].amountYetToBePaidForThisInvoice}
                disabled
                type="number"
                placeholder="Amount Remaining for this invoice"
              />
            </div>
            <div className="field">
              <label>Grand Total</label>
              <input value={filteredInvoice[0].invoiceFormTotal} type="number" disabled={true} />
            </div>
          </div>
          
        </form>
      </div>
    </main>
  );
}

export default ViewInvoiceForm;
