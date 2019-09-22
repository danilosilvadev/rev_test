import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { reqs, initialState } from './redux'
import './App.css'
import { ExchangeView, WalletView } from './components'
import { filterObject, convertCurrency } from './utils'

function App(props) {
  const { getCurrencies, currencies } = props
  const [stateForm, dispatchForm] = useReducer(formReducer, initialStateForm)

  useEffect(() => {
    getCurrencies()
  }, [getCurrencies])

  return (
    <div className="App f f-justify-center w-100 h-100 p-4 c-white f-column c-bg-main ">
      <header>Convert Coin</header>
      <WalletView />
      <section className="f f-column p-3 f-align-center">
        <section className="m-bottom-4 m-top-2 f f-justify-between w-30">
          <input
            className="m-right-2"
            value={stateForm.actualCoin}
            onChange={e => {
              dispatchForm({
                type: formTypes.COIN,
                actualCoin: e.target.value,
                nextCoin: convertCurrency({
                  actualCoin: Number(e.target.value),
                  currency: currencies[stateForm.nextCurrency],
                  currencyID: stateForm.nextCurrency,
                }),
              })
            }}
          />
          <ExchangeView
            currencies={currencies}
            action={{ dispatchForm, name: 'actualCurrency', stateForm }}
          />
        </section>
        {stateForm.actualCurrency ? (
          <form className="f f-column w-30" onSubmit={() => {}}>
            <div className="f f-justify-between m-bottom-2">
              {stateForm.nextCurrency ? (
                <span className="m-right-2">{stateForm.nextCoin}</span>
              ) : null}
              <ExchangeView
                currencies={filterObject(currencies, stateForm.actualCurrency)}
                action={{ dispatchForm, name: 'nextCurrency', stateForm }}
              />
            </div>
            <button
              type="submit"
              className="clear-button c-bg-main c-white font-size-1-5"
            >
              Exchange
            </button>
          </form>
        ) : null}
      </section>
    </div>
  )
}

const formTypes = {
  COIN: 'COIN',
  ACTUAL_CURRENCY: 'ACTUAL_CURRENCY',
  NEXT_CURRENCY: 'NEXT_CURRENCY',
}

const initialStateForm = {
  actualCoin: 0,
  nextCoin: 0,
  actualCurrency: '',
  nextCurrency: '',
}

const formReducer = (state, action) => {
  switch (action.type) {
    case formTypes.COIN:
      return {
        ...state,
        actualCoin: action.actualCoin,
        nextCoin: action.nextCoin,
      }
    case formTypes.ACTUAL_CURRENCY:
      return {
        ...state,
        actualCurrency: action.actualCurrency,
      }
    case formTypes.NEXT_CURRENCY:
      return {
        ...state,
        nextCurrency: action.nextCurrency,
      }
    default:
      return state
  }
}

const mapStateToProps = ({ coin }) => {
  return {
    currencies: !_.isEmpty(coin.currencies)
      ? coin.currencies
      : initialState.currencies,
  }
}

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(reqs.getCurrencies()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// To add to pre-commit       "pre-commit": "lint-staged && react-scripts test && flow check"
