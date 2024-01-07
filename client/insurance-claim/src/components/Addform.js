import { useState, useEffect } from 'react';
import Proj from './Proj';
import Ccy from './Ccy';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Addform = ({ onAdd, projects, ccies, error, navhome}) => {
    const emp_id = sessionStorage.getItem("emp_id");

    const [ProjectID, setProjectID] = useState('');
    const [EmployeeID,  setEmployeeID] = useState(emp_id);
    const [CurrencyID, setCurrencyID] = useState('');
    const [ExpenseDate, setExpenseDate] = useState(new Date());
    const [Amount, setAmount] = useState('');
    const [Purpose, setPurpose] = useState('');
    const [ChargetoDefault, setChargetoDefault] = useState(false);
    const [AlternativeDept, setAlternativeDept] = useState('');

    const onSubmit = (e) => {
        e.preventDefault(); //does not submit to a page

        onAdd({ ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept});

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

            <input type='submit' value='Add Claim ' className='btn btn-block' />

            <button onClick={navhome} className='btn btn-block' style={{backgroundColor: 'red' }}>Cancel</button>
        </form>
    )
}

export default Addform;
