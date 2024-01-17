import Addform from './Addform';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Addclaim = () => {
    const[error, setError] = useState("");
    const navigate = useNavigate();
    const[FollowUp, setFollowUp] = useState(0);

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

    const emp_id = sessionStorage.getItem("emp_id");
    //=========================================================

    //********************************************************************************************
    //New Claim (Before user input)
    //********************************************************************************************
    
    //get policies ---------------------------------------------------------------
    const [Policies, setPolicies] = useState([]);

    async function fetchPolicies(emp_id) {
        return fetch(`http://127.0.0.1:5000/policies?emp_id=${emp_id}`)
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
    
    
    //run get projects & currencies -------------------------------------------------
    useEffect(() => {
        const getDetails = async () => {
            const fetchedpolicies = await fetchPolicies(emp_id);

            const checkerror = 'error' in fetchedpolicies;
            if(checkerror){
                setError(fetchedpolicies['error']);
            }
            else{
                const policiesFromServer = await fetchedpolicies.json();
                const checkerror2 = 'error' in policiesFromServer;
                if(checkerror2){
                    setError(policiesFromServer['error']);
                }
                else{
                    setPolicies(policiesFromServer);
                }
            }
        }
        getDetails()
    }, []);



    //********************************************************************************************
    //New Claim (After user input)
    //********************************************************************************************
    //=================================================================
    //API add claim
    //=================================================================
    async function newClaim(newclaim) {
        return fetch('http://127.0.0.1:5000/addclaim', {
            method: 'POST',
            headers: {
                    'Content-type': 'application/json'
                    },
            body: JSON.stringify(newclaim)
        })
        .then(res => {
            if (!res.ok) {
                return {"error": "Network response was not ok"};
            } 
            else {
                return res
            }
        })
        .catch(error => {
            return {"error": "There was a problem with the fetch operation"};
        });
    }


    const [status, setStatus] = useState("");
    
    const addClaim1 = async (claim) => {
        // onAdd({ InsuranceID, EmployeeID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID});
        if(claim.FollowUp === true){
            setFollowUp(1);
        }
        else{
            setFollowUp(0);
        }

        const newclaim1 = {
            "InsuranceID":parseInt(claim.InsuranceID),
            "EmployeeID":parseInt(emp_id),
            "FirstName": claim.FirstName,
            "LastName": claim.LastName,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "FollowUp": FollowUp,
            "PreviousClaimID": parseInt(claim.PreviousClaimID)
        };

        const newclaim2 = {
            "InsuranceID":parseInt(claim.InsuranceID),
            "EmployeeID":parseInt(emp_id),
            "FirstName": claim.FirstName,
            "LastName": claim.LastName,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "FollowUp": FollowUp
        };

        

        if (claim.PreviousClaimID === ''){
            const addedclaim = await newClaim(newclaim2);

            const checkerror = 'error' in addedclaim;
            if(checkerror){
                setError(addedclaim['error']);
            }
            else{
                const addedresFromServer = await addedclaim.json();
                
                const checkerror2 = 'error' in addedresFromServer;
                if(checkerror2){
                  setError(addedresFromServer['error']);
                }
                else{
                    setStatus(addedresFromServer['status']);
                }
            }

            
            
        }
        else{
            const addedclaim2 = await newClaim(newclaim1);
            const checkerror3 = 'error' in addedclaim2;
            if(checkerror3){
                setError(addedclaim2['error']);
            }
            else{
                const addedresFromServer2 = await addedclaim2.json();
                
                const checkerror4 = 'error' in addedresFromServer2;
                if(checkerror4){
                  setError(addedresFromServer2['error']);
                }
                else{
                    setStatus(addedresFromServer2['status']);
                }
            }
        }
        
        // navigate('/Home');
    }
    //********************************************************************************************


    
    //=========================================================
    // Navigate to Home
    //=========================================================
    const NavHome = () => {
        navigate('/Home');
    }
    //=========================================================

    //=========================================================

    return (
        <div>
            <Addform onAdd={addClaim1} Policies={Policies} error={error} navhome={NavHome} status={status}/>
        </div>
    )
}

export default Addclaim;
