import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import { reqs, initialState } from './redux'
import './App.css'
import { ExchangeView, WalletView } from './components'
import { filterObject, convertCurrency, pickNumber, getCurrency } from './utils'

function App(props) {
  const { getCurrencies, currencies, updateWallet, wallet } = props
  const [actualCurrency, setActualCurrency] = useState('')
  const [nextCurrency, setNextCurrency] = useState('')
  const [coin, setCoin] = useState({
    actual: '',
    next: getCurrency(0, nextCurrency || 'USD'),
  })
  const [insuficientFounds, setInsuficientFounds] = useState(false)

  useEffect(() => {
    getCurrencies()
    /** 
     * setInterval(() => {
      getCurrencies()
    }, 10000)
     * 
     */
  }, [getCurrencies])

  // console.log(currencies[nextCurrency], 'currencias', nextCurrency)

  return (
    <div className="App f c-white f-column">
      <section className="f f-column f-align-center w-80 m-0-auto">
        <WalletView />
        <section className="f f-column">
          <section className="m-bottom-4 m-top-2 f f-column">
            <header className="m-bottom-3">
              Choose the currency you want to exchange
            </header>
            <section className="f f-align-center f-justify-center m-bottom-2">
              <span className="m-right-2">From</span>
              <ExchangeView
                currencies={currencies}
                setCurrency={setActualCurrency}
                currency={{ actualCurrency, nextCurrency }}
                coin={coin}
                setCoin={setCoin}
              />
              <span className="m-right-2 m-left-2">to</span>
              <ExchangeView
                currencies={filterObject(currencies, actualCurrency)}
                setCurrency={setNextCurrency}
                currency={{ actualCurrency, nextCurrency }}
                coin={coin}
                setCoin={setCoin}
              />
            </section>
            {actualCurrency && nextCurrency ? (
              <section className="f f-justify-center">
                <div className="f f-align-center f-justify-center">
                  <div className="f f-justify-start f-align-center w-50">
                    <span className="font-size-2 m-right-1">From</span>
                    <span className="font-size-2">{actualCurrency}</span>
                    <StyledInput
                      placeholder="Coins"
                      value={coin.actual}
                      maxLength="7"
                      onChange={e => {
                        const input = e.target.value.match(/\d+/g)
                        if (!input && e.target.value !== '') return
                        setCoin({
                          actual: input || '',
                          next: convertCurrency({
                            value: Number(input),
                            actualCurrency: currencies[actualCurrency],
                            nextCurrency: currencies[nextCurrency],
                            currencyID: nextCurrency,
                          }),
                        })
                      }}
                    />
                  </div>
                  <div className="f f-justify-start f-align-center font-size-2">
                    <span className="m-right-1 m-left-1"> To</span>
                    <div className="f f-justify-end f-align-center">
                      <div className="f">
                        <span className="font-size-2">{coin.next}</span>
                        <span className="font-size-2 m-left-1">
                          {nextCurrency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            <StyledButton
              onClick={() => {
                if (coin.actual === '') return
                updateWallet({
                  ...wallet,
                  [actualCurrency]: handleDecreasePocket(
                    wallet,
                    actualCurrency,
                    coin.actual,
                    setInsuficientFounds
                  ),
                  [nextCurrency]: handleRaisePocket(
                    wallet,
                    nextCurrency,
                    pickNumber(coin.next),
                    actualCurrency
                  ),
                })
                setCoin({ ...coin, actual: '' })
              }}
              className="font-size-1-5 m-top-4 m-0-auto"
            >
              Exchange
            </StyledButton>
            <div className="f f-justify-center">
              {insuficientFounds ? (
                <span className="c-red c-bg-white p-1 m-top-5 m-0-auto">
                  Insufficient funds
                </span>
              ) : null}
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}

const handleRaisePocket = (wallet, currency, coin, lossCurrency) => {
  const loss = Number(wallet[lossCurrency]) - Number(coin)
  console.log(loss, 'embrazando')
  return loss >= 0
    ? (Number(wallet[currency]) + Number(coin)).toFixed(2)
    : wallet[currency]
}

const handleDecreasePocket = (wallet, currency, coin, setInsuficientFounds) => {
  const loss = Number(wallet[currency]) - Number(coin)
  if (loss >= 0) {
    setInsuficientFounds(false)
    return loss.toFixed(2)
  } else {
    setInsuficientFounds(true)
    return wallet[currency]
  }
}

const StyledButton = styled.button`
  background-color: #1572b9;
  color: white;
  transition: 0.3s;
  border: 1px solid white;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: white;
    color: #1572b9;
  }
`

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  -webkit-appearance: none;
  outline: none;
  height: 2rem;
  color: white;
  padding: 0.5rem;
  background: none;
  border: none;
  border-bottom: 1px solid white;
  font-size: 2rem;
  caret-color: white;
  ::placeholder {
    /* Firefox, Chrome, Opera */
    color: #8ec1e5;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #8ec1e5;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #8ec1e5;
  }
`

const mapStateToProps = ({ coin }) => {
  return {
    currencies: !_.isEmpty(coin.currencies)
      ? coin.currencies
      : initialState.currencies,
    wallet: !_.isEmpty(coin.wallet) ? coin.wallet : initialState.wallet,
  }
}

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(reqs.currencies()),
  updateWallet: props => dispatch(reqs.wallet.updateWallet(props)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// To add to pre-commit       "pre-commit": "lint-staged && react-scripts test && flow check"
