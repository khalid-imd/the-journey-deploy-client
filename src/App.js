import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import NewJourney from "./pages/newJourney";
import Profile from "./pages/profile";
import BookMark from "./pages/bookmark";
import Detail from "./pages/detailPost";
import Index from "./pages";
import IndexLogin from "./pages/indexAfterLogin";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import PrivateRoute from "./pages/privateRoute";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [state]);

  return (
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/home" element={<IndexLogin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/bookmark" element={<BookMark />} />
        <Route exact path="/new-journey" element={<NewJourney />} />
        <Route exact path="/detail/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;
