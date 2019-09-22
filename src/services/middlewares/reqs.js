import {
  getCurrency
} from "../../utils";

export default function ({
  rates
}) {
  return ({
    GBP: getCurrency(rates.GBP, 'GBP'),
    USD: getCurrency(rates.USD, 'USD'),
    EUR: getCurrency(rates.EUR, 'EUR')
  })
}