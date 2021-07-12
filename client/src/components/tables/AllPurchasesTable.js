import React, { useContext } from "react";
import DataContext from "../../store/data-context";
import "./table.css";
import { Link } from 'react-router-dom';

function AllPurchasesTable() {
  const { allPurchases, deletePurchase } = useContext(DataContext);
  // console.log(allPurchases);
  
  const deleteHandler = (
    id,
    name,
    number,
    purchaseBillTotal,
    amountPaidForThisPurchase,
    amountYetToBePaidForThisPurchase
  ) => {
    //         {
    //     "id" : "396",
    //     "name" : "skyline",
    //     "number" : 7567829363,
    //     "purchaseBillTotal" : 1000,
    //     "amountPaidForThisPurchase" : 500,
    //     "amountYetToBePaidForThisPurchase" : 500
    // }

    const formData = {
      id,
      name,
      number,
      purchaseBillTotal,
      amountPaidForThisPurchase,
      amountYetToBePaidForThisPurchase,
    };

    deletePurchase(formData);
  };

  return (
    <main>
      <div className="main__container">
        <h2 className="ui header">All Purchases</h2>

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
            {allPurchases.map((purchase, index) => {
              return (
                <tr key={purchase.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/view-purchase/${purchase.id}`}>
                      {new Date(purchase.date).toDateString()}{" "}
                    </Link>
                  </td>
                  <td>{purchase.name}</td>
                  <td>{purchase.number}</td>
                  <td>{purchase.amountPaidForThisPurchase}</td>
                  <td>{purchase.amountYetToBePaidForThisPurchase}</td>
                  <td>{purchase.purchaseBillTotal}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        deleteHandler(
                          purchase.id,
                          purchase.name,
                          purchase.number,
                          purchase.purchaseBillTotal,
                          purchase.amountPaidForThisPurchase,
                          purchase.amountYetToBePaidForThisPurchase
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

export default AllPurchasesTable;