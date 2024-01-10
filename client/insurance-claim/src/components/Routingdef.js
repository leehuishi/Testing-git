
import Loginpage from './Loginpage';
import Home from './Home';
import Header from './Header';
import Addclaim from './Addclaim';
import Editclaim from './Editclaim';
import Cancelclaim from './Cancelclaim';
import { Route, Routes } from "react-router-dom";

const Routingdef = () => {
  return (
    <Routes>
    
      <Route 
        path='/'
        element = {
          <div className="container">
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
    
     </Routes>

  

  );
}

export default Routingdef;
