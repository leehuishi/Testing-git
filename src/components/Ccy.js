import React from 'react'

const Ccy = ( { ccy }) => {
  return (
    <option value={ccy.CurrencyID}>
      {ccy.CurrencyID}
    </option>
  )
}

export default Ccy
