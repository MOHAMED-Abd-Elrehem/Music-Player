import { NavLink } from "react-router-dom";
import { FaList, FaHeart, FaHome } from "react-icons/fa"; 
import { IconContext } from "react-icons";
import ThemeBtn from "./ThemeBtn";
const Sidebar = () => {
  return (
    <>
      <div className="w-2/12  bg-zinc-900 z-10 rounded-3xl ">
        <div className="p-4">
          <div className="flex flex-col items-center pb-52">
            <img
              src="../../Intricate Geometric Logo With Celtic Knot Design.png"
              alt="logo"
              className="w-10 h-10 rounded-full content-center "
            />
            <h1 className="text-2xl m-auto  pt-1 text-slate-200">NaGHam</h1>
          </div>
          <IconContext.Provider value={{ size: "25px", className: "btn-icon" }}>
            <ul className="space-y-2">
              <li className="pb-9 text-slate-200">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-800 hover:text-slate-300 ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  <FaHome className="mr-2" />
                  Home
                </NavLink>
              </li>
              <li className="pb-9 text-slate-200">
                <NavLink
                  to="/playlists"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-800 hover:text-slate-300 ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  <FaList className="mr-2" />
                  Playlists
                </NavLink>
              </li>
              <li className="pb-9 text-slate-200">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md hover:bg-gray-800 hover:text-slate-300 ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  <FaHeart className="mr-2" />
                  Favorites
                </NavLink>
              </li>
            </ul>
          </IconContext.Provider>
          <ThemeBtn />
        </div>
      </div>
      
    </>
  );
};

export default Sidebar;
