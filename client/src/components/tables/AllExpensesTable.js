import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import "./table.css";

function AllExpensesTable() {
  const { allExpenses, deleteExpense } = useContext(DataContext);

  const handleDelete = id => {
    deleteExpense(id);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Expenses</h2>

        <table className="ui celled table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Paid To</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map((expense, index) => {
              return (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{expense.name}</td>
                  <td>{new Date(expense.date).toDateString()}</td>
                  <td>{expense.paidTo}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() => handleDelete(expense._id)}
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

export default AllExpensesTable;
