import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AllCountries from "./allCountries/AllCountries";

const MainPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const themeChanger = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme == "dark") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };
  return (
    <>
      <header>
        <nav>
          <h1 className="title">Where in the world</h1>
          <div id="" onClick={themeChanger} className="themeChanger">
            <i className="fi fi-rr-moon-stars"></i>Dark Mode
          </div>
        </nav>
      </header>

      <main id="main">
        {pathname === "/" && <AllCountries />}
        <Outlet />
      </main>
    </>
  );
};

export default MainPage;
