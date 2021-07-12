// react imports
import { useContext } from "react";
import DataContext from "./store/data-context";
// css import
import "./App.css";
// react router import
import { Route, Redirect, Switch } from "react-router-dom";
// pages import
import Home from "./pages/Home";
// writing operation pages
import AddExpense from "./pages/AddExpense";
import AddPurchase from "./pages/AddPurchase";
import AddClient from "./pages/AddClient";
import AddDealer from "./pages/AddDealer";
import AddIncomingPayment from "./pages/AddIncomingPayment";
import AddOutgoingPayment from "./pages/AddOutgoingPayment";
// reading operation pages
import AllInvoices from "./pages/AlIInvoices";
import AllClients from "./pages/AllClients";
import AllDealers from "./pages/AllDealers";
import AllIncomingPayments from "./pages/AllIncomingPayments";
import AllOutgoingPayments from "./pages/AllOutgoingPayments";
import AllPurchases from "./pages/AllPurchases";
import AllExpenses from "./pages/AllExpenses";
import AllInvoicesForAParticularCustomer from "./pages/AllInvoicesForAParticularCustomer";
import AllInvoicesForAParticularDealer from "./pages/AllInvoicesForAParticularDealer";
import ViewInvoice from "./pages/ViewInvoice";
import ViewPurchase from "./pages/ViewPurchase";
import Login from "./pages/Login";
import AddInvoice from "./pages/AddInvoice";

const App = () => {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <div>
      <Switch>
        {/* Login */}
        <Route exact path="/" component={Login}></Route>
        <Route
          exact
          path="/login"
          render={() =>
            !isLoggedIn ? (
              <Login></Login>
            ) : (
              <Redirect to={{ pathname: "/home" }}></Redirect>
            )
          }
        ></Route>
        {/* Routes for sending values to the database */}
        <Route
          exact
          path="/home"
          render={() =>
            isLoggedIn ? (
              <Home></Home>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-expense"
          render={() =>
            isLoggedIn ? (
              <AddExpense></AddExpense>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-invoice"
          render={() =>
            isLoggedIn ? (
              <AddInvoice></AddInvoice>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-purchase"
          render={() =>
            isLoggedIn ? (
              <AddPurchase></AddPurchase>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-client"
          render={() =>
            isLoggedIn ? (
              <AddClient></AddClient>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-dealer"
          render={() =>
            isLoggedIn ? (
              <AddDealer></AddDealer>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-incoming-payment"
          render={() =>
            isLoggedIn ? (
              <AddIncomingPayment></AddIncomingPayment>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/add-outgoing-payment"
          render={() =>
            isLoggedIn ? (
              <AddOutgoingPayment></AddOutgoingPayment>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        {/* Routes for viewing value in the database */}
        <Route
          exact
          path="/all-invoices"
          render={() =>
            isLoggedIn ? (
              <AllInvoices></AllInvoices>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-clients"
          render={() =>
            isLoggedIn ? (
              <AllClients></AllClients>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-dealers"
          render={() =>
            isLoggedIn ? (
              <AllDealers></AllDealers>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-incoming-payments"
          render={() =>
            isLoggedIn ? (
              <AllIncomingPayments></AllIncomingPayments>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-outgoing-payments"
          render={() =>
            isLoggedIn ? (
              <AllOutgoingPayments></AllOutgoingPayments>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-purchases"
          render={() =>
            isLoggedIn ? (
              <AllPurchases></AllPurchases>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-expenses"
          render={() =>
            isLoggedIn ? (
              <AllExpenses></AllExpenses>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        {/* Routes for data of a particular customer or deealer or invoice detail*/}
        <Route
          exact
          path="/all-invoices-for/:client_id"
          render={() =>
            isLoggedIn ? (
              <AllInvoicesForAParticularCustomer></AllInvoicesForAParticularCustomer>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/all-invoices-for-dealer/:dealer_id"
          render={() =>
            isLoggedIn ? (
              <AllInvoicesForAParticularDealer></AllInvoicesForAParticularDealer>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        {/* Routes for a particular invoice */}
        <Route
          exact
          path="/view-invoice/:id"
          render={() =>
            isLoggedIn ? (
              <ViewInvoice></ViewInvoice>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
        <Route
          exact
          path="/view-purchase/:id"
          render={() =>
            isLoggedIn ? (
              <ViewPurchase></ViewPurchase>
            ) : (
              <Redirect to={{ pathname: "/" }}></Redirect>
            )
          }
        ></Route>
      </Switch>
    </div>
  );
};

export default App;
