import React from 'react'

const Pol = ( { policy }) => {
  return (
    <option value={policy.InsuranceID}>
      {policy.InsuranceType}
    </option>
  )
}

export default Pol;
