import { format, parseISO } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

function InvoiceList() {
  const { invoices } = useSelector((state) => state.invoices);
  //console.log(invoices);

  const formatDate = (date) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="bg-slate-800 rounded-lg p-3 sm:p-6 flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-700 cursor-pointer transition-colors duration-200"
        >
          {/* Left section */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-slate-400">
            <span className="font-semibold text-sm sm:text-xl">
              {invoice.id}
            </span>
            <span className="font-medium text-xs sm:text-lg">
              due {formatDate(invoice.dueDate)}
            </span>
            <span className="font-bold text-base sm:text-2xl">
              {invoice.clientName}
            </span>
          </div>

          {/* Right section */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 group">
            <span className="text-base sm:text-xl md:text-2xl font-medium md:font-bold">
              ৳ {invoice.amount?.toFixed(2) || "0.00"}
            </span>

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

            <ChevronRight
              size={20}
              className="text-violet-500 font-bold transform group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-200"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceList;
