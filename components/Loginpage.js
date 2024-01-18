import Header from './Header';
import Loginform from './Loginform';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const Loginpage = () => {
    sessionStorage.clear();
    const[error, setError] = useState("");
    const navigate = useNavigate();

    //=================================================================
    //Function: Fetch user detail 
    //=================================================================
    const loginUser = async (emp_id, password) => {
        return fetch(`http://127.0.0.1:5000/login_check?emp_id=${emp_id}&password=${password}`)
        .then(res => {
        if (!res.ok) {
            return { "error" : "Network response was not ok" }
        } 
        else {
            return res
        }
        })
        .catch(error => {
        return { "error" : "There was a problem with the fetch operation" }
        });
    }

    //=========================================================
    //Function: Check credential 
    //=========================================================
    const checkcrediential = async (logincred) => {
        
        //---------------------------------------------------
        //check user input 
        //---------------------------------------------------
        const emp_id = logincred.emp_id
        const password = logincred.password

        if(emp_id === ""){
            const error_msg = "Please enter your Employee ID"
            setError(error_msg);
        }
        else if(password === ""){
            setError("Please enter your Password");
        }
        else{

            //user input no issue 
            //-----------------------------------------------
            //retrieve credential
            //-----------------------------------------------
            const password_input = logincred.password;
            const hashPassword = bcrypt.hashSync(password_input, 10);

            const res = await loginUser(emp_id, hashPassword);

            //-----------------------------------------------

            const checkerror = 'error' in res;

            if(checkerror){
                //fetch error
                const error_msg = res['error'];
                setError(error_msg);
            }
            else{
                //fetch successful - check result
                const data = await res.json();
                const checkerror2 = 'error' in data;

                if(checkerror2){
                    //return error (e.g. invalid credential)
                    const error_msg = data['error'];
                    setError(error_msg);
                }
                else{
                    const FirstName = data[0]['FirstName'];
                    sessionStorage.setItem("emp_id", logincred.emp_id);
                    sessionStorage.setItem("name", FirstName);

                    setError("");
                    navigate('/Home');
                }
            }
        }
    };


    return (
        <>
            <Header title='Login' titlealign='center' />
            <Loginform checklogin={checkcrediential} error={error}/>
        </>
    );
};

export default Loginpage;
