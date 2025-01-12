import { useState, useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlist from "../src/components/Playlist";
import Favorite from "../src/components/Favorite";
import Sidebar from "../src/components/Sidebar";
import { setClientToken } from "./services/spotify";
import Login from "./components/Login";
import { ThemeProvider } from "./services/themeContext";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);
    const [themeMode, setThemeMode] = useState("light");

    const darkTheme = () => {
      setThemeMode("dark");
    };

    const lightTheme = () => {
      setThemeMode("light");
    };

    useEffect(() => {
      document.querySelector("html").classList.remove("dark", "light");
      document.querySelector("html").classList.add(themeMode);
    }, [themeMode]);
  return !token ? (
    <Login />
  ) : (
   <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className="pt-12 w-10/12 bg-inherit rounded-2xl p-10  ">
        <div className="flex ">
          <Router>
            <div className="bg-black flex w-full p-10 rounded-2xl">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playlists" element={<Playlist />} />
                <Route path="/favorites" element={<Favorite />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
  </ThemeProvider>
  );
};

export default App;
