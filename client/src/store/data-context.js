import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({
  loginUser: token => {},
  logoutUser: () => {},
  allInvoices: [],
  addInvoice: formData => {},
  deleteInvoice: formData => {},
  allPurchases: [],
  addPurchase: formData => {},
  deletePurchase: formData => {},
  allClients: [],
  addClient: formData => {},
  deleteClient: () => {},
  allExpenses: [],
  addExpense: formData => {},
  deleteExpense: () => {},
  allDealers: [],
  addDealer: formData => {},
  deleteDealer: id => {},
  allIncomingPayments: [],
  addIncomingPayment: (formData, id) => {},
  deleteIncomingPayment: (formData, id) => {},
  allOutgoingPayments: [],
  addOutgoingPayment: (formData, id) => {},
  deleteOutgoingPayment: (formData, id) => {},
  totalSales: "",
  totalAmountReceived: "",
  totalAmountPending: "",
  totalPurchases: "",
  totalExpenses: "",
});

export const DataContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [allInvoices, setAllInvoices] = useState([]);
  const [allPurchases, setAllPurchases] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [allDealers, setAllDealers] = useState([]);
  const [allIncomingPayments, setAllIncomingPayments] = useState([]);
  const [allOutgoingPayments, setAllOutgoingPayments] = useState([]);

  const [temp, setTemp] = useState(false);

  // user login
  const loginUser = token => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // user logout
  const logoutUser = token => {
    localStorage.setItem("token", "");
    setIsLoggedIn(false);
  };

  // getting all invoices
  useEffect(() => {
    axios
      .get(`https://hightech-furniture.herokuapp.com/api/all-invoices`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllInvoices(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // total sales
  const totalSales = allInvoices.reduce(
    (acc, curr) => (acc += curr.invoiceFormTotal),
    0
  );

  // adding an invoice to the db
  const addInvoice = formData => {
    axios
      .post("https://hightech-furniture.herokuapp.com/api/add-invoice", formData)
      .then(response => {
        // console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // deleting an invoice
  const deleteInvoice = formData => {
    axios
      .delete("https://hightech-furniture.herokuapp.com/api/delete-invoice", {
        data: formData,
      })
      .then(response => {
        // console.log(response);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // all purchases
  useEffect(() => {
    axios
      .get("https://hightech-furniture.herokuapp.com/api/all-purchases")
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllPurchases(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // total purchases
  const totalPurchases = allPurchases.reduce(
    (acc, curr) => (acc += curr.purchaseBillTotal),
    0
  );

  // add a purchase
  const addPurchase = formData => {
    axios
      .post(`https://hightech-furniture.herokuapp.com/api/add-purchase`, formData)
      .then(response => {
        // console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error.message);
      });
  };

  // delete a purchase
  const deletePurchase = formData => {
    axios
      .delete("https://hightech-furniture.herokuapp.com/api/delete-purchase", {
        data: formData,
      })
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // all clients
  useEffect(() => {
    axios
      .get("https://hightech-furniture.herokuapp.com/api/all-clients")
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllClients(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // total amount Received
  const totalAmountReceived = allClients.reduce(
    (acc, curr) => (acc += curr.totalAmountReceived),
    0
  );
  // total amount pending
  const totalAmountPending = allClients.reduce(
    (acc, curr) => (acc += curr.totalAmountPending),
    0
  );

  // adding a client
  const addClient = formData => {
    axios
      .post("https://hightech-furniture.herokuapp.com/api/add-client", formData)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // delete a client
  const deleteClient = id => {
    axios
      .delete(`https://hightech-furniture.herokuapp.com/api/delete-client/${id}`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // getting all expenses
  useEffect(() => {
    axios
      .get(`https://hightech-furniture.herokuapp.com/api/all-expenses`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllExpenses(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // total expenses
  const totalExpenses = allExpenses.reduce(
    (acc, curr) => (acc += curr.amount),
    0
  );

  // adding an expense
  const addExpense = formData => {
    axios
      .post(`https://hightech-furniture.herokuapp.com/api/add-expense`, formData)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // delete an expense
  const deleteExpense = id => {
    axios
      .delete(`https://hightech-furniture.herokuapp.com/api/delete-expense/${id}`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // all dealers
  useEffect(() => {
    axios
      .get(`https://hightech-furniture.herokuapp.com/api/all-dealers`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllDealers(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // add a dealer
  const addDealer = formData => {
    axios
      .post(`https://hightech-furniture.herokuapp.com/api/add-dealer`, formData)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // delete a dealer
  const deleteDealer = id => {
    axios
      .delete(`https://hightech-furniture.herokuapp.com/api/delete-dealer/${id}`)
      .then(response => {
        // console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // get all incoming payments
  useEffect(() => {
    axios
      .get(`https://hightech-furniture.herokuapp.com/api/all-incoming-payments`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllIncomingPayments(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // add an incoming payment
  const addIncomingPayment = (formData, id) => {
    axios
      .put(`https://hightech-furniture.herokuapp.com/api/incoming-payment/${id}`, formData)
      .then(response => {
        // console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // delete an incoming payment
  const deleteIncomingPayment = (formData, id) => {
    axios
      .delete(`https://hightech-furniture.herokuapp.com/api/delete-incoming-payment/${id}`, {
        data: formData,
      })
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // get all outgoing payments
  useEffect(() => {
    axios
      .get(`https://hightech-furniture.herokuapp.com/api/all-outgoing-payments`)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setAllOutgoingPayments(result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [temp]);

  // add an outgoing payment
  const addOutgoingPayment = (formData, id) => {
    axios
      .put(`https://hightech-furniture.herokuapp.com/api/outgoing-payment/${id}`, formData)
      .then(response => {
        // console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // delete outgoing payment
  const deleteOutgoingPayment = (formData, id) => {
    axios
      .delete(`https://hightech-furniture.herokuapp.com/api/delete-outgoing-payment/${id}`, {
        data: formData,
      })
      .then(response => {
        const result = response.data;
        // console.log(result);
        setTemp(!temp);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const contextValue = {
    isLoggedIn,
    loginUser,
    logoutUser,
    allInvoices,
    addInvoice,
    deleteInvoice,
    allPurchases,
    addPurchase,
    deletePurchase,
    allClients,
    addClient,
    deleteClient,
    allExpenses,
    addExpense,
    deleteExpense,
    allDealers,
    addDealer,
    deleteDealer,
    allIncomingPayments,
    addIncomingPayment,
    deleteIncomingPayment,
    allOutgoingPayments,
    addOutgoingPayment,
    deleteOutgoingPayment,
    totalSales,
    totalAmountReceived,
    totalAmountPending,
    totalPurchases,
    totalExpenses,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default DataContext;
