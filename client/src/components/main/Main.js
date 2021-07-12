import { useContext } from "react";
import "./Main.css";
import Display from "../charts/Display";
import DataContext from "../../store/data-context";
import { Link } from "react-router-dom";

const Main = () => {
  const { totalAmountPending, totalAmountReceived, totalSales } =
    useContext(DataContext);

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-area-chart fa-2x text-black"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Sales</p>
              <span className="font-bold text-title">
                <i className="fa fa-inr" aria-hidden="true"></i>
                &nbsp;{totalSales}
              </span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-check fa-2x text-green" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Amount Received</p>
              <span className="font-bold text-title">
                <i className="fa fa-inr" aria-hidden="true"></i>
                &nbsp;{totalAmountReceived}
              </span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Amount Due</p>
              <span className="font-bold text-title">
                <i className="fa fa-inr" aria-hidden="true"></i>
                &nbsp;{totalAmountPending}
              </span>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Business Reports</h1>
              </div>
              <i className="fa fa-inr" aria-hidden="true"></i>
            </div>

            <Display />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Quick Actions</h1>
              </div>
              <i className="fa fa-inr" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <i
                  className="fa fa-briefcase"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-expense">
                  Add Expense
                </Link>{" "}
              </div>
              <div className="card2">
                <i
                  className="fa fa-file-text-o"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-invoice">
                  Add an Invoice
                </Link>{" "}
              </div>
              <div className="card3">
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-purchase">
                  Add Purchase
                </Link>{" "}
              </div>
              <div className="card4">
                <i
                  className="fa fa-users"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-client">
                  Add Client
                </Link>{" "}
              </div>
              <div className="card5">
                <i
                  className="fa fa-users"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-dealer">
                  Add Dealer
                </Link>{" "}
              </div>
              <div className="card6">
                <i
                  className="fa fa-money"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-incoming-payment">
                  Add Incoming Payment
                </Link>{" "}
              </div>
              <div className="card7">
                <i
                  className="fa fa-credit-card"
                  style={{ fontSize: "15px" }}
                  aria-hidden="true"
                ></i>{" "}
                &nbsp;
                <Link className="links" to="/add-outgoing-payment">
                  Add Outgoing Payment
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;
