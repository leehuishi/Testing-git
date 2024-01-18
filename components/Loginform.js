import { useState } from 'react'

const Login = ({checklogin, error}) => {
    const[emp_id, setEmp_id] = useState("")
    const[password, setPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault() //does not submit to a page
        
        checklogin({emp_id, password})

        //clear form
        setEmp_id("")
        setPassword("")
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            {(error !== "") ? (<div className="error">{error}</div>) : ""}
            
            <div className='form-control'>
                <label>Employee ID</label>
                <input type='text' placeholder='Enter Employee ID' value={emp_id} onChange={(e) => setEmp_id(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input type='submit' value='Enter' className='btn btn-block' />
        </form>
    )
}

export default Login
