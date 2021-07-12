import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import "./table.css";
import { Link } from 'react-router-dom';

function AllDealersTable() {
  const { allDealers, deleteDealer } = useContext(DataContext);

  const handleDelete = id => {
    deleteDealer(id);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Dealers</h2>

        <table className="ui celled table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Number</th>
              <th>Total Business</th>
              <th>Account</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allDealers.map((dealer, index) => {
              return (
                <tr key={dealer._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/all-invoices-for-dealer/${dealer._id}`}>
                      {dealer.name}
                    </Link>
                  </td>
                  <td>{dealer.number}</td>
                  <td>
                    {dealer.bills.reduce(
                      (acc, curr) => (acc += curr.purchaseBillTotal),
                      0
                    )}
                  </td>
                  <td>{dealer.totalAmountPending}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() => handleDelete(dealer._id)}
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

export default AllDealersTable;
