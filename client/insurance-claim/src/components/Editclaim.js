import Editform from './Editform';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Editclaim = () => {
    const[error, setError] = useState("");
    const[FollowUp, setFollowUp] = useState(0);
    const navigate = useNavigate();

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
    //Existing Claim (Before user input)
    //********************************************************************************************
    
    //get policies ---------------------------------------------------------------
    const [Policies, setPolicies] = useState([]);
    const[claim2, setClaim2] = useState([]);
    const[claimid2, setClaimID2] = useState([]);
    const params = useParams();

    async function fetchClaim2(claim_id) {
        return fetch(`http://127.0.0.1:5000/claim?claim_id=${claim_id}`)
        .then(res => {
        if (!res.ok) {
            setError("Network response was not ok");
        } 
        else {
            return res
        }
        })
        .catch(error => {
            setError("There was a problem with the fetch operation");
        });
    }


    async function fetchPolicies(emp_id) {
        return fetch(`http://127.0.0.1:5000/policies?emp_id=${emp_id}`)
        .then(res => {
          if (!res.ok) {
            setError("Network response was not ok");
          } 
          else {
            return res
          }
        })
        .catch(error => {
          setError("There was a problem with the fetch operation");
        });
    }
    
    
    //run get projects & currencies -------------------------------------------------
    useEffect(() => {
        const getDetails = async () => {
            const res = await fetchPolicies(emp_id);
            const data = await res.json();
            

            const res2 = await fetchClaim2(params.id);
            const data2 = await res2.json();
            setPolicies(data);
            setClaim2(data2);
            setClaimID2(params.id);
        }
        getDetails();
    }, []);
   

    //********************************************************************************************
    //Existing Claim (After user input)
    //********************************************************************************************
    //=================================================================
    //API edit claim
    //=================================================================
    async function runeditClaim(editedclaim) {
        return fetch('http://127.0.0.1:5000/editclaim', {
            method: 'PUT',
            headers: {
                    'Content-type': 'application/json'
                    },
            body: JSON.stringify(editedclaim)
        })
        .then(res => {
            if (!res.ok) {
                setError("Network response was not ok");
            } 
            else {
                return res
            }
        })
        .catch(error => {
            setError("There was a problem with the fetch operation");
        });
    }

    //=========================================================
    // Edit claim
    //=========================================================
    const editClaim = async (claim) => {
        // editClaim({ ClaimID, InsuranceID, EmployeeID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID});
        if(claim.FollowUp === true){
            setFollowUp(1);
        }
        else{
            setFollowUp(0);
        }

        const newclaim1 = {
            "ClaimID":parseInt(claim.ClaimID),
            "InsuranceID":parseInt(claim.InsuranceID),
            "FirstName": claim.FirstName,
            "LastName": claim.LastName,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "FollowUp": FollowUp,
            "PreviousClaimID": parseInt(claim.PreviousClaimID)
        };

        const newclaim2 = {
            "ClaimID":parseInt(claim.ClaimID),
            "InsuranceID":parseInt(claim.InsuranceID),
            "FirstName": claim.FirstName,
            "LastName": claim.LastName,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "FollowUp": FollowUp
        };

        if (claim.PreviousClaimID === ''){
            const res = await runeditClaim(newclaim2);
        }
        else{
            const res2 = await runeditClaim(newclaim1);
        }
        
        navigate('/Home');
        
    }

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
            {claim2.length > 0 ? <Editform editClaim={editClaim} Policies={Policies} error={error} navhome={NavHome} claim2={claim2} claimid2={claimid2} />
            : <></>}
        </div>
        
    )
}

export default Editclaim;
