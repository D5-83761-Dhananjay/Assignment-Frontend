import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toggleChildSelection, addChild } from "../utils/categorySlice";

const Widget = ({ isOpen, onClose }) => {
  const Categories = useSelector((store) => store.category.items);
  const selectedChildren = useSelector(
    (store) => store.category.selectedChildren
  );
  const dispatch = useDispatch();

  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const selectedCategory = useSelector((store) =>
    store.category.items.find((cat) => cat.name === selectedCategoryName)
  );

  const [showAddForm, setShowAddForm] = useState(false); // State to show the Add Form
  const [productName, setProductName] = useState("");
  const [quantityFields, setQuantityFields] = useState([{ name: "", qty: "" }]);

  if (!isOpen) return null;

  const handleCheckboxChange = (categoryName, childName) => {
    dispatch(toggleChildSelection({ categoryName, childName }));
  };

  const handleAddQuantityField = () => {
    setQuantityFields([...quantityFields, { name: "", qty: "" }]);
  };

  const handleQuantityChange = (index, field, value) => {
    const newFields = [...quantityFields];
    newFields[index][field] = value;
    setQuantityFields(newFields);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSave = () => {
    const newProduct = {
      name: productName,
      quantity: quantityFields,
    };

    dispatch(
      addChild({ categoryName: selectedCategory.name, child: newProduct })
    );

    setProductName("");
    setQuantityFields([{ name: "", qty: "" }]);
    setShowAddForm(false);
  };

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out overflow-y-auto">
      <div className="p-4 flex justify-between items-center border-b bg-blue-500">
        <h2 className="text-xl font-bold text-white">Add Widget</h2>
        <button onClick={onClose} className="text-red-600 font-bold text-lg">
          &times;
        </button>
      </div>

      <div className="p-4">
        {Categories.map((category) => (
          <button
            key={category.name}
            className={`${
              selectedCategoryName === category.name
                ? "bg-white text-blue-900"
                : "bg-white text-gray-600"
            } px-4 py-2 rounded `}
            onClick={() => setSelectedCategoryName(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="p-4 bg-gray-100 m-4 rounded shadow">
          <div className="space-y-2">
            {selectedCategory.children?.map((child) => {
              const key = `${selectedCategory.name}:${child.name}`;
              return (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!selectedChildren[key]}
                    onChange={() =>
                      handleCheckboxChange(selectedCategory.name, child.name)
                    }
                  />
                  <span>{child.name}</span>
                </label>
              );
            })}
          </div>

          <button
            className="mt-5 bg-blue-600 px-6 py-3 rounded-md text-white"
            onClick={() => setShowAddForm(true)}
          >
            Add
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="p-4 bg-gray-100 m-4 rounded shadow">
          <h3 className="font-bold text-xl">Add New Product</h3>

          <div className="mt-4">
            <label className="text-sm">Product Name:</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Enter product name"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>

          <div className="mt-4 space-y-4">
            {quantityFields.map((field, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  className="border p-2 rounded w-1/2"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) =>
                    handleQuantityChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="border p-2 rounded w-1/2"
                  placeholder="Quantity"
                  value={field.qty}
                  onChange={(e) =>
                    handleQuantityChange(index, "qty", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              onClick={handleAddQuantityField}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Add More
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Save Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
