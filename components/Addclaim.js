import Addform from './Addform';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Addclaim = () => {
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
    //New Claim (Before user input) projects, ccies,
    //********************************************************************************************
    
    //get projects ---------------------------------------------------------------
    const [projects, setProj] = useState([]);

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
    const [ccies, setCcy] = useState([]);

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
            const fetchedproj = await fetchProjects();

            const checkerror = 'error' in fetchedproj;
            if(checkerror){
                setError(fetchedproj['error']);
            }
            else{
                const projFromServer = await fetchedproj.json();
                const checkerror2 = 'error' in projFromServer;
                if(checkerror2){
                    setError(projFromServer['error']);
                }
                else{
                    setProj(projFromServer);
                }
            }
            //--------------------------------------------------
            const fetchedccy = await fetchCcy();

            const checkerror3 = 'error' in fetchedccy;
            if(checkerror3){
                setError(fetchedccy['error']);
            }
            else{
                const ccyFromServer = await fetchedccy.json();
                const checkerror4 = 'error' in ccyFromServer;
                if(checkerror4){
                    setError(ccyFromServer['error']);
                }
                else{
                    setCcy(ccyFromServer)
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

    const [status, setStatus] = useState("");

    // onAdd({ ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept})
    const addClaim1 = async (claim) => {
        const newclaim = {
            "ProjectID":parseInt(claim.ProjectID),
            "EmployeeID":parseInt(emp_id),
            "CurrencyID": claim.CurrencyID,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "ChargetoDefault": claim.ChargetoDefault,
            "AlternativeDept": claim.AlternativeDept
        };

        const addedclaim = await newClaim(newclaim);

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
            {(error !== "") ? (<div className="error">{error}</div>) : ""}
            <Addform onAdd={addClaim1} error={error} navhome={NavHome} status={status} projects={projects} ccies={ccies}/>
        </div>
    )
}

export default Addclaim;
