import { useContext, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAccessToken } from "../utils";
// import "../styles/layout.scss";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { ThemeContext } from "../context/ThemeContext";

export const Layout = ({ children, type }) => {
  const location = useLocation();
  // const { darkMode } = useContext(ThemeContext);
  const layoutRef = useRef();
  const { dispatch } = useContext(AuthContext);
  const access_token = getAccessToken();

  useLayoutEffect(() => {
    layoutRef.current.classList.add("fade-in");
    setTimeout(() => {
      layoutRef.current.classList.remove("fade-in");
    }, 510);
  }, [location.pathname]);

  useLayoutEffect(() => {
    // dispatch({ type: "LOGOUT" });
    window.addEventListener("storage", (e) => {
      dispatch({ type: "LOGOUT" });
    });
    return () => {
      window.removeEventListener("storage", (e) => {
        return false;
      });
    };
  }, [window.localStorage]);


  

  return (
    <div className={`layout${type ? " " + type : ""} `} ref={layoutRef}>
      {type === "full-page" ? (
        <main>{children}</main>
      ) : (
        <>
          {/* <Header /> */}
          <main>{children}</main>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};
