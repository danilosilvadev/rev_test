import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { reqs, initialState } from '../../redux'

function WalletView(props) {
  const { wallet, getWallet } = props

  useEffect(() => {
    getWallet()
  }, [getWallet])

  return (
    <section className="f f-column f-align-center m-top-2">
      <span className="f font-size-2 m-bottom-2">Wallet</span>
      <div className="f f-align-start">
        <span className="m-bottom-1">USD {wallet.USD}</span>
        <span className="m-bottom-1 m-left-1 m-right-1">GBP {wallet.GBP}</span>
        <span>EUR {wallet.EUR}</span>
      </div>
    </section>
  )
}

const mapStateToProps = ({ coin }) => {
  return {
    wallet: !_.isEmpty(coin.wallet) ? coin.wallet : initialState.wallet,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWallet: () => dispatch(reqs.wallet.getWallet()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletView)

// To add to pre-commit       "pre-commit": "lint-staged && react-scripts test && flow check"
