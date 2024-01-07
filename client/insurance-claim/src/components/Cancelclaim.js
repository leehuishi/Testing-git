import Button from './Button';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Cancelclaim = () => {
    const navigate = useNavigate();
    const params = useParams();

    //=========================================================
    // Check login (set emp_id and claim_id)
    //=========================================================
    useEffect(() => {
        const checklogin = () => {
            if (!sessionStorage.emp_id){
              navigate('/');
            }
            else if(params.id === ""){
                navigate('/Home');
            }
        };
        checklogin();
    }, []);

    //=========================================================
    // Cancel claim (to update status to cancelled)
    //=========================================================    
    const cancelClaim = async () => {
        const json_claim_id = {'claim_id': params.id}

        const res = await fetch('http://127.0.0.1:5000/cancelclaim', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(json_claim_id)
        })

        const data = await res.json()
        navigate(`/Home`);
    }

    //=========================================================
    // Run Cancel claim
    //=========================================================    
    const cancelcancelclaim = async () => {
        navigate(`/Home`);
    }

    //=============================================================================================

    return (
        <>
            <header className='header' style={{justifyContent: 'center'}}>
                <h1>Confirm Cancel</h1>
            </header>

            <div className='header' style={{justifyContent: 'center'}}>
                <Button color='green' text='Yes' onClick2={cancelClaim}/>
                <Button color='red' text='No' onClick2={cancelcancelclaim} />
            </div>
           
        </>
    )
}

export default Cancelclaim;
