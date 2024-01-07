import Header from './Header';
import Loginform from './Loginform';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const Loginpage = () => {
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
                // console.log(res)
                // console.log(data)
                // console.log(checkerror2)

                if(checkerror2){
                    //return error (e.g. invalid credential)
                    const error_msg = data['error'];
                    setError(error_msg);
                }
                else{
                    //fetch successfully - valid user
                    // const password_input = logincred.password;
                    // const password = data[0]['Password'];
                    // const password_db = password.slice(2, -1);

                    // const hashPassword = bcrypt.hashSync(password_input, 10);
                    // console.log(hashPassword);
                    // console.log(typeof(hashPassword));
                    // console.log(password_db);
                    // console.log(typeof(password_db));

                    // bcrypt.compare(password_db, hashPassword, function(err, isMatch){
                    //     if(err){
                    //         throw err;
                    //     }else if(!isMatch){
                    //         console.log("Password doesn't match!");
                    //     }else{
                    //         console.log('Password matches!');
                    //     }
                    // })

                    // //check password 
                    // if(password_input === password){
                    //     const FirstName = data[0]['FirstName'];

                    //     sessionStorage.setItem("emp_id", logincred.emp_id);
                    //     sessionStorage.setItem("name", FirstName);

                    //     setError("");
                    //     navigate('/Home');
                    // }
                    // else{
                    //     //password incorrect
                    //     const error_msg = 'Invalid Credential'
                    //     setError(error_msg);
                    // }

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
