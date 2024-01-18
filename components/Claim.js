import { useState, useEffect} from 'react'
import { FaTimes, FaEdit } from 'react-icons/fa'

const Claim = ({ claim, onCancel, onEdit, onDelete }) => {
  const [Statuscolor, setStatuscolor] = useState('')
  const [Statusaction, setStatusaction] = useState('')
  
  useEffect(() => {
    const getStatus = async () => {
      if(claim.Status == "Pending"){
        setStatuscolor("#F1C232");
        setStatusaction('can');

      }
      else if(claim.Status === "Approved"){
        setStatuscolor("Green");
        setStatusaction("cannnot");
      }
      else if(claim.Status === "Rejected"){
        setStatuscolor("#c00303");
        setStatusaction("cannnot");
      }
      else if(claim.Status === "Cancelled"){
        setStatuscolor("#c00303");
        setStatusaction("cannnot");
      }
      else{
        setStatuscolor("Black");
        setStatusaction("can");
      }
    }

    getStatus();
  }, []);

  return (
    <tr>
        <td style={{paddingRight: '5px'}}>{claim.ClaimID}</td>
        <td style={{paddingRight: '5px'}}>{claim.ProjectID}</td>
        <td style={{paddingRight: '5px'}}>{claim.ProjectName}</td>
        <td style={{paddingRight: '5px'}}>{claim.ExpenseDate}</td>
        <td style={{paddingRight: '5px'}}>{claim.CurrencyID} {claim.Amount}</td>
        <td style={{paddingRight: '5px'}}>{claim.Purpose}</td>
        <td style={{color: Statuscolor, paddingRight: '5px'}}>{claim.Status}</td>
        {/* <td>{claim.Status}</td> */}
        <td>{Statusaction === "can" ? (
            <>
              <FaTimes style={{color: 'red', cursor:'pointer'}} onClick={() => onCancel(claim.ClaimID)} />
              &nbsp;&nbsp;
              <FaEdit style={{cursor:'pointer'}} onClick={() => onEdit(claim.ClaimID)}/>
            </>
          ):(
            <>
              <FaTimes style={{color: 'red', cursor:'pointer'}} onClick={() => onDelete(claim.ClaimID)} />
            </>
          )}</td>
    </tr>
  )
}

export default Claim;
