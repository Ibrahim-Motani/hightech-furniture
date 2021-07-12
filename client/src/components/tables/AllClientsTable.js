import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import './table.css';
import { Link } from 'react-router-dom';

function AllClientsTable() {
  const { allClients, deleteClient } = useContext(DataContext);

  const handleDelete = id => {
    deleteClient(id);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Clients</h2>

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
            {allClients.map((client, index) => {
              return (
                <tr key={client._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/all-invoices-for/${client._id}`}>{client.name}</Link>
                  </td>
                  <td>{client.number}</td>
                  <td>
                    {client.bills.reduce(
                      (acc, curr) => (acc += curr.invoiceFormTotal),
                      0
                    )}
                  </td>
                  <td>{client.totalAmountPending}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() => handleDelete(client._id)}
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

export default AllClientsTable;
