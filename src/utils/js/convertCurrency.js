import formatCurrency from './currency'
import pickNumber from './pickNumber'

export default function ({
  value,
  nextCurrency,
  actualCurrency,
  currencyID
}) {
  return formatCurrency((value / pickNumber(actualCurrency)) * pickNumber(nextCurrency), currencyID)
}