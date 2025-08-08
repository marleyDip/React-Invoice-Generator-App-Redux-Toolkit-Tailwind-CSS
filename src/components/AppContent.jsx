import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import { toggleForm } from "../store/invoiceSlice";
import InvoiceDetails from "./InvoiceDetails";

function AppContent() {
  const dispatch = useDispatch();

  //destructure
  const { isFormOpen, selectedInvoice } = useSelector(
    (state) => state.invoices
  );
  //console.log(isFormOpen);

  const handleNewInvoice = () => {
    dispatch(toggleForm());
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Header onNewInvoice={handleNewInvoice} />

        {selectedInvoice ? (
          <InvoiceDetails invoice={selectedInvoice} />
        ) : (
          <InvoiceList />
        )}

        {isFormOpen && <InvoiceForm invoice={selectedInvoice} />}
      </div>
    </div>
  );
}

export default AppContent;
