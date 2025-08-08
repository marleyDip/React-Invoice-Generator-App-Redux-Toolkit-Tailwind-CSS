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
  },
});

export const { toggleForm, addInvoices, setFilter } = invoiceSlice.actions;
export default invoiceSlice.reducer;
