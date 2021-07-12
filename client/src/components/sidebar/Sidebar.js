// react router dom imports
import { Link } from "react-router-dom";
// css import
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <h1>Hightech Furniture</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-home"></i>
          <Link to="/home">Dashboard</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-file-text-o" aria-hidden="true"></i>{" "}
          <Link to="/all-invoices">All Invoices</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
          <Link to="/all-purchases">All Purchases</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-users" aria-hidden="true"></i>{" "}
          <Link to="/all-clients">All Clients</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase" aria-hidden="true"></i>
          <Link to="/all-expenses">All Expenses</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-users" aria-hidden="true"></i>{" "}
          <Link to="/all-dealers">All Dealers</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-money" aria-hidden="true"></i>{" "}
          <Link to="/all-incoming-payments">All Incoming Payments</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-credit-card" aria-hidden="true"></i>
          <Link to="/all-outgoing-payments">All Outgoing Payments</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
