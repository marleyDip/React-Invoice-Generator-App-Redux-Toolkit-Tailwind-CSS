import Header from "./Header";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";

function AppContent() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Header />
        {/*  <InvoiceList /> */}
        <InvoiceForm />
      </div>
    </div>
  );
}

export default AppContent;
