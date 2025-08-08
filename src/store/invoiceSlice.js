import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

//load local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) {
      return {
        invoices: [],
        isFormOpen: false,
        filter: "all",
        selectedInvoice: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return {
      invoices: [],
      isFormOpen: false,
      filter: "all",
      selectedInvoice: null,
    };
  }
};

const initialState = loadState();

//save in local Storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};

//calculate whole amount
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
      saveState(state);

      state.isFormOpen = false;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;

      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },

    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      state.isFormOpen = false;
    },

    marksPaid: (state, action) => {
      const invoice = state.invoices.find((inv) => inv.id === action.payload);

      if (invoice) {
        invoice.status = "paid";
        state.selectedInvoice = null;
        state.isFormOpen = false;
        saveState(state);
      }
    },

    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (inv) => inv.id !== action.payload
      );
      state.selectedInvoice = null;
      saveState(state);
    },

    updateInvoice: (state, action) => {
      const updateInvoice = {
        ...action.payload,
        amount: calculateAmount(action.payload.items),
      };

      const index = state.invoices.findIndex(
        (inv) => inv.id === updateInvoice.id
      );

      if (index !== -1) {
        state.invoices[index] = updateInvoice;
      }
      state.selectedInvoice = null;
      state.isFormOpen = false;
      saveState(state);
    },
  },
});

export const {
  toggleForm,
  addInvoices,
  setFilter,
  setSelectedInvoice,
  marksPaid,
  deleteInvoice,
  updateInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
