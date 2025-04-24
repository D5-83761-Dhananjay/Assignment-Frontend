import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Widget from "./Widget";

const Body = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Categories = useSelector((store) => store.category.items);
  const selectedChildren = useSelector(
    (store) => store.category.selectedChildren
  );

  return (
    <div className="bg-blue-100">
      <div className="bg-blue-100 flex items-center px-6">
        <div className="font-bold text-2xl p-6 pt-8">CNAPP Dashboard</div>
        <button
          className="bg-white text-blue-500 py-2 px-4 rounded ml-auto mr-20"
          onClick={() => setIsOpen(true)}
        >
          Add Widget +
        </button>
        {isOpen && <Widget isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </div>

      {Categories.length !== 0 && (
        <div>
          {Categories.map((catg) => {
            const selected = catg.children.filter(
              (child) => selectedChildren[`${catg.name}:${child.name}`]
            );

            const fixedSlots = [selected[0], selected[1]];
            const remaining = selected.slice(2);

            return (
              <div key={catg.name} className="mb-6">
                <div className="ml-14">
                  <h1 className="font-bold">{catg.name}</h1>
                </div>

                <div className="ml-16">
                  <div className="flex gap-4 overflow-x-auto">
                    <div className="p-4 bg-white rounded-md h-72 w-96 border-2 border-blue-500 flex-shrink-0">
                      {fixedSlots[0] ? (
                        <Dashboard childName={fixedSlots[0].name} />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg
                            className="w-8 h-8 mb-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3v18h18"
                            />
                          </svg>
                          <p>No insight data available</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-white rounded-md h-72 w-96 border-2 border-blue-500 flex-shrink-0">
                      {fixedSlots[1] ? (
                        <Dashboard childName={fixedSlots[1].name} />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg
                            className="w-8 h-8 mb-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3v18h18"
                            />
                          </svg>
                          <p>No insight data available</p>
                        </div>
                      )}
                    </div>

                    {remaining.map((child) => (
                      <div
                        key={child.name}
                        className="p-4 bg-white rounded-md h-72 w-96 border-2 border-blue-500 flex-shrink-0"
                      >
                        <Dashboard childName={child.name} />
                      </div>
                    ))}

                    <div
                      className="p-4 h-72 w-96 bg-white rounded-md flex items-center justify-center border-2 border-blue-500 cursor-pointer flex-shrink-0"
                      onClick={() => setIsOpen(true)}
                    >
                      <span className="text-center font-semibold text-blue-500">
                        Add Widget
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="h-7"></div>
    </div>
  );
};

export default Body;
