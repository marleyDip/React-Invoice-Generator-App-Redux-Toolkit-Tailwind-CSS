import { ChevronRight } from "lucide-react";

function InvoiceList() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700 cursor-pointer transition-colors duration-200">
        <div className="flex items-center space-x-6">
          <span className="text-slate-400">Invoice ID</span>

          <span className="text-slate-400">Due Date</span>

          <span className="text-slate-400">John Doe</span>
        </div>

        {/* invoice body */}
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-bold">৳ 350 000</span>

          <div>
            <span className="capitalize">invoice Status</span>
          </div>

          <ChevronRight className="text-violet-500" />
        </div>
        {/* invoice body */}
      </div>
    </div>
  );
}

export default InvoiceList;
