import { useContext, useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Layout } from "../layout/Layout";
import { getAccessToken } from "../utils";
import Login from "../pages/login/LoginManager";
import Index from "../components/main/index";
import { GlobalProvider } from "../context/GlobalContext";

const AppRouting = () => {
  const {
    state: { access_token },
    dispatch,
  } = useContext(AuthContext);

  let element = useRoutes([
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/",
      element: (
        <GlobalProvider>
          <Layout>
            <Index />
          </Layout>
        </GlobalProvider>
      ),
    },
    {
      path: "*",
      element: <>Not Found ...</>,
    },
  ]);

  // create navigate
  const navigate = useNavigate();

  useEffect(() => {
    const cookie_accessToken = getAccessToken();
    window.addEventListener("storage", () => {
      const result = cookie_accessToken ? true : false;
      if (!result) {
        // logOut(dispatch);
      }
    });

    // clear event when component unmount
    return () => {
      window.removeEventListener("storage", () => true);
    };
  }, []);
// Leader Changes
  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    }
  }, [access_token]);

  return element;
};

export default AppRouting;
