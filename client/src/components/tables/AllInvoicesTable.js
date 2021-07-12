import React, { useContext } from "react";
import './table.css';
import DataContext from "../../store/data-context";
import { Link } from 'react-router-dom';

function AllInvoicesTable() {
    const { allInvoices, deleteInvoice } = useContext(DataContext);

    const deleteHandler = (
      id,
      name,
      number,
      invoiceFormTotal,
      amountPaidForThisInvoice,
      amountYetToBePaidForThisInvoice
    ) => {
      //         "id": "htc123",
      //   "name": "hightech furniture",
      //   "number": 7567829363,
      //   "invoiceFormTotal": 2000,
      //   "amountPaidForThisInvoice": 1000,
      //   "amountYetToBePaidForThisInvoice": 1000

      const formData = {
        id,
        name,
        number: Number(number),
        invoiceFormTotal,
        amountPaidForThisInvoice,
        amountYetToBePaidForThisInvoice,
      };
      // console.log(formData);
      deleteInvoice(formData);
    };
  
  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Invoices</h2>

        <table className="ui celled table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Date</th>
              <th>Name</th>
              <th>Number</th>
              <th>Amount Paid</th>
              <th>Amount Remaining</th>
              <th>Total Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((sale, index) => {
              return (
                <tr key={sale.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/view-invoice/${sale.id}`}>
                      {new Date(sale.date).toDateString()}{" "}
                    </Link>{" "}
                  </td>
                  <td>{sale.name}</td>
                  <td>{sale.number}</td>
                  <td>{sale.amountPaidForThisInvoice}</td>
                  <td>{sale.amountYetToBePaidForThisInvoice}</td>
                  <td>{sale.invoiceFormTotal}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        deleteHandler(
                          sale.id,
                          sale.name,
                          sale.number,
                          sale.invoiceFormTotal,
                          sale.amountPaidForThisInvoice,
                          sale.amountYetToBePaidForThisInvoice
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AllInvoicesTable;
