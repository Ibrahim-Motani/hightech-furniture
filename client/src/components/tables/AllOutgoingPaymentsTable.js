import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import "./table.css";

function AllOutgoingPaymentsTable() {
  const { allOutgoingPayments, deleteOutgoingPayment } =
    useContext(DataContext);

  const handleDelete = (id, name, number, amount) => {
    const formData = {
      name,
      number,
      amount,
    };

    deleteOutgoingPayment(formData, id);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Outgoing Payments</h2>

        <table className="ui celled table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Number</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allOutgoingPayments.map((outgoingPayment, index) => {
              return (
                <tr key={outgoingPayment._id}>
                  <td>{index + 1}</td>
                  <td>{outgoingPayment.name}</td>
                  <td>{new Date(outgoingPayment.date).toDateString()}</td>
                  <td>{outgoingPayment.number}</td>
                  <td>{outgoingPayment.amount}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        handleDelete(
                          outgoingPayment._id,
                          outgoingPayment.name,
                          outgoingPayment.number,
                          outgoingPayment.amount
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

export default AllOutgoingPaymentsTable;
