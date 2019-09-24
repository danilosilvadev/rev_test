import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import { reqs, initialState } from './redux'
import './App.css'
import { ExchangeView, WalletView } from './components'
import { filterObject, convertCurrency, pickNumber } from './utils'

function App(props) {
  const { getCurrencies, currencies, updateWallet, wallet } = props
  const [coin, setCoin] = useState({ actual: '', next: '' })
  const [actualCurrency, setActualCurrency] = useState('')
  const [nextCurrency, setNextCurrency] = useState('')

  useEffect(() => {
    getCurrencies()
  }, [getCurrencies])

  // console.log(currencies[nextCurrency], 'currencias', nextCurrency)

  return (
    <div className="App f c-white f-column c-bg-main p-left-4">
      <section className="f f-column f-align-center">
        <WalletView />
        <section className="f f-column">
          <section className="m-bottom-4 m-top-2 f f-column">
            <header className="m-bottom-3">
              Choose the currency you want to exchange
            </header>
            <section className="f f-align-center f-justify-between">
              From
              <ExchangeView
                currencies={currencies}
                setCurrency={setActualCurrency}
                currency={{ actualCurrency, nextCurrency }}
                coin={coin}
                setCoin={setCoin}
              />
              to
              <ExchangeView
                currencies={filterObject(currencies, actualCurrency)}
                setCurrency={setNextCurrency}
                currency={{ actualCurrency, nextCurrency }}
                coin={coin}
                setCoin={setCoin}
              />
            </section>
            {actualCurrency && nextCurrency ? (
              <section>
                <form
                  className="f f-align-center f-justify-between"
                  onSubmit={e => {
                    e.preventDefault()
                    updateWallet({
                      ...wallet,
                      [actualCurrency]:
                        Number(wallet[actualCurrency]) - Number(coin.actual),
                      [nextCurrency]:
                        Number(pickNumber(coin.next)) +
                        Number(wallet[nextCurrency]),
                    })
                  }}
                >
                  <div className="f f-justify-start f-align-center">
                    <span className="font-size-2 m-right-2"> From</span>
                    <StyledInput
                      placeholder="Coins"
                      className="m-top-2"
                      value={coin.actual}
                      onChange={e => {
                        setCoin({
                          actual: e.target.value,
                          next: convertCurrency({
                            value: Number(e.target.value),
                            actualCurrency: currencies[actualCurrency],
                            nextCurrency: currencies[nextCurrency],
                            currencyID: nextCurrency,
                          }),
                        })
                      }}
                    />
                  </div>
                  <div className="f f-justify-start f-align-center font-size-2">
                    <span className=" m-right-2"> To</span>
                    <div className="f f-justify-end m-bottom-2 f-align-center">
                      <div className="f f-column">
                        <span className="m-top-2 m-bottom-2 font-size-2">
                          {coin.next}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StyledButton type="submit" className="font-size-1-5 m-top-4">
                    Exchange
                  </StyledButton>
                </form>
              </section>
            ) : null}
          </section>
        </section>
      </section>
    </div>
  )
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
