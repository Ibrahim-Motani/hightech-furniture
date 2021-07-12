import React, { useContext } from "react";
import "./table.css";
import DataContext from "../../store/data-context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AllInvoicesForAParticularCustomerTable() {
  const params = useParams();
  const { allClients, deleteInvoice } = useContext(DataContext);
  const filteredClient = allClients.filter(
    client => client._id === params.client_id
  );
  // console.log(filteredClient[0]);
  // console.log(filteredClient[0].name);

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
              <th></th>
              <th>Name</th>
              <th>Number</th>
              <th>Amount Paid</th>
              <th>Amount Remaining</th>
              <th>Total Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredClient[0].bills.map((sale, index) => {
              return (
                <tr key={sale.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/view-invoice/${sale.id}`}>
                      {new Date(sale.date).toDateString()}{" "}
                    </Link>
                  </td>
                  <td>{filteredClient[0].name}</td>
                  <td>{filteredClient[0].number}</td>
                  <td>{sale.amountPaidForThisInvoice}</td>
                  <td>{sale.amountYetToBePaidForThisInvoice}</td>
                  <td>{sale.invoiceFormTotal}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        deleteHandler(
                          sale.id,
                          filteredClient[0].name,
                          filteredClient[0].number,
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

export default AllInvoicesForAParticularCustomerTable;
