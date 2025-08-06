import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const status = ["all", "paid", "pending", "draft"];

function Header({ onNewInvoice }) {
  const { invoices, filter } = useSelector((state) => state.invoices);

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl  font-bold text-white  mb-2">
          Invoices
        </h1>

        <p className="text-slate-400 font-semibold text-lg md:text-xl">
          {invoices.length === 0
            ? "No Invoice"
            : `There are total ${invoices.length} Invoices`}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 text-white group">
            <Filter
              size={24}
              className="transform group-hover:-translate-y-1 transition-all duration-200"
            />
            <span>Filter by Status</span>
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 z-10 p-2 w-48 bg-slate-800 rounded-lg shadow-lg">
            {status.map((s) => (
              <Menu.Item key={s}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-700" : ""
                    } w-full text-left px-4 py-2 rounded-lg capitalize ${
                      filter === s ? "text-violet-500" : "text-white"
                    }`}
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
          className="group bg-gradient-to-r from-blue-500 via-indigo-500  to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          onClick={onNewInvoice}
        >
          <div className="bg-white rounded-full p-2 transform group-hover:rotate-[360deg] transition-transform duration-300">
            <Plus size={16} className="text-violet-800 font-bold" />
          </div>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            New Invoice
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
