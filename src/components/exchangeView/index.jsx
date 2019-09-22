import React from 'react'

export default function(props) {
  const {
    currencies,
    action: { dispatchForm, name, stateForm },
  } = props
  return (
    <section>
      <select
        onChange={e => {
          dispatchForm({
            ...stateForm,
            type: 'COIN',
            [name]: e.target.value,
          })
        }}
      >
        <option value="">Selection</option>
        {Object.keys(currencies).map(currency => (
          <option value={currency} key={currency}>
            {currencies[currency]}
          </option>
        ))}
      </select>
    </section>
  )
}
