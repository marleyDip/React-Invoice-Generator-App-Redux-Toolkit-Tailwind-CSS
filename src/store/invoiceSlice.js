import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  filter: "all",
  isFormOpen: false,
  selectedInvoice: null,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
});

//const {} = invoiceSlice.actions;
export default invoiceSlice.reducer;
