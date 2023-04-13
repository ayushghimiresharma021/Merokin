import React from 'react';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';

import Login from './Pages/Login';
import Navbar from './Scenes/Navbar';
import Index from './Scenes/IndexPage';
import IndexPage from './Scenes/IndexPage';
import Register from './Pages/Register';
import axios from 'axios';
import AccountPage from './Pages/AccountPage';
import AddPlace from './Scenes/AddPlace';
import UpdatePlace from './Pages/updatePlace';
import SpecficPlacePage from './Pages/SpecificPage/SpecficPlacePage';
import PaymentForm from './Pages/payment/paymentPage';

axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true


const App = function() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<AccountPage /> } />
            <Route path='/place' element={<SpecficPlacePage />} />
            <Route path='/account/:subpage' element={<AccountPage />} />
            <Route path='/account/:subpage/:action' element=<AccountPage /> />
            <Route path='/account/places/NewPlaces' element={<AddPlace />} />
            <Route path='/account/places/updatePlace/:id' element=<UpdatePlace /> />
            <Route path='/account/booking/:id' />
          </Route>
          <Route path='/payment' element={ <PaymentForm /> } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
