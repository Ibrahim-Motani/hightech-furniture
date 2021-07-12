import React, { useContext } from "react";
import "./table.css";
import DataContext from "../../store/data-context";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function AllInvoicesForAParticularDealerTable() {
  const params = useParams();
  const { allDealers, deletePurchase } = useContext(DataContext);
  const filteredDealer = allDealers.filter(
    dealer => dealer._id === params.dealer_id
  );
  // console.log(filteredDealer[0]);

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
            {filteredDealer[0].bills.map((purchase, index) => {
              return (
                <tr key={purchase.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/view-purchase/${purchase.id}`}>
                      {new Date(purchase.date).toDateString()}{" "}
                    </Link>
                  </td>
                  <td>{filteredDealer[0].name}</td>
                  <td>{filteredDealer[0].number}</td>
                  <td>{purchase.amountPaidForThisPurchase}</td>
                  <td>{purchase.amountYetToBePaidForThisPurchase}</td>
                  <td>{purchase.purchaseBillTotal}</td>
                  <td>
                    <button
                      className="negative ui button"
                      onClick={() =>
                        deleteHandler(
                          purchase.id,
                          filteredDealer[0].name,
                          filteredDealer[0].number,
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

export default AllInvoicesForAParticularDealerTable;
