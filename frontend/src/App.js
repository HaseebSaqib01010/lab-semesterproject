import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actions } from "./Store";
import AddReview from "./Pages/AddReview";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log("login", isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(actions.login());
    }
  }, [dispatch]);
  return (
    <>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}
{
  /* <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="reset" element={<ResetPassword />} /> 
          <Route path="/dashboard" element={<Dashboard />} />*/
}
export default App;
