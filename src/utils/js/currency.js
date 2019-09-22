export default function (value, currencyID) {
  return new Intl.NumberFormat('US', {
    style: 'currency',
    currency: currencyID
  }).format(value)
}