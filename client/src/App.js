import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/styles.css';
import Home from './pages/Home';
import RegisterComponent from './pages/Register';
import LoginComponent from "./pages/Login";
import ProfilePage from './pages/Profile';
import DetailProduct from "./pages/Detail-Product";
import CategoryComponent from "./pages/Category";
import ListProductComponent from "./pages/ListProduct";
import EditCategory from "./pages/EditCategory";
import EditProductComponent from "./pages/EditProduct";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import Complain from './pages/Complain';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API } from "./config/api";

function App() {

  let navigate = useNavigate()
  let api = API();

  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // // Get user data
      let payload = response.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
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
  }, []);

  return (

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginComponent />}/>
        <Route path="/register" element={<RegisterComponent />}/>
        <Route path="/detail-product/:id" element={<DetailProduct />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/product" element={<ListProductComponent/>}/>
        <Route path="/category" element={<CategoryComponent/>}/>
        <Route path="/edit-product/:id" element={<EditProductComponent/>}/>
        <Route path="/edit-category/:id" element={<EditCategory/>}/>
        <Route path="/add-product" element={<AddProduct />}/>
        <Route path="/add-category" element={<AddCategory />}/>
        <Route path="/complain" element={<Complain />}/>
      </Routes>
    

  )
}

export default App;
