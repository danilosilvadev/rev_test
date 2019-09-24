import React from 'react'
import styled from 'styled-components'
import { convertCurrency } from '../../utils'

export default function(props) {
  const { currencies, currency, setCurrency, coin, setCoin } = props

  return (
    <section>
      <StyledSelect
        onChange={async e => {
          await setCurrency(e.target.value)
          if (
            currency.nextCurrency &&
            currency.actualCurrency &&
            currencies[currency.actualCurrency] &&
            currencies[currency.nextCurrency]
          ) {
            // FIXME: O SEGUNDO DROPDOWN NÃO MUDA O VALOR
            setCoin({
              ...coin,
              next: convertCurrency({
                value: coin.actual,
                actualCurrency: currencies[currency.actualCurrency],
                nextCurrency: currencies[currency.nextCurrency],
                currencyID: currency.nextCurrency,
              }),
            })
          }
        }}
      >
        <option value="">Selection</option>
        {Object.keys(currencies).map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </StyledSelect>
    </section>
  )
}

const StyledSelect = styled.select`
  border: 1px solid white;
  border-radius: 5px;
  padding: 0.5rem;
  background: #1572b9;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  cursor: pointer;
  text-align: center;
`
