import { format, parseISO } from "date-fns";

import { useDispatch } from "react-redux";
import {
  deleteInvoice,
  marksPaid,
  setSelectedInvoice,
  toggleForm,
} from "../store/invoiceSlice";

function InvoiceDetails({ invoice }) {
  //console.log(invoice);

  const dispatch = useDispatch();

  const handleMarksPaid = () => {
    dispatch(marksPaid(invoice.id));
  };

  const handleEdit = () => {
    dispatch(toggleForm());
  };

  const handleDeleteInvoice = () => {
    dispatch(deleteInvoice(invoice.id));
    dispatch(setSelectedInvoice(null));
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch (err) {
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 sm:p-8">
      {/* status & btn */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 mb-4 sm:mb-8">
        <div className="flex items-center justify-center w-full md:justify-start space-x-4">
          <span className="sm:text-xl capitalize">status</span>

          <div
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 ${
              invoice.status === "paid"
                ? "bg-green-900/20 text-green-500"
                : invoice.status === "pending"
                ? "bg-orange-900/20 text-orange-500"
                : "bg-slate-700/50 text-slate-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                invoice.status === "paid"
                  ? "bg-green-500"
                  : invoice.status === "pending"
                  ? "bg-orange-500"
                  : "bg-slate-400"
              }`}
            ></div>

            <span className="capitalize font-semibold text-base sm:text-lg ">
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-evenly w-full md:justify-end  md:space-x-4">
          <button
            className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-500 hover:to-slate-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out"
            onClick={handleDeleteInvoice}
          >
            Delete
          </button>

          <button
            className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-violet-500 to-purple-700 hover:from-violet-400 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out"
            onClick={handleMarksPaid}
          >
            Mark as Paid
          </button>
        </div>
      </div>
      {/* status & btn */}

      {/* invoice details */}
      <div className="bg-slate-900 rounded-lg p-8">
        {/* bill form */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="sm:text-xl font-bold mb-2">{invoice.id}</h2>

            <p className="text-slate-400 sm:text-lg">
              {invoice.projectDescription}
            </p>
          </div>

          <div className="text-right text-slate-400 text-sm sm:text-lg space-x-2 sm:space-x-4">
            <p>{invoice.billForm.streetAddress}</p>
            <p>{`${invoice.billForm.city}, ${invoice.billForm.postCode}, ${invoice.billForm.country}`}</p>
          </div>
        </div>
        {/* bill form */}

        {/* bill to */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
          <div>
            <p className="text-xs sm:text-base text-slate-400 sm:mb-1">
              Invoice Date
            </p>
            <p className="text-sm font-medium sm:text-lg sm:font-bold mb-2">
              {formatDate(invoice.invoiceDate)}
            </p>

            <p className="text-xs sm:text-base text-slate-400 sm:mb-1">
              Payment Due
            </p>
            <p className="text-sm font-medium sm:text-base sm:font-bold">
              {formatDate(invoice.dueDate)}
            </p>
          </div>

          <div className="text-sm sm:text-lg">
            <p className="text-slate-400 font-semibold mb-1 sm:mb-2">Bill To</p>
            <p className="text-slate-400 font-bold mb-1 sm:mb-2">
              {invoice.clientName}
            </p>
            <p className="text-slate-400">{invoice.billTo.streetAddress}</p>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <p className="text-slate-400">
                {[
                  invoice.billTo.city,
                  invoice.billTo.postCode,
                  invoice.billTo.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 mb-1 sm:mb-2 font-semibold">Sent To</p>
            <p className="text-base font-semibold sm:text-xl sm:font-bold">
              {invoice.billTo.clientEmail}
            </p>
          </div>
        </div>
        {/* bill to */}

        {/* item details */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="p-4 sm:p-8 text-sm sm:text-xl">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left">Item Name</th>
                  <th className="text-center">Qty</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.items.map((item, index) => (
                  <tr className="text-white" key={index}>
                    <td className="text-left">{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 p-4 sm:p-8 flex items-center justify-between">
            <span className="text-white text-sm sm:text-xl font-medium sm:font-semibold">
              Amount Due
            </span>

            <span className="text-xl sm:text-3xl font-semibold sm:font-bold">
              ৳ {invoice.amount.toFixed(2)}
            </span>
          </div>
        </div>
        {/* item details */}
      </div>
      {/* invoice details */}
    </div>
  );
}

export default InvoiceDetails;
