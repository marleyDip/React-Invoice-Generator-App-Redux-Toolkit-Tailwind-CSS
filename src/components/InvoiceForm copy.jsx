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
