import { useState, useEffect } from 'react';
import Proj from './Proj';
import Ccy from './Ccy';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Editform = ({ onEdit, projects, ccies, error, navhome, claim2, claimid2 }) => {
    const emp_id = sessionStorage.getItem("emp_id");
    const claim3 = claim2[0];
    

    const [ClaimID, setClaimID] = useState(claimid2);
    const [ProjectID, setProjectID] = useState(claim3.ProjectID);
    const [EmployeeID,  setEmployeeID] = useState(emp_id);
    const [CurrencyID, setCurrencyID] = useState(claim3.CurrencyID);
    const raw_edate = claim3.ExpenseDate;
    const edate = new Date(raw_edate);
    const [ExpenseDate, setExpenseDate] = useState(edate);
    const [Amount, setAmount] = useState(claim3.Amount);
    const [Purpose, setPurpose] = useState(claim3.Purpose);
    const [ChargetoDefault, setChargetoDefault] = useState(claim3.ChargeToDefaultDept);
    const [AlternativeDept, setAlternativeDept] = useState(claim3.AlternativeDeptCode);

    const onSubmit = (e) => {
        e.preventDefault(); //does not submit to a page

        onEdit({ ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept, ClaimID});

        // //clear form
        setProjectID('');
        setCurrencyID('');
        setExpenseDate(new Date());
        setAmount('');
        setPurpose('');
        setChargetoDefault(false);
        setAlternativeDept('');
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            {(error !== "") ? (<div className="error">{error}</div>) : ""}

            <div className='form-control2'>
                <label>Project ID:</label>
                <select value={ProjectID} onChange={(e) => setProjectID(e.target.value)}>
                    <option value=''>Select Project</option>
                    {projects.map((project) => (
                        <Proj key={project.ProjectID} project={project} />
                    ))}

                </select>
            </div>

            <div className='form-control2'>
                <label>Employee ID</label>
                <input type='text' value={emp_id} readonly/>
            </div>

            <div className='form-control2'>
                <label>Currency:</label>
                <select value={CurrencyID} onChange={(e) => setCurrencyID(e.target.value)}>
                    <option value=''>Select Currency</option>
                    {ccies.map((ccy) => (
                        <Ccy key={ccy.CurrencyID} ccy={ccy} />
                    ))}
                </select>
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
                <label>Charge to Default Dept</label>
                <input type='checkbox' 
                checked={ChargetoDefault}
                value={ChargetoDefault} 
                onChange={(e) => setChargetoDefault(e.currentTarget.checked)}/>
            </div>

            {ChargetoDefault === true ? (
                <div className='form-control2'>
                    <label>Alternative Dept Code</label>
                    <input value={AlternativeDept} onChange={(e) => setAlternativeDept(e.target.value)}/>
                </div>
            ): ''}

            <input type='submit' value='Edit Claim ' className='btn btn-block' />

            <button onClick={navhome} className='btn btn-block' style={{backgroundColor: 'red' }}>Cancel</button>
        </form>
    )
}

export default Editform;
