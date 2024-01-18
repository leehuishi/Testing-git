import Loginpage from './Loginpage';
import Home from './Home';
import Header from './Header';
import Addclaim from './Addclaim';
import Editclaim from './Editclaim';
import Cancelclaim from './Cancelclaim';
import Deleteclaim from './Deleteclaim';
import { Route, Routes } from "react-router-dom";

const Routingdef = () => {
  return (
    <Routes>
    
      <Route 
        path='/'
        element = {
          <div className="max-w-5xl m-8 overflow-auto min-h-72 border-sky-200 p-8 rounded-md">
            <Loginpage />
          </div>
        }
      />
    
      <Route 
        path="/Home" 
        element={
          <div className="container2"> 
            <Header />
            <Home />
          </div>
        } 
      />


      <Route 
        path="/Addclaim" 
        element={
          <>
            <div className="container2">
              <Header /> 
              <Addclaim />
            </div>
          </>
        } 
      />

      <Route 
        path='/Editclaim/:id' 
        element={
          <>
            <div className="container2">
              <Header /> 
              <Editclaim />
            </div>
          </>
        } 
      />

      <Route 
        path='/Cancelclaim/:id' 
        element={
          <>
            <div className="container2">
              <Header /> 
              <Cancelclaim />
            </div>
          </>
        } 
      />


      <Route 
        path='/Deleteclaim/:id' 
        element={
          <>
            <div className="container2">
              <Header /> 
              <Deleteclaim />
            </div>
          </>
        } 
      />
    
    </Routes>

  

  );
}

export default Routingdef;
