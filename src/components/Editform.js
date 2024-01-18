import { useState, useEffect } from 'react';
import Proj from './Proj';
import Ccy from './Ccy';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Editform = ({ onEdit, projects, ccies, error, navhome, claim, claimid, status }) => {
    const emp_id = sessionStorage.getItem("emp_id");
    const [diserror, setDiserror] = useState(error);
    
    const claim3 = claim[0];

    const [ClaimID, setClaimID] = useState(claimid);
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
    const pattern = new RegExp(/^\d*(\.\d{0,2})?$/);

    const onSubmit = (e) => {
        e.preventDefault(); //does not submit to a page

        if(!ProjectID){
            setDiserror("Please select Project");
        }
        else if(!EmployeeID){
            setDiserror("Please exit this page and login again");
        }
        else if(!CurrencyID){
            setDiserror("Please select Currency");
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
        else if(ChargetoDefault === true && !AlternativeDept){
            setDiserror("Please enter Alternative Dept when Charge to Default is selected");
        }
        else if(ChargetoDefault === false && AlternativeDept){
            setDiserror("Please tick Charge to Default when Alternative Dept is entered");
        }
        else{
            if(ChargetoDefault === true){
                setChargetoDefault(1)
            }
            else{
                setChargetoDefault(0)
            }
            setDiserror("");
            onEdit({ ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept, ClaimID});
        }

        window.scrollTo(0, 0);

        //reset form
        setProjectID(ProjectID);
        setCurrencyID(CurrencyID);
        setExpenseDate(ExpenseDate);

        setAmount(Amount);
        setPurpose(Purpose);
        setChargetoDefault(ChargetoDefault);
        setAlternativeDept(AlternativeDept);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            {(status !== "") ? (<div style={{color: 'green'}}>{status}</div>) : ""}
            {(diserror !== "") ? (<div className="error">{diserror}</div>) : ""}

            <div className='form-control2'>
                <label>Claim ID</label>
                <input type='text' value={ClaimID} readonly/>
            </div>

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
