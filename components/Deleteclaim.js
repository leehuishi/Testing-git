import Button from './Button';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Deleteclaim = () => {
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
    async function deleteClaimApi() {
        const array_claim_id = {'claim_id': params.id}

        return fetch('http://127.0.0.1:5000/deleteclaim', {
            method: 'DELETE',
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

    const deleteClaim = async () => {
        const deletedclaim = await deleteClaimApi();
        const checkdelete = 'error' in deletedclaim;
        if(checkdelete){
            setError(deletedclaim['error']);
        }
        else{
            const deletedresFromServer = await deletedclaim.json();
            
            const checkdelete2 = 'error' in deletedresFromServer;
            if(checkdelete2){
              setError(deletedresFromServer['error']);
            }
            else{
                navigate(`/Home`);
            }
        }
    }

    //=========================================================
    // Run Cancel claim
    //=========================================================    
    const canceldeleteclaim = async () => {
        navigate(`/Home`);
    }

    //=============================================================================================

    return (
        <>
            {(error !== "") ? (<div className="error" style={{paddingBottom: '20px' }}>{error}</div>) : ""}

            <header className='header' style={{justifyContent: 'center'}}>
                <h1>Confirm Delete?</h1>
            </header>

            <p className='header' style={{color: 'red', justifyContent: 'center'}}>{"\n"}Please note that deleted record cannot be retrieved back.</p>

            <div className='header' style={{justifyContent: 'center'}}>
                <Button color='green' text='Yes' onClick2={deleteClaim}/>
                <Button color='red' text='No' onClick2={canceldeleteclaim} />
            </div>
           
        </>
    )
}

export default Deleteclaim;
