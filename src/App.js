import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import LoadingComponent from "./components/Loading/Loading";
import Nav from "./components/Nav/Nav";
import irongramRoutes from "./config/routes";
import { getMe, logoutRequest } from "./service/auth/auth.service";
import { getAccessToken, removeAccessToken } from "./utils/consts";

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  function authenticate(userData) {
    setUser(userData);
  }

  function logout() {
    logoutRequest().finally(() => {
      removeAccessToken();
      setUser(undefined);
    });
  }

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setLoading(false);
      return;
    }

    getMe(accessToken)
      .then((response) => {
        if (!response.data.user) {
          removeAccessToken();
          // this shouldnt happen, but it can. why? javascript. thats why
          return;
        }
        authenticate(response.data.user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="App">
      <Nav user={user} logout={logout} />
      <Routes>
        {irongramRoutes({
          user,
          setUser,
          authenticate,
        }).map((object) => (
          <Route
            key={object.path}
            path={object.path}
            element={object.element}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
