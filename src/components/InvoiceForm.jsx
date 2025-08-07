import { Plus, Trash2, X } from "lucide-react";

import { useDispatch } from "react-redux";
import { toggleForm } from "../store/invoiceSlice";
import { useState } from "react";
import { addDays, format } from "date-fns";

function InvoiceForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(() => {
    return {
      id: `INV${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      status: "pending",

      billForm: { streetAddress: "", city: "", postCode: "", country: "" },

      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },

      clientName: "",
      paymentTerms: "Net 30 Days",
      projectDescription: "",

      items: [],
      amount: 0,

      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    };
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start  justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">New Invoice</h2>

          <button
            type="button"
            className="p-1 hover:text-black  hover:bg-gray-50 rounded-full cursor-pointer transform hover:rotate-[360deg]  transition-all  duration-200"
            onClick={() => dispatch(toggleForm())}
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6">
          {/* bill from */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill Form</h3>

            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.streetAddress}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.city}
            />

            <input
              type="text"
              placeholder="Post code"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />
          </div>
          {/* bill from */}

          {/* bill to */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill To</h3>

            <input
              type="text"
              placeholder="Client's Name"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />

            <input
              type="email"
              placeholder="Client's Email"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />

            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />

            <input
              type="text"
              placeholder="Post code"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
            />
          </div>
          {/* bill to */}

          {/* date */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              />

              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                required
              >
                <option>Net 30 Days</option>

                <option>Net 60 Days</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Project Description"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
            />
          </div>
          {/* date */}

          {/* item list */}
          <div className="space-y-4">
            <h3>Item List</h3>

            <div className="grid grid-cols-12 gap-4 items-center">
              <input
                type="text"
                placeholder="Item Name"
                className="col-span-5 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              />

              <input
                type="number"
                placeholder="Quantity"
                className="col-span-2 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                min="1"
                required
              />

              <input
                type="number"
                placeholder="price"
                className="col-span-2 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                min="0"
                step="0.01"
                required
              />

              <div className="col-span-2 text-right">Total Amount</div>

              <button
                type="button"
                className="text-slate-300 hover:text-red-400 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <button className="flex items-center justify-center w-full space-x-2 bg-slate-700 hover:bg-slate-600 rounded-lg p-3">
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>
          {/* item list */}

          {/* btn */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="rounded-full px-6 py-3 text-white bg-gradient-to-br from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transform hover:-translate-x-2 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded-full px-6 py-3 text-white bg-gradient-to-br from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800 transform hover:translate-x-2 transition-all duration-200"
            >
              Create Invoice
            </button>
          </div>
          {/* btn */}
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
