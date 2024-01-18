import Button from './Button';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Cancelclaim = () => {
    const navigate = useNavigate();
    const params = useParams();
    const[error, setError] = useState("");

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
    async function cancelClaimApi() {
        const array_claim_id = {'claim_id': params.id}

        return fetch('http://127.0.0.1:5000/cancelclaim', {
            method: 'PUT',
            headers: {
                    'Content-type': 'application/json'
                    },
            body: JSON.stringify(array_claim_id)
        })
        .then(res => {
            if (!res.ok) {
                return { "error" : "Network response was not ok" }
            } 
            else {
                return res
            }
        })
        .catch(error => {
            return { "error" : "There is a technical issue. Please kindly try again later." } //There was a problem with the fetch operation
        });


    }
    
    const cancelClaim = async () => {
        const cancelledclaim = await cancelClaimApi();
        const checkcancelled = 'error' in cancelledclaim;
        if(checkcancelled){
            setError(cancelledclaim['error']);
        }
        else{
            const cancelledresFromServer = await cancelledclaim.json();
            
            const checkcancelled2 = 'error' in cancelledresFromServer;
            if(checkcancelled2){
              setError(cancelledresFromServer['error']);
            }
            else{
                navigate(`/Home`);
            }
        }
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
            {(error !== "") ? (<div className="error" style={{paddingBottom: '20px' }}>{error}</div>) : ""}
            
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
