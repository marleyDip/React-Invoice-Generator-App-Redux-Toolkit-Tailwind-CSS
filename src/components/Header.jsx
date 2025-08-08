import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/invoiceSlice";

const status = ["all", "paid", "pending", "draft"];

function Header({ onNewInvoice }) {
  const dispatch = useDispatch();

  const { invoices, filter } = useSelector((state) => state.invoices);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 mb-8">
      <div className="flex items-center justify-center gap-5 sm:flex-col sm:gap-0 sm:items-start">
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
          Invoices
        </h1>

        <p className="text-slate-400 font-semibold text-base sm:text-xl">
          {invoices.length === 0
            ? "No Invoice"
            : `There are total ${invoices.length} Invoices`}
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 sm:space-x-4">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-1 sm:space-x-2 text-white group">
            <Filter
              size={20}
              className="transform group-hover:-translate-y-1 transition-all duration-200"
            />
            <span className="text-sm sm:text-xl">Filter by Status</span>
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 z-10 p-1 sm:p-2 w-32 sm:w-48 bg-slate-800 rounded-lg shadow-lg">
            {status.map((s) => (
              <Menu.Item key={s}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-700" : ""
                    } w-full text-left px-4 py-2 rounded-lg capitalize ${
                      filter === s ? "text-violet-500" : "text-white"
                    }`}
                    onClick={() => dispatch(setFilter(s))}
                  >
                    {s}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>

        <button
          type="button"
          className="group bg-gradient-to-r from-blue-500 via-indigo-500  to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          onClick={onNewInvoice}
        >
          <div className="bg-white rounded-full p-1 sm:p-2 transform group-hover:rotate-[360deg] transition-transform duration-300">
            <Plus
              size={16}
              className="text-violet-800 font-medium sm:font-bold"
            />
          </div>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-xl">
            New Invoice
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
