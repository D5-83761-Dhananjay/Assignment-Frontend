import { useState } from "react";

const Header = () => {
  const [searchText, setSearchText] = useState("");

  function handleKey(event) {
    if (event.key == "Enter") {
    }
  }

  return (
    <div className="flex m-2">
      <h1 className="text-gray-400 mt-2 ml-4">Home {">"} </h1>
      <h1 className="font-semibold mt-2 ml-1">Dashboard V2</h1>

      <input
        type="text"
        value={searchText}
        onKeyDown={handleKey}
        className="ml-96 w-96 pl-4 py-2 bg-blue-100 border border-gray-300 rounded placeholder-black text-sm"
        placeholder="Search anything..."
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Header;
