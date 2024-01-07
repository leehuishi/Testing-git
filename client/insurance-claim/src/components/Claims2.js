import Claim from './Claim'

const Claims2 = ({ claims, onCancel, onEdit }) => {
  return (
    <>
      <table>
        <tr>
          {/* <th style={{width: '200px'}}>Claim ID</th> */}
          <th>Claim ID</th>
          <th>Proj ID</th>
          <th>Proj Name</th>
          <th>Expense Date</th>
          <th>Amt</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {claims.map((claim) => (
          <Claim key={claim.ClaimID} claim={claim} onCancel={onCancel} onEdit={onEdit} />
        ))}
      </table>
    </>
  )
}

export default Claims2
