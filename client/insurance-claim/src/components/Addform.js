import { useState, useEffect } from 'react';
import Pol from './Pol';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Addform = ({ onAdd, Policies, error, navhome, status}) => {
    const emp_id = sessionStorage.getItem("emp_id");

    const [InsuranceID, setInsuranceID] = useState('');
    const [EmployeeID,  setEmployeeID] = useState(emp_id);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [ExpenseDate, setExpenseDate] = useState(new Date());
    const [Amount, setAmount] = useState('');
    const [Purpose, setPurpose] = useState('');
    const [FollowUp, setFollowUp] = useState(false);
    const [PreviousClaimID, setPreviousClaimID] = useState('');
    const [diserror, setDiserror] = useState(error);
    const pattern = new RegExp(/^\d*(\.\d{0,2})?$/);

    const onSubmit = (e) => {
        e.preventDefault(); //does not submit to a page

        if(!InsuranceID){
            setDiserror("Please select Claim Type");
        }
        else if(!EmployeeID){
            setDiserror("Please exit this page and login again");
        }
        else if(!FirstName){
            setDiserror("Please enter First Name");
        }
        else if(!LastName){
            setDiserror("Please enter Last Name");
        }
        else if(!ExpenseDate){
            setDiserror("Please select Expense Date");
        }
        else if(!Amount){
            setDiserror("Please enter Amount");
        }
        else if (!pattern.test(Amount)){
            setDiserror("Amount format incorrect");
        }
        else if(!Purpose){
            setDiserror("Please enter Purpose");
        }
        else if(FollowUp === true && !PreviousClaimID){
            setDiserror("Please enter Previous Claim ID when Follow Up is selected");
        }
        else if(FollowUp === false && PreviousClaimID){
            setDiserror("Please tick Follow Up when Previous Claim ID is entered");
        }
        else{
            setDiserror("");
            onAdd({ InsuranceID, EmployeeID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID});
        }
        
        window.scrollTo(0, 0);

        //clear form
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
            {(status !== "") ? (<div style={{color: 'green'}}>{status}</div>) : ""}
            {(diserror !== "") ? (<div className="error">{diserror}</div>) : ""}

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

            <input type='submit' value='Add Claim ' className='btn btn-block' />

            <button onClick={navhome} className='btn btn-block' style={{backgroundColor: 'red' }}>Back</button>
        </form>
    )
}

export default Addform;
