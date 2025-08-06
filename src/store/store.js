import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./invoiceSlice";

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});
