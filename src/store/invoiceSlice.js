import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

const initialState = {
  invoices: [],
  isFormOpen: false,
  filter: "all",
  selectedInvoice: null,
};

const calculateAmount = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoices: (state, action) => {
      const newInvoice = {
        ...action.payload,
        amount: calculateAmount(action.payload.items),
        status: action.payload.status || "pending",
        dueDate:
          action.payload.dueDate ||
          format(addDays(new Date(), 30), "yyyy-MN-dd"),
      };
      state.invoices.push(newInvoice);
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;

      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },
  },
});

export const { toggleForm, addInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
