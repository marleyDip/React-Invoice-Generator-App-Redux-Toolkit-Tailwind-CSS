import React from "react";

function InvoiceDetails() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 sm:p-8">
      {/* status & btn */}
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <div className="flex items-center space-x-4">
          <span className="sm:text-xl">Status</span>
        </div>

        <div className="flex flex-nowrap space-x-2 sm:flex-row sm:space-x-4">
          <button className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-500 hover:to-slate-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out">
            Edit
          </button>

          <button className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5transition-all duration-300 ease-out">
            Delete
          </button>

          <button className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-violet-500 to-purple-700 hover:from-violet-400 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out">
            Mark as Paid
          </button>
        </div>
      </div>
      {/* status & btn */}

      {/* invoice details */}
      <div className="bg-slate-900 rounded-lg p-8">
        {/* bill form */}
        <div className="flex justify-between mb-4 sm:mb-8">
          <div>
            <h2 className="sm:text-xl font-bold mb-2">id</h2>

            <p className="text-slate-400 sm:text-lg">projectDescription</p>
          </div>

          <div className="text-right text-slate-400 text-sm sm:text-lg">
            <p>streetAddress</p>
            <p>city</p>
            <p>postCode</p>
            <p>country</p>
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
              invoiceDate
            </p>

            <p className="text-xs sm:text-base text-slate-400 sm:mb-1">
              Payment Due
            </p>
            <p className="text-sm font-medium sm:text-base sm:font-bold">
              dueDate
            </p>
          </div>

          <div className="text-sm sm:text-lg transform -translate-x-1/4 sm:-translate-x-0 transition-transform">
            <p className="text-slate-400 font-bold mb-1 sm:mb-2">Bill To</p>
            <p className="text-slate-400 mb-1 sm:mb-2">clientName</p>
            <p className="text-slate-400">streetAddress</p>

            <div className="flex items-center space-x-1 sm:space-x-3">
              <p className="text-slate-400">city</p>
              <p className="text-slate-400">postCode</p>
              <p className="text-slate-400">country</p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 mb-1 sm:mb-2 font-bold">Sent To</p>
            <p className="text-base font-semibold sm:text-xl sm:font-bold">
              clientEmail
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
                <tr className="text-white">
                  <td className="text-left">Item Name</td>
                  <td className="text-center">Qty</td>
                  <td className="text-right">Price</td>
                  <td className="text-right">Total</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 p-4 sm:p-8 flex items-center justify-between">
            <span className="text-white text-base sm:text-xl font-medium sm:font-semibold">
              Amount Due
            </span>

            <span className="text-2xl sm:text-3xl font-semibold sm:font-bold">
              ৳ amount
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
