`--unhandled-rejections=strict`;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 3030;

var cors = require("cors");

app.use(cors());

mongoose.Promise = global.Promise;
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/hightechFurniture";
mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(() => {
    console.log("error connecting to database");
  });

// client/customer schema
const Schema = mongoose.Schema;
const clientSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  address: {
    type: String,
  },
  bills: {
    type: Schema.Types.Mixed,
  },
  firstPaymentRecieved: {
    type: Boolean,
  },
  totalAmountReceived: {
    type: Number,
  },
  totalAmountPending: {
    type: Number,
  },
});

// creating model from customer schema
const Client = mongoose.model("Client", clientSchema);

// all clients api
app.get("/api/all-clients", (req, res) => {
  Client.find()
    .then(clients => {
      res.json(clients);
    })
    .catch(error => {
      res.json(error);
    });
});

// add client api
app.post("/api/add-client", (req, res) => {
  const body = req.body;
  const client = new Client(body);
  client
    .save()
    .then(client => {
      res.json(client);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete client
app.delete("/api/delete-client/:id", (req, res) => {
  const id = req.params.id;

  // deleting the bills of this client being deleted from the Invoices model
  Client.findById(id)
    .then(client => {
      const name = client.name;
      Invoice.deleteMany({ name: name })
        .then(response => res.json(response))
        .catch(error => res.json(error));
    })
    .catch(error => {
      res.json(error);
    });

  Client.findByIdAndDelete(id)
    .then(client => {
      res.json(client);
    })
    .catch(error => {
      res.json(error);
    });
});

// expense schema
const expenseSchema = new Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  },
  paidTo: {
    type: String,
  },
});

// creating model from expense schema
const Expense = mongoose.model("Expense", expenseSchema);

// get all expense
app.get("/api/all-expenses", (req, res) => {
  Expense.find()
    .then(expenses => {
      res.json(expenses);
    })
    .catch(error => {
      res.json(error);
    });
});

// handling add expense
app.post("/api/add-expense", (req, res) => {
  const body = req.body;
  const expense = new Expense(body);
  expense
    .save()
    .then(expense => {
      res.json(expense);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete an expense
app.delete("/api/delete-expense/:id", (req, res) => {
  const id = req.params.id;
  Expense.findByIdAndDelete(id)
    .then(expense => {
      res.json(expense);
    })
    .catch(error => {
      res.json(error);
    });
});

// dealer schema
const dealerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  address: {
    type: String,
  },
  bills: {
    type: Schema.Types.Mixed,
  },
  firstPaymentPaid: {
    type: Boolean,
  },
  totalAmountPaid: {
    type: Number,
  },
  totalAmountPending: {
    type: Number,
  },
});

// modelling the dealers schema
const Dealer = mongoose.model("Dealer", dealerSchema);

// get all dealers
app.get("/api/all-dealers", (req, res) => {
  Dealer.find()
    .then(dealers => {
      res.json(dealers);
    })
    .catch(error => {
      res.json(error);
    });
});

// add a dealer
app.post("/api/add-dealer", (req, res) => {
  const body = req.body;
  const dealer = new Dealer(body);
  dealer
    .save()
    .then(dealer => {
      res.json(dealer);
    })
    .catch(error => {
      res.json(error);
    });
});

// delete a dealer
app.delete("/api/delete-dealer/:id", (req, res) => {
    const id = req.params.id;
    
    // deleting the bills of this dealer being deleted from the Purchases model
    Dealer.findById(id)
      .then(dealer => {
        const name = dealer.name;
        Purchase.deleteMany({ name: name })
          .then(response => res.json(response))
          .catch(error => res.json(error));
      })
      .catch(error => {
        res.json(error);
      });
    
  Dealer.findByIdAndDelete(id)
    .then(dealer => {
      res.json(dealer);
    })
    .catch(error => {
      res.json(error);
    });
});

// creating purchase schema
const purchaseSchema = new Schema({
  id: {
    type: Schema.Types.Mixed,
  },
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  number: {
    type: Number,
  },
  items: {
    type: Schema.Types.Mixed,
  },
  purchaseBillTotal: {
    type: Number,
  },
  purchaseType: {
    type: String,
  },
  amountPaidForThisPurchase: {
    type: Number,
  },
  amountYetToBePaidForThisPurchase: {
    type: Number,
  },
});

// creating model out of schema
const Purchase = mongoose.model("Purchase", purchaseSchema);

// get all purchases
app.get("/api/all-purchases", (req, res) => {
  Purchase.find()
    .then(purchases => {
      res.json(purchases);
    })
    .catch(error => {
      res.json(error);
    });
});

// add a purchase
app.post("/api/add-purchase", (req, res) => {
  // first of all extract data out of the request body
  const body = req.body;
  // extracting name and number to query dealer collection
  const name = body.name;
  const number = body.number;
  // extracting bills for later updating the dealer Collection
  const items = body.items;

  // querying for a dealer
  Dealer.findOne({ name: name, number: number }, (error, dealer) => {
    if (error) {
      res.json(error);
    } else {
      if (dealer !== null) {
        // if dealer is found then extract the id for updating the collection later
        const id = dealer._id;

        // checking if that customer already had pending amount to be paid
        const oldTotalAmountPending = Number(dealer.totalAmountPending);
        // if a purchase is added then there will be a new totalPending amount generated based on the invoiceType
        const newTotalAmountPending =
          oldTotalAmountPending + Number(body.amountYetToBePaidForThisPurchase);

        // checking if that dealer already had received payment
        const oldtotalAmountPaid = Number(dealer.totalAmountPaid);
        // if a purchase is added then there will be a new totalAmoutPaid amount generated based on the invoiceType
        const newtotalAmountPaid =
          oldtotalAmountPaid + Number(body.amountPaidForThisPurchase);

        // extracting the already present bills in that Dealer document
        const alreadyPresentBills = dealer.bills;
        // making a new array to pass it on to the updater function
        const newBillToBeAddedToDealerCollection = {
          id: body.id,
          date: body.date,
          purchaseType: body.purchaseType,
          purchaseBillTotal: Number(body.purchaseBillTotal),
          amountPaidForThisPurchase: Number(body.amountPaidForThisPurchase),
          amountYetToBePaidForThisPurchase: Number(
            body.amountYetToBePaidForThisPurchase
          ),
          items: body.items,
        };

        const newBillsToBeUpdated = [
          ...alreadyPresentBills,
          newBillToBeAddedToDealerCollection,
        ];

        // generating a body for storing purchase in purchase collection
        const newBillToBeAddedToPurchaseCollection = {
          id: body.id,
          date: body.date,
          name: body.name,
          email: body.email,
          address: body.address,
          number: body.number,
          purchaseType: body.purchaseType,
          purchaseBillTotal: Number(body.purchaseBillTotal),
          amountPaidForThisPurchase: Number(body.amountPaidForThisPurchase),
          amountYetToBePaidForThisPurchase: Number(
            body.amountYetToBePaidForThisPurchase
          ),
          items: body.items,
        };

        // finally updating the function with help of id and the temp variable with the old and new purchases and new totalPendingAmount
        Dealer.findByIdAndUpdate(
          id,
          {
            bills: newBillsToBeUpdated,
            totalAmountPending: Number(newTotalAmountPending),
            totalAmountPaid: Number(newtotalAmountPaid),
          },
          { new: true }
        )
          .then(dealer => {
            res.json(dealer);
          })
          .catch(error => {
            res.json(error);
          });

        const purchase = new Purchase(newBillToBeAddedToPurchaseCollection);
        purchase
          .save()
          .then(purchase => {
            res.json(purchase);
          })
          .catch(error => {
            res
              .json(error)
              .then(purchase => res.json(purchase))
              .catch(error => res.json(error));
          });
      } else {
        // if the dealer with given name and number is not present then we have to create a new document for him in the Dealer collection
        // generating data for new dealer from the data received in the body
        const billGeneratedForThisNewDealer = [
          {
            id: body.id,
            date: body.date,
            purchaseType: body.purchaseType,
            purchaseBillTotal: Number(body.purchaseBillTotal),
            amountPaidForThisPurchase: Number(body.amountPaidForThisPurchase),
            amountYetToBePaidForThisPurchase: Number(
              body.amountYetToBePaidForThisPurchase
            ),
            items: body.items,
          },
        ];

        const bodyForNewDealer = {
          name: body.name,
          email: body.email,
          number: body.number,
          address: body.address,
          firstPaymentPaid: false,
          totalAmountPaid: Number(body.amountPaidForThisPurchase),
          totalAmountPending: Number(body.amountYetToBePaidForThisPurchase),
          bills: billGeneratedForThisNewDealer,
        };

        // generating a body for storing purchase in purchase collection
        const newBillToBeAddedToPurchaseCollection = {
          id: body.id,
          date: body.date,
          name: body.name,
          email: body.email,
          address: body.address,
          number: body.number,
          purchaseType: body.purchaseType,
          purchaseBillTotal: Number(body.purchaseBillTotal),
          amountPaidForThisPurchase: Number(body.amountPaidForThisPurchase),
          amountYetToBePaidForThisPurchase: Number(
            body.amountYetToBePaidForThisPurchase
          ),
          items: body.items,
        };

        // saving the data in the Client collection
        const dealer = new Dealer(bodyForNewDealer);
        dealer
          .save()
          .then(dealer => {
            res.json(dealer);
          })
          .catch(error => {
            res.json(error);
          });

        const purchase = new Purchase(newBillToBeAddedToPurchaseCollection);
        purchase
          .save()
          .then(purchase => {
            res.json(purchase);
          })
          .catch(error => {
            res.json(error).catch(purchase => res.json(purchase)).catch(error => res.json(error));
          });
      }
    }
  });
});

// temporary delete a purchase
// ----------------------------------------------------
app.delete("/api/delete-purchase/:id", (req, res) => {
  const id = req.params.id;
  Purchase.findByIdAndDelete(id)
    .then(purchase => {
      res.json(purchase);
    })
    .catch(error => {
      res.json(error);
    });
});
// ----------------------------------------------------

// delete a purchase
app.delete("/api/delete-purchase", (req, res) => {
  // extracting details for the body
  const body = req.body;
  const id = body.id;
  const name = body.name;
  const number = body.number;
  const amountPaidForPurchaseToBeDeleted = Number(
    body.amountPaidForThisPurchase
  );
  const amountPendingForPurchaseToBeDeleted = Number(
    body.amountYetToBePaidForThisPurchase
  );

  // first deleting purchase from Purchase Collection
  Purchase.findOneAndDelete({ id: id })
    .then(purchase => {
      res.json(purchase);
    })
    .catch(error => {
      res.json(error);
    });

  // looking for that invoice in the Dealer collection
  Dealer.findOne({ name: name, number: number }, (error, dealer) => {
    if (error) {
      res.json(error);
    } else {
      // if that dealer with name and number is present
      if (dealer !== null) {
        // extracting information of that dealer
        const dealerAllBills = dealer.bills;
        const dealerId = dealer._id;
        // extracting old total amount pending
        const oldTotalAmountPending = Number(dealer.totalAmountPending);
        // generating new total amount pending
        let newTotalAmountPending =
          oldTotalAmountPending - Number(amountPendingForPurchaseToBeDeleted);
        // extracting old toal amount paid
        const oldTotalAmountPaid = Number(dealer.totalAmountPaid);
        // generating new total amount received
        let newTotalAmountPaid =
          oldTotalAmountPaid - Number(amountPaidForPurchaseToBeDeleted);
        const newBills = dealerAllBills.filter(bill => bill.id != id);

        // if totalAmountReceived and totalAmountPending in customer is equal, e.g. 1000 & -1000 then that means that account is settled and we need to reset totalAmountRecieved and totalAmountPending to 0

        if (newTotalAmountPaid === -newTotalAmountPending) {
          newTotalAmountPending = 0;
          newTotalAmountPaid = 0;
        }

        Dealer.findByIdAndUpdate(
          dealerId,
          {
            bills: newBills,
            totalAmountPending: Number(newTotalAmountPending),
            totalAmountPaid: Number(newTotalAmountPaid),
          },
          { new: true }
        )
          .then(dealer => {
            res.json(dealer);
          })
          .catch(error => {
            res.json(error);
          });
      }
    }
  });
});

// new invoice schema
const newInvoiceSchema = new Schema({
  id: {
    type: Schema.Types.Mixed,
  },
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  number: {
    type: Number,
  },
  items: {
    type: Schema.Types.Mixed,
  },
  invoiceType: {
    type: String,
  },
  invoiceFormTotal: {
    type: Number,
  },
  amountPaidForThisInvoice: {
    type: Number,
  },
  amountYetToBePaidForThisInvoice: {
    type: Number,
  },
});

const Invoice = mongoose.model("Invoice", newInvoiceSchema);

// get all invoices
app.get("/api/all-invoices", (req, res) => {
  Invoice.find()
    .then(invoice => {
      res.json(invoice);
    })
    .catch(error => {
      res.json(error);
    });
});

// add an invoice
app.post("/api/add-invoice", (req, res) => {
  // first of all extract data out of the request body
  const body = req.body;
  // extracting name and number to query dealer collection
  const name = body.name;
  const number = body.number;
  // extracting bills for later updating the dealer Collection
  const items = body.items;

  // querying for a client
  Client.findOne({ name: name, number: number }, (error, client) => {
    if (error) {
      res.json(error);
    } else {
      if (client !== null) {
        // if client is found then extract the id for updating the collection later
        const id = client._id;

        // checking if that customer already had pending amount to be paid
        const oldTotalAmountPending = Number(client.totalAmountPending);
        // if a bill is added then there will be a new totalPending amount generated based on the invoiceType
        const newTotalAmountPending =
          oldTotalAmountPending + Number(body.amountYetToBePaidForThisInvoice);

        // checking if that customer already had received amount
        const oldtotalAmountReceived = Number(client.totalAmountReceived);
        // if a bill is added then there will be a new totalReceived amount generated based on the invoiceType
        const newtotalAmountReceived =
          oldtotalAmountReceived + Number(body.amountPaidForThisInvoice);

        // extracting the already present bills in that Client document
        const alreadyPresentBills = client.bills;
        // making a new array to pass it on to the updater function
        const newBillToBeAddedToClientCollection = {
          id: body.id,
          date: body.date,
          invoiceType: body.invoiceType,
          invoiceFormTotal: Number(body.invoiceFormTotal),
          amountPaidForThisInvoice: Number(body.amountPaidForThisInvoice),
          amountYetToBePaidForThisInvoice: Number(
            body.amountYetToBePaidForThisInvoice
          ),
          items: body.items,
        };

        const newBillsToBeUpdated = [
          ...alreadyPresentBills,
          newBillToBeAddedToClientCollection,
        ];

        // generating a body for storing invoice in invoice collection
        const newBillToBeAddedToInvoiceCollection = {
          id: body.id,
          date: body.date,
          name: body.name,
          email: body.email,
          address: body.address,
          number: body.number,
          invoiceType: body.invoiceType,
          invoiceFormTotal: Number(body.invoiceFormTotal),
          amountPaidForThisInvoice: Number(body.amountPaidForThisInvoice),
          amountYetToBePaidForThisInvoice: Number(
            body.amountYetToBePaidForThisInvoice
          ),
          items: body.items,
        };

        // finally updating the function with help of id and the temp variable with the old and new bills and new totalPendingAmount
        Client.findByIdAndUpdate(
          id,
          {
            bills: newBillsToBeUpdated,
            totalAmountPending: Number(newTotalAmountPending),
            totalAmountReceived: Number(newtotalAmountReceived),
          },
          { new: true }
        )
          .then(client => {
            res.json(client);
          })
          .catch(error => {
            res
              .json(error)
              .then(response => res.json(response))
              .catch(error => res.json(error));
          });

        const invoice = new Invoice(newBillToBeAddedToInvoiceCollection);
        invoice
          .save()
          .then(invoice => {
            res.json(invoice);
          })
          .catch(error => {
            res
              .json(error)
              .then(invoice => res.json(invoice))
              .catch(error => res.json(error));
          });
      } else {
        // if the client with given name and number is not present then we have to create a new document for him in the Client collection
        // generating data for new client from the data received in the body
        const billGeneratedForThisNewCustomer = [
          {
            id: body.id,
            date: body.date,
            invoiceType: body.invoiceType,
            invoiceFormTotal: Number(body.invoiceFormTotal),
            amountPaidForThisInvoice: Number(body.amountPaidForThisInvoice),
            amountYetToBePaidForThisInvoice: Number(
              body.amountYetToBePaidForThisInvoice
            ),
            items: body.items,
          },
        ];

        const bodyForNewCustomer = {
          name: body.name,
          email: body.email,
          number: body.number,
          address: body.address,
          firstPaymentSent: false,
          totalAmountReceived: Number(body.amountPaidForThisInvoice),
          totalAmountPending: Number(body.amountYetToBePaidForThisInvoice),
          bills: billGeneratedForThisNewCustomer,
        };

        // generating a body for storing invoice in invoice collection
        const newBillToBeAddedToInvoiceCollection = {
          id: body.id,
          date: body.date,
          name: body.name,
          email: body.email,
          address: body.address,
          number: body.number,
          invoiceType: body.invoiceType,
          invoiceFormTotal: Number(body.invoiceFormTotal),
          amountPaidForThisInvoice: Number(body.amountPaidForThisInvoice),
          amountYetToBePaidForThisInvoice: Number(
            body.amountYetToBePaidForThisInvoice
          ),
          items: body.items,
        };

        // saving the data in the Client collection
        const client = new Client(bodyForNewCustomer);
        client
          .save()
          .then(client => {
            res.json(client);
          })
          .catch(error => {
            res.json(error);
          });

        const invoice = new Invoice(newBillToBeAddedToInvoiceCollection);
        invoice
          .save()
          .then(invoice => {
            res.json(invoice);
          })
          .catch(error => {
            res.json(error);
          });
      }
    }
  });
});

// deleting an invoice
app.delete("/api/delete-invoice", (req, res) => {
  // extracting details for the body
  const body = req.body;
  const id = body.id;
  const name = body.name;
  const number = body.number;
  const amountPaidForInvoiceToBeDeleted = Number(body.amountPaidForThisInvoice);
  const amountPendingForInvoiceToBeDeleted = Number(
    body.amountYetToBePaidForThisInvoice
  );

  // first deleting invoice from Invoice Collection
  Invoice.findOneAndDelete({ id: id })
    .then(invoice => {
      res.json(invoice);
    })
    .catch(error => {
      res.json(error);
    });

  // looking for that invoice in the Client collection
  Client.findOne({ name: name, number: number }, (error, client) => {
    if (error) {
      res.json(error);
    } else {
      // if that client with name and number is present
      if (client !== null) {
        // extracting information of that client
        const clientAllBills = client.bills;
        const clientId = client._id;
        // extracting old total amount pending
        const oldTotalAmountPending = Number(client.totalAmountPending);
        // generating new total amount pending
        let newTotalAmountPending =
          oldTotalAmountPending - Number(amountPendingForInvoiceToBeDeleted);
        // extracting old toal amount received
        const oldTotalAmountReceived = Number(client.totalAmountReceived);
        // generating new total amount received
        let newTotalAmountReceived =
          oldTotalAmountReceived - Number(amountPaidForInvoiceToBeDeleted);
        const newBills = clientAllBills.filter(bill => bill.id != id);

        // if totalAmountReceived and totalAmountPending in customer is equal, e.g. 1000 & -1000 then that means that account is settled and we need to reset totalAmountRecieved and totalAmountPending to 0

        if (newTotalAmountReceived === -newTotalAmountPending) {
          newTotalAmountPending = 0;
          newTotalAmountReceived = 0;
        }

        Client.findByIdAndUpdate(
          clientId,
          {
            bills: newBills,
            totalAmountPending: Number(newTotalAmountPending),
            totalAmountReceived: Number(newTotalAmountReceived),
          },
          { new: true }
        )
          .then(client => {
            res.json(client);
          })
          .catch(error => {
            res.json(error);
          });
      }
    }
  });
});

// temp function for deleting
app.delete("/api/delete-invoice/:id", (req, res) => {
  const id = req.params.id;
  Invoice.findByIdAndDelete(id)
    .then(invoice => {
      res.json(invoice);
    })
    .catch(error => {
      res.json(error);
    });
});

// creating incoming payments schema
const incomingPaymentSchema = new Schema({
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

// creating model out of schema
const IncomingPayment = mongoose.model(
  "IncomingPayment",
  incomingPaymentSchema
);

// get all incoming payments
app.get("/api/all-incoming-payments", (req, res) => {
  IncomingPayment.find()
    .then(payments => {
      res.json(payments);
    })
    .catch(error => {
      res.json(error);
    });
});

// add incoming payment
app.put("/api/incoming-payment/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const incomingAmount = Number(req.body.amount);

  Client.findById(id)
    .then(client => {
      const oldTotalAmountPending = Number(client.totalAmountPending);
      const oldTotalAmountReceived = Number(client.totalAmountReceived);
      const newTotalAmountReceived = oldTotalAmountReceived + incomingAmount;
      const newTotalAmountPending = oldTotalAmountPending - incomingAmount;

      Client.findByIdAndUpdate(
        id,
        {
          totalAmountPending: Number(newTotalAmountPending),
          totalAmountReceived: Number(newTotalAmountReceived),
        },
        { new: true }
      )
        .then(client => {
          res.json(client);
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(error => {
      res.json(error);
    });

  const payment = new IncomingPayment(body);

  payment
    .save()
    .then(payment => {
      res.json(payment);
    })
    .catch(error => {
      res.json(error);
    });
});

// deleting an incoming payment
app.delete("/api/delete-incoming-payment/:id", (req, res) => {
  // this id is for incoming payment document
  const id = req.params.id;
  const body = req.body;
  const name = body.name;
  const number = body.number;
  const amount = Number(body.amount);

  Client.findOne({ name: name, number: number }, (error, client) => {
    if (error) {
      res.json(error);
    } else {
      if (client !== null) {
        // this id is for client to update the totalAmountPending and totalAmountReceived
        const idForClientUpdate = client._id;
        const oldTotalAmountPending = Number(client.totalAmountPending);
        const oldTotalAmountReceived = Number(client.totalAmountReceived);
        const newTotalAmountReceived = oldTotalAmountReceived - Number(amount);
        const newTotalAmountPending = oldTotalAmountPending + Number(amount);

        Client.findByIdAndUpdate(
          idForClientUpdate,
          {
            totalAmountPending: newTotalAmountPending,
            totalAmountReceived: newTotalAmountReceived,
          },
          { new: true }
        )
          .then(client => {
            res.json(client);
          })
          .catch(error => {
            res.json(error);
          });
      }
    }
  });

  // deleting that payment from the IncomingPayment model
  IncomingPayment.findByIdAndDelete(id)
    .then(payment => {
      res.json(payment);
    })
    .catch(error => {
      res.json(error);
    });
});

// creating outgoing payments schema
const outgoingPaymentSchema = new Schema({
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

// creating model out of schema
const OutgoingPayment = mongoose.model(
  "OutgoingPayment",
  outgoingPaymentSchema
);

// get all outgoing payments
app.get("/api/all-outgoing-payments", (req, res) => {
  OutgoingPayment.find()
    .then(payments => {
      res.json(payments);
    })
    .catch(error => {
      res.json(error);
    });
});

// handling outgoing payment
app.put("/api/outgoing-payment/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const outgoingAmount = Number(req.body.amount);

  Dealer.findById(id)
    .then(client => {
      const oldTotalAmountPending = Number(client.totalAmountPending);
      const oldTotalAmountPaid = Number(client.totalAmountPaid);
      const newTotalAmountPaid = oldTotalAmountPaid + Number(outgoingAmount);
      const newTotalAmountPending =
        oldTotalAmountPending - Number(outgoingAmount);

      Dealer.findByIdAndUpdate(
        id,
        {
          totalAmountPending: newTotalAmountPending,
          totalAmountPaid: newTotalAmountPaid,
        },
        { new: true }
      )
        .then(dealer => {
          res.json(dealer);
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(error => {
      res.json(error);
    });

  const payment = new OutgoingPayment(body);

  payment
    .save()
    .then(payment => {
      res.json(payment);
    })
    .catch(error => {
      res.json(error);
    });
});

// deleting an outgoing payment
app.delete("/api/delete-outgoing-payment/:id", (req, res) => {
  // this id is for incoming payment document
  const id = req.params.id;
  const body = req.body;
  const name = body.name;
  const number = body.number;
  const amount = Number(body.amount);

  Dealer.findOne({ name: name, number: number }, (error, dealer) => {
    if (error) {
      res.json(error);
    } else {
      if (dealer !== null) {
        // this id is for dealer to update the totalAmountPending and totalAmountReceived
        const idForDealerUpdate = dealer._id;
        const oldTotalAmountPending = Number(dealer.totalAmountPending);
        const oldTotalAmountPaid = Number(dealer.totalAmountPaid);
        const newTotalAmountPaid = oldTotalAmountPaid - Number(amount);
        const newTotalAmountPending = oldTotalAmountPending + Number(amount);

        Dealer.findByIdAndUpdate(
          idForDealerUpdate,
          {
            totalAmountPending: newTotalAmountPending,
            totalAmountPaid: newTotalAmountPaid,
          },
          { new: true }
        )
          .then(client => {
            res.json(client);
          })
          .catch(error => {
            res.json(error);
          });
      }
    }
  });

  OutgoingPayment.findByIdAndDelete(id)
    .then(payment => {
      res.json(payment);
    })
    .catch(error => {
      res.json(error);
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to the website");
});

app.listen(PORT, () => {
  console.log("server running on PORT ", PORT);
});
