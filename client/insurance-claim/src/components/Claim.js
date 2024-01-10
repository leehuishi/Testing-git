import { useState, useEffect} from 'react'
import { FaTimes, FaEdit } from 'react-icons/fa'

const Claim = ({ claim, onCancel, onEdit }) => {
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
        <td>{claim.ClaimID}</td>
        <td>{claim.InsuranceType}</td>
        <td>{claim.ExpenseDate}</td>
        <td>{claim.Amount}</td>
        <td>{claim.Purpose}</td>
        <td>{claim.PreviousClaimID}</td>
        <td style={{color: Statuscolor}}>{claim.Status}</td>
        <td>{Statusaction === "can" ? (
            <>
              <FaTimes style={{color: 'red', cursor:'pointer'}} onClick={() => onCancel(claim.ClaimID)} />
              &nbsp;&nbsp;
              <FaEdit style={{cursor:'pointer'}} onClick={() => onEdit(claim.ClaimID)}/>
            </>
          ):(
            <></>
          )}</td>
    </tr>
  )
}

export default Claim;
