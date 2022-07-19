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
import ComplainAdmin from './pages/ComplainAdmin';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from '../src/config/api';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')
      if(response.status == 400){
        return dispatch({
          type:'LOGOUT'
        })
      }

      let payload = response.data.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload,
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

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
        <Route path="/complain-admin" element={<ComplainAdmin />}/>
      </Routes>
    

  )
}

export default App;
