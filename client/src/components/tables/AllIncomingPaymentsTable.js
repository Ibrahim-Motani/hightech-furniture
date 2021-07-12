import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import "./table.css";

function AllIncomingPaymentsTable() {
  const { allIncomingPayments, deleteIncomingPayment } =
    useContext(DataContext);

  const handleDelete = (id, name, number, amount) => {
    const formData = {
      name,
      number,
      amount,
    };

    deleteIncomingPayment(formData, id);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Incoming Payments</h2>

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
            {allIncomingPayments.map((incomingPayment, index) => {
              return (
                <tr key={incomingPayment._id}>
                  <td>{index + 1}</td>
                  <td>{incomingPayment.name}</td>
                  <td>{new Date(incomingPayment.date).toDateString()}</td>
                  <td>{incomingPayment.number}</td>
                  <td>{incomingPayment.amount}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        handleDelete(
                          incomingPayment._id,
                          incomingPayment.name,
                          incomingPayment.number,
                          incomingPayment.amount
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

export default AllIncomingPaymentsTable;
