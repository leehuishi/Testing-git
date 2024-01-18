import Editform from './Editform';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
const Editclaim = () => {
    const[error, setError] = useState("");
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
    
    const[claim, setClaim] = useState([]);
    const[claimid, setClaimID] = useState([]);
    const params = useParams();
    const [proj, setProj] = useState([]);
    const [ccy, setCcy] = useState([]);

    //get claim ---------------------------------------------------------------
    async function fetchClaim(claim_id) {
        return fetch(`http://127.0.0.1:5000/claim?claim_id=${claim_id}`)
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

    //get project ---------------------------------------------------------------
    async function fetchProjects(emp_id) {
        return fetch(`http://127.0.0.1:5000/projects?emp_id=${emp_id}`)
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

    //get currencies ---------------------------------------------------------------
    async function fetchCcy() {
        return fetch('http://127.0.0.1:5000/currencies')
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
            if (params.id !== ""){
                const fetchedclaim = await fetchClaim(params.id);

                const checkclaim = 'error' in fetchedclaim;
                if(checkclaim){
                    setError(fetchedclaim['error']);
                }
                else{
                    const claimFromServer = await fetchedclaim.json();
                    const checkclaim2 = 'error' in claimFromServer;
                    if(checkclaim2){
                        setError(claimFromServer['error']);
                    }
                    else{
                        setClaim(claimFromServer);
                        setClaimID(params.id);
                    }
                }
            }
            //--------------------------------------------------
            const fetchedProj = await fetchProjects();

            const checkproj = 'error' in fetchedProj;
            if(checkproj){
                setError(fetchedProj['error']);
            }
            else{
                const projFromServer = await fetchedProj.json();
                const checkproj2 = 'error' in projFromServer;
                if(checkproj2){
                    setError(projFromServer['error']);
                }
                else{
                    setProj(projFromServer);
                }
            }
            //--------------------------------------------------
            const fetchedCcy = await fetchCcy();

            const checkccy = 'error' in fetchedCcy;
            if(checkccy){
                setError(fetchedCcy['error']);
            }
            else{
                const ccyFromServer = await fetchedCcy.json();
                const checkccy2 = 'error' in ccyFromServer;
                if(checkccy2){
                    setError(ccyFromServer['error']);
                }
                else{
                    setCcy(ccyFromServer);
                }
            }
        }
        getDetails()
    }, []);

    
    //********************************************************************************************
    //Existing Claim (After user input)
    //********************************************************************************************
    //=================================================================
    //API edit claim
    //=================================================================
    async function editClaim(editedclaim) {
        return fetch('http://127.0.0.1:5000/editclaim', {
            method: 'PUT',
            headers: {
                    'Content-type': 'application/json'
                    },
            body: JSON.stringify(editedclaim)
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

    //=========================================================
    // Edit claim
    //=========================================================
    const [status, setStatus] = useState("");

    const editClaim2 = async (claim) => {     
        const editclaim = {
            "ProjectID":parseInt(claim.ProjectID),
            "EmployeeID":parseInt(emp_id),
            "CurrencyID": claim.CurrencyID,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "ChargetoDefault": claim.ChargetoDefault,
            "AlternativeDept": claim.AlternativeDept,
            "ClaimID":claim.ClaimID
        }


        const editedclaim = await editClaim(editclaim);
        const checkedit = 'error' in editedclaim;
        if(checkedit){
            setError(editedclaim['error']);
        }
        else{
            const editedresFromServer = await editedclaim.json();
            
            const checkedit2 = 'error' in editedresFromServer;
            if(checkedit2){
              setError(editedresFromServer['error']);
            }
            else{
                setStatus(editedresFromServer['status']);
            }
        }
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
            {
                claim.length > 0 ? 
                <Editform onEdit={editClaim2} projects={proj} ccies={ccy} error={error} navhome={NavHome} claim={claim} claimid={claimid} status={status} />
                : 
                <>
                    {(status !== "") ? (<div style={{color: 'green'}}>{status}</div>) : ""}
                    {(error !== "") ? (<div className="error" style={{paddingBottom: '20px' }}>{error}</div>) : ""}
                    <button onClick={NavHome} className='btn btn-block' style={{backgroundColor: 'white' }}>Back to Home</button>
                </>
            }
        </div>
    )
}

export default Editclaim;
