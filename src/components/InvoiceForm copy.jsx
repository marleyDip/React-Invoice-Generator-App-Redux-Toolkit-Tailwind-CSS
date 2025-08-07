import { useState } from "react";

function InvoiceForm() {
  // nested object
  const [formData, setFormData] = useState(() => {
    return {
      id: `INV${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      status: "pending",

      billForm: { streetAddress: "", city: "" },

      billTo: {
        clientEmail: "",
        streetAddress: "",
      },
      items: [],
    };
  });

  // 1st method - short
  const handleChangeValue1 = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      billForm: {
        ...prev.billForm,
        [name]: value,
      },
    }));
  };

  //second method - long
  const handleChangeValue2 = (event) => {
    const oldData = { ...formData, billTo: { ...formData.billTo } };

    const inputName = event.target.name;
    const inputValue = event.target.value;

    oldData.billTo[inputName] = inputValue;

    setFormData(oldData);
  };

  // If you have multiple sections (billForm, billTo, etc.), you can pass the section name:
  const handleChangeValue3 = (section) => (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  // Here [section], which is just a string, not the actual object stored in formData[section].
  const handleChangeValue4 = (section) => (event) => {
    const oldData = {
      ...formData,
      [section]: {
        ...formData[section],
      },
    };

    const inputName = event.target.name;
    const inputValue = event.target.value;

    oldData[section][inputName] = inputValue;

    setFormData(oldData);
  };

  // button add data
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  //button update date
  const updateItem = (index, field, value) => {
    const newItem = [...formData.items];
    newItem[index][field] = value;

    newItem[index].total = newItem[index].quantity * newItem[index].price;
    // That would work only after state has been updated - total might not update immediately

    // it update "total" dynamically with middle of updating change price, quantity
    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? value : newItem[index].quantity;
      const price = field === "price" ? value : newItem[index].price;

      newItem[index].total = qty * price; // "2" * "3.4" = 6.8
    }

    setFormData({ ...formData, items: newItem });
  };

  // btn remove items
  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // (_, i) => If you only care about the index and don’t need the item itself, you can name the first argument _ to show that it's unused:

  // single object
  const [formData1, setFormData1] = useState({
    billForm: "",
    billTo: "",
  });

  const handleValue1 = (e) => {
    const { name, value } = e.target;

    setFormData1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValue2 = (event) => {
    const oldData = { ...formData1 };

    const inputName = event.target.name;
    const inputValue = event.target.value;

    oldData[inputName] = inputValue;

    setFormData1(oldData);
  };

  return (
    <>
      <form className="space-y-6">
        {/* Direct Method 1 */}
        <input
          type="text"
          placeholder="Street Address"
          value={formData.billForm.streetAddress}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              billForm: {
                ...prev.billForm,
                streetAddress: e.target.value,
              },
            }))
          }
        />
        {/* Direct Method 1 */}

        {/* Direct Method 2 */}
        <input
          type="text"
          placeholder="City"
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
        {/* Direct Method 2 */}

        {/* bill from */}
        <div className="space-y-4">
          <h3 className="text-violet-500 font-bold">Bill Form</h3>

          <input
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={formData.billForm.streetAddress}
            onChange={handleChangeValue1}
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.billForm.city}
            onChange={handleChangeValue3("billForm")}
          />
        </div>
        {/* bill from */}

        {/* bill to */}
        <div className="space-y-4">
          <h3 className="text-violet-500 font-bold">Bill To</h3>

          <input
            type="email"
            placeholder="Client's Email"
            name="clientEmail"
            value={formData.billTo.clientEmail}
            onChange={handleChangeValue4("billTo")}
          />

          <input
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={formData.billTo.streetAddress}
            onChange={handleChangeValue2}
          />
        </div>
        {/* bill to */}

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
                  updateItem(index, "name", parseInt(e.target.value))
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
                onclick={() => removeItem(index)}
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
      </form>

      <form>
        {/* direct method */}
        <input
          type="text"
          placeholder="Street Address"
          value={formData1.billForm}
          onChange={(event) =>
            setFormData1({ ...formData1, billForm: event.target.value })
          }
        />

        <input
          type="text"
          placeholder="Street Address"
          value={formData1.billTo}
          onChange={(e) =>
            setFormData1((prev) => ({
              ...prev,
              billTo: e.target.value,
            }))
          }
        />
        {/* direct method */}

        <input
          type="text"
          placeholder="Street Address"
          name="billForm"
          value={formData1.billForm}
          onChange={handleValue1}
        />

        <input
          type="text"
          placeholder="Street Address"
          name="billTo"
          value={formData1.billTo}
          onChange={handleValue2}
        />
      </form>
    </>
  );
}

export default InvoiceForm;

/*  
      => we know also "2" + "3" = 23 but +"2" + +"3" = 5....js work perfectly -, *, /, %, **....not only +
      
      if field = "price" and value = "200", this sets:
            newItems[index].price = "200";

      => qty and price come from value, which is a string from the input event — multiplying strings can cause unexpected behavior

      => (like "2" * "3" works in JS but isn't safe).

      => Could silently break if value is empty string "" → result: 0 or NaN. so thats why use   =>  parseFloat(...) || 0 => 	Convert string input to a safe number

      const qty1 =
          parseFloat(field === "quantity" ? value : newItem[index].price) || 0;

   This ensures: "5" → 5
                "" → NaN → fallback to 0
                "abc" → NaN → fallback to 0 
  */

// this is for update total amount, If price or quantity changed, use value as price, Always uses the most recent inputs

/*  Case 1: field === "quantity"
          const qty = value; // because you just changed quantity
          const price = newItems[index].price; // keep the old price
       
        Case 2: field === "price"
          const qty = newItems[index].quantity; // keep the old quantity
          const price = value; // because you just changed price 

          So in both cases, you:
          => Use the newly typed value for the changed field
          => Use the existing value for the unchanged field
  */
