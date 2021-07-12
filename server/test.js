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
