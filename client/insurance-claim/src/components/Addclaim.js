import Addform from './Addform';
import Editform from './Editform';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Addclaim = () => {
    const[error, setError] = useState("");
    const[ChargetoDefault, setChargetoDefault] = useState(0);
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
    //New Claim (Before user input)
    //********************************************************************************************
    
    //get projects ---------------------------------------------------------------
    const [proj, setProj] = useState([]);

    async function fetchProjects(emp_id) {
        return fetch(`http://127.0.0.1:5000/projects?emp_id=${emp_id}`)
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

    //get currencies ---------------------------------------------------------------
    const [ccy, setCcy] = useState([]);

    async function fetchCcy() {
        return fetch('http://127.0.0.1:5000/currencies')
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
            const res = await fetchProjects();
            const data = await res.json();
            setProj(data);

            const res2 = await fetchCcy();
            const data2 = await res2.json();
            setCcy(data2)
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


    // onAdd({ ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept})
    const addClaim1 = async (claim) => {
        if(claim.Purpose === ""){
            setError("Please enter Purpose");
        }

        if(claim.Amount === ""){
            setError("Please enter Amount");
        }
        else if(claim.Amount.match("^\d*(\.\d{0,2})?$") !== null){
            setError("Amount format incorrect");
        }

        if(claim.ExpenseDate === ""){
            setError("Please select Expense Datetime");
        }

        if(claim.CurrencyID === ""){
            setError("Please select Currency ID");
        }

        if(claim.ProjectID === ""){
            setError("Please select Project ID");
        }

        if(claim.ChargetoDefault === true){
            setChargetoDefault(1);
        }
        else{
            setChargetoDefault(0);
        }


        const newclaim = {
            "ProjectID":parseInt(claim.ProjectID),
            "EmployeeID":parseInt(emp_id),
            "CurrencyID": claim.CurrencyID,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "ChargetoDefault": ChargetoDefault,
            "AlternativeDept": claim.AlternativeDept
        };

        if(error === ""){
            setError("");
            const res = await newClaim(newclaim);
            const data = await res.json();
            navigate('/Home');
        }
    }
    //********************************************************************************************
    
   
    //********************************************************************************************
    //Existing Claim (Before user input)
    //********************************************************************************************
    //get claim ---------------------------------------------------------------
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

    //if claim id provided use to retrieve claim details
    useEffect(() => {
        const getClaim2 = async () => {
            if (params.id !== ""){
                const res = await fetchClaim2(params.id);
                const data = await res.json();
                setClaim2(data);
                setClaimID2(params.id);
            }
        }
        getClaim2();
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
    const editClaim2 = async (claim) => {
        if(claim.Purpose === ""){
            setError("Please enter Purpose");
        }

        if(claim.Amount === ""){
            setError("Please enter Amount");
        }
        else if(claim.Amount.match("^\d*(\.\d{0,2})?$") !== null){
            setError("Amount format incorrect");
        }

        if(claim.ExpenseDate === ""){
            setError("Please select Expense Datetime");
        }

        if(claim.CurrencyID === ""){
            setError("Please select Currency ID");
        }

        if(claim.ProjectID === ""){
            setError("Please select Project ID");
        }

        if(claim.ChargetoDefault === true){
            setChargetoDefault(1)
        }
        else{
            setChargetoDefault(0)
        }


        const editclaim = {
            "ProjectID":parseInt(claim.ProjectID),
            "EmployeeID":parseInt(emp_id),
            "CurrencyID": claim.CurrencyID,
            "ExpenseDate": claim.ExpenseDate.toString(),
            "Amount": claim.Amount,
            "Purpose": claim.Purpose,
            "ChargetoDefault": ChargetoDefault,
            "AlternativeDept": claim.AlternativeDept,
            "ClaimID":claim.ClaimID
        }

        if(error === ""){
            setError("");
            const res = await editClaim(editclaim);
            const data = await res.json();
            navigate('/Home');
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
            {claim2.length > 0 ? <Editform onEdit={editClaim2} projects={proj} ccies={ccy} error={error} navhome={NavHome} claim2={claim2} claimid2={claimid2}/>
            : <Addform onAdd={addClaim1} projects={proj} ccies={ccy} error={error} navhome={NavHome}/>}
        </div>
    )
}

export default Addclaim;
