import formatCurrency from './currency'

export default function ({
  value,
  currency,
  currencyID
}) {
  const num = currency.match(/[0-9][0-9.]*[0-9]/, '')[0]
  return formatCurrency(value * num, currencyID)
}