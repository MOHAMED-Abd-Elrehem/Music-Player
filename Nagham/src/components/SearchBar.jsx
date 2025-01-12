import React from "react";
import { FaSearch } from "react-icons/fa"; // Example icon

const SearchBar = ( onSearch ) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <div className="relative  pb-20  ml-12 mt-4 w-full">
      <div className="absolute top-3 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        className="w-2/4   border border-none text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 
      dark:bg-zinc-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default SearchBar;
