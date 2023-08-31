import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Layouts from './components/Layouts';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PrivateRoutes from './components/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import MyOredrs from './pages/MyOredrs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layouts/>}>
          <Route index element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='wishlist' element={<PrivateRoutes/>}>
          <Route path='/wishlist' element={<Wishlist/>}/> 
          </Route>
          
          <Route path='cart' element={<PrivateRoutes/>}>
          <Route path='/cart' element={<Cart/>}/> 
          </Route>
          <Route path='my-order' element={<PrivateRoutes/>}>
          <Route path='/my-order' element={<MyOredrs/>}/> 
          </Route>
          <Route path='checkout' element={<PrivateRoutes/>}>
          <Route path='/checkout' element={<Checkout/>}/> 
          </Route>
          <Route path='/products/:id' element={<ProductDetails/>}/>
          
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
