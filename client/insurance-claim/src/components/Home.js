import Claims from './Claims';
import Button from './Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  //=========================================================
  // Check login (set emp_id)
  //=========================================================
  useEffect(() => {
    const checklogin = () => {
      if (!sessionStorage.emp_id){
        navigate('/');
      }
    };
    checklogin();
  }, []);


  const name = sessionStorage.getItem("name");
  //=========================================================

  
  //=========================================================
  // Add claims
  //=========================================================
  //Add claims
  const addclaim = () => {
    navigate('/Addclaim');
  };
  //=========================================================

  return (
    <>  
        <div className="header2">
            <h2>Welcome, <span>{name}</span></h2>
            <Button color='green' text='Add' onClick2={addclaim} />
        </div>
           
        <Claims />
    </>
  );
}

export default Home;
