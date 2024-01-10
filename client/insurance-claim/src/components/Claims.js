import { useState, useEffect } from 'react'
import Claims2 from './Claims2'
import { useNavigate } from "react-router-dom"

const Claims = ({message}) => {
    const emp_id = sessionStorage.getItem("emp_id");
    const [claims, setClaims] = useState([]);
    const[error, setError] = useState("");
    const navigate = useNavigate();

    //=========================================================
    // Get Claims
    //=========================================================
    // Fetch Claims
    const fetchClaims = async () => {
        return fetch(`http://127.0.0.1:5000/claims?emp_id=${emp_id}`)
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
    
    useEffect(() => {
        const getClaims = async () => {
            const fetchedclaim = await fetchClaims();

            const checkerror = 'error' in fetchedclaim;
            if(checkerror){
                const error_msg = fetchedclaim['error'];
                setError(error_msg);
            }
            else{
                const claimsFromServer = await fetchedclaim.json();
                
                const checkerror2 = 'error' in claimsFromServer;
                if(checkerror2){
                  const error_msg = claimsFromServer['error'];
                  setError(error_msg);
                }
                else{
                    setClaims(claimsFromServer);
                }
            }
        }
        getClaims();
    }, []);


    // Cancel Task
    const cancelClaim = async (claim_id) => {
        navigate(`/Cancelclaim/${claim_id}`);
    }


    // Edit claim
    const editClaim = async (claim_id) => {
        navigate(`/Editclaim/${claim_id}`);
    }

    return (
        <>  
            {(error !== "") ? (<div className="error" style={{paddingBottom: 20}}>{error}</div>) : ""}    
            {claims.length > 0 && error === "" ? <Claims2 claims={claims} onCancel={cancelClaim} onEdit={editClaim}/>: ('No Claims To Show')}
        </>
    )
}

export default Claims;
