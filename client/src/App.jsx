import React from "react";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/loginpage/Login";
import Contacts from "./components/contacts/Contacts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes/privateRoute";
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer theme="dark"/>
      </BrowserRouter>
    </div>
  );
};

export default App;
