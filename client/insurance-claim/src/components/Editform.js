import { useState, useEffect } from 'react';
import Pol from './Pol';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Editform = ({ editClaim, Policies, error, navhome, claim2, claimid2 }) => {
    const emp_id = sessionStorage.getItem("emp_id");
    const claim = claim2[0]

    const [ClaimID, setClaimID] = useState(claimid2);
    const [InsuranceID, setInsuranceID] = useState(claim.InsuranceID);
    const [EmployeeID,  setEmployeeID] = useState(emp_id);
    const [FirstName, setFirstName] = useState(claim.FirstName);
    const [LastName, setLastName] = useState(claim.LastName);
    const raw_edate = claim.ExpenseDate;
    const edate = new Date(raw_edate);
    const [ExpenseDate, setExpenseDate] = useState(edate);
    const [Amount, setAmount] = useState(claim.Amount);
    const [Purpose, setPurpose] = useState(claim.Purpose);
    const [FollowUp, setFollowUp] = useState(claim.FollowUp);
    const [PreviousClaimID, setPreviousClaimID] = useState(claim.PreviousClaimID);

    const onSubmit = (e) => {
        e.preventDefault(); //does not submit to a page

        editClaim({ ClaimID, InsuranceID, EmployeeID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID});

        // //clear form
        setInsuranceID('');
        setFirstName('');
        setLastName('');
        setExpenseDate(new Date());
        setAmount('');
        setPurpose('');
        setFollowUp(false);
        setPreviousClaimID('');
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            {(error !== "") ? (<div className="error">{error}</div>) : ""}

            <div className='form-control2'>
                <label>Claim ID</label>
                <input type='text' value={ClaimID} readonly/>
            </div>

            <div className='form-control2'>
                <label>Insurance Type:</label>
                <select value={InsuranceID} onChange={(e) => setInsuranceID(e.target.value)}>
                    <option value=''>Select Type</option>
                    {Policies.map((policy) => (
                        <Pol key={policy.InsuranceID} policy={policy} />
                    ))}

                </select>
            </div>

            <div className='form-control2'>
                <label>Employee ID</label>
                <input type='text' value={emp_id} readonly/>
            </div>

            <div className='form-control2'>
                <label>First Name</label>
                <input value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div className='form-control2'>
                <label>Last Name</label>
                <input value={LastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div className='form-control2'>
                <label>Expense Datetime:</label>
                <DatePicker selected={ExpenseDate} onChange={(date) => setExpenseDate(date)} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput/>
            </div>
            
            <div className='form-control2'>
                <label>Amount</label>
                <input value={Amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>

            <div className='form-control2'>
                <label>Purpose</label>
                <input value={Purpose} onChange={(e) => setPurpose(e.target.value)}/>
            </div>
            
            <div className='form-control2 form-control2-check'>
                <label>Follow Up</label>
                <input type='checkbox' 
                checked={FollowUp}
                value={FollowUp} 
                onChange={(e) => setFollowUp(e.currentTarget.checked)}/>
            </div>

            {FollowUp === true ? (
                <div className='form-control2'>
                    <label>Previous Claim ID</label>
                    <input value={PreviousClaimID} onChange={(e) => setPreviousClaimID(e.target.value)}/>
                </div>
            ): ''}

            <input type='submit' value='Edit Claim ' className='btn btn-block' />

            <button onClick={navhome} className='btn btn-block' style={{backgroundColor: 'red' }}>Cancel</button>
        </form>
    )
}

export default Editform;
