import { Plus, Trash2, X } from "lucide-react";

import { useDispatch } from "react-redux";
import { addInvoices, toggleForm } from "../store/invoiceSlice";
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

  //console.log(formData);

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("working");

    dispatch(addInvoices(formData));
    console.log(formData);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? value : newItems[index].quantity;
      const price = field === "price" ? value : newItems[index].price;

      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

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

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* bill from */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill Form</h3>

            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billForm: {
                    ...formData.billForm,
                    streetAddress: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billForm: {
                    ...formData.billForm,
                    city: e.target.value,
                  },
                })
              }
            />

            <input
              type="text"
              placeholder="Post code"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billForm: {
                    ...formData.billForm,
                    postCode: e.target.value,
                  },
                })
              }
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billForm.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billForm: {
                    ...formData.billForm,
                    country: e.target.value,
                  },
                })
              }
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
              value={formData.clientName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientName: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Client's Email"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    clientEmail: e.target.value,
                  },
                })
              }
            />

            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    streetAddress: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    city: e.target.value,
                  },
                })
              }
            />

            <input
              type="text"
              placeholder="Post code"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billTo.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    postCode: e.target.value,
                  },
                })
              }
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              required
              value={formData.billTo.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
          {/* bill to */}

          {/* date */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;

                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: format(
                      addDays(new Date(newDate), 30),
                      "yyyy - MM - dd"
                    ),
                  });
                }}
              />

              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                required
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({ ...formData, paymentTerms: e.target.value })
                }
              >
                <option>Net 30 Days</option>

                <option>Net 60 Days</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Project Description"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
              value={formData.projectDescription}
              onChange={(e) =>
                setFormData({ ...formData, projectDescription: e.target.value })
              }
            />
          </div>
          {/* date */}

          {/* item list */}
          <div className="space-y-4">
            <h3>Item List</h3>

            {formData.items.map((item, index) => (
              <div className="grid grid-cols-12 gap-4 items-center" key={index}>
                <input
                  type="text"
                  placeholder="Item Name"
                  className="col-span-5 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                  value={item.name}
                  onChange={(e) => {
                    const updateItem = [...formData.items];
                    updateItem[index].name = e.target.value;

                    setFormData({ ...formData, items: updateItem });
                  }}
                />

                <input
                  type="number"
                  placeholder="Qty"
                  className="col-span-2 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                  min="1"
                  required
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value))
                  }
                />

                <input
                  type="number"
                  placeholder="price"
                  className="col-span-2 rounded-lg border border-slate-700 bg-slate-900 p-3 placeholder-gray-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                  min="0"
                  step="0.01"
                  required
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value))
                  }
                />

                <div className="col-span-2 text-right">
                  ৳ {item.total.toFixed(2)}
                </div>

                <button
                  type="button"
                  className="text-slate-300 hover:text-red-400 cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <button
              className="flex items-center justify-center w-full space-x-2 bg-slate-700 hover:bg-slate-600 rounded-lg p-3"
              onClick={addItem}
            >
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
              type="submit"
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
