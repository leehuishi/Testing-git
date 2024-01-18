import Claim from './Claim'

const Claims2 = ({ claims, onCancel, onEdit, onDelete }) => {
  return (
    <>
      <table>
        <tr>
          {/* <th style={{width: '200px'}}>Claim ID</th> */}
          <th style={{width: '8%', paddingRight: '5px'}}>Claim ID</th>
          <th style={{width: '8%'}}>Proj ID</th>
          <th style={{width: '18%'}}>Proj Name</th>
          <th style={{width: '20%'}}>Expense Date</th>
          <th style={{width: '12%'}}>Amt</th>
          <th style={{width: '17%'}}>Purpose</th>
          <th style={{width: '10%'}}>Status</th>
          <th style={{width: '7%'}}>Action</th>
        </tr>
        {claims.map((claim) => (
          <Claim key={claim.ClaimID} claim={claim} onCancel={onCancel} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </table>
    </>
  )
}

export default Claims2
