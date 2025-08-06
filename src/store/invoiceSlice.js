import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  isFormOpen: false,
  filter: "all",
  selectedInvoice: null,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;

      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },
  },
});

export const { toggleForm } = invoiceSlice.actions;
export default invoiceSlice.reducer;
