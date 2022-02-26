import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import styles from '../../styles/AddLiquidity.module.css'

type Props = {}

const Button = () => (
  <button className={styles.btn_primary}>Connect Wallet</button>
)

export default function AddLiquidity({ }: Props) {
  return (
    <div className={styles.container}>
    <Head>
      <title>3Swap | Add Liquidity</title>
    </Head>
    <div className={styles.title}>
      <div>Add Liquidity</div>
      <img src='../settings.svg' style={{ cursor: "pointer", color:'red' }} width={28} height={28} />
    </div>
    <div className={styles.desc}>
    Get LP tokens when you add liquidity.
    </div>

    <div className={styles.text_select_token}>Select Token</div>

    <div className={styles.select_token}>
      <div className={styles.coin_container}>
        <div className={styles.left}>
          <img src='../btc.svg' style={{ cursor: "pointer" }} width={28} height={28} />
          <div>BTC</div>
          <img src='../down.svg' style={{ cursor: "pointer" }} width={12} height={6} />
        </div>

        <div className={styles.right}>
          <div className={styles.amt}>0.000001</div>
        </div>
      </div>

    </div>

    <img className={styles.addition} src='../addition.svg' />

    <div className={styles.text_select_token}>Select Token</div>


    <div className={styles.select_token}>
      <div className={styles.coin_container}>
        <div className={styles.left}>
          <img src='../btc.svg' style={{ cursor: "pointer" }} width={28} height={28} />
          <div>BTC</div>
          <img src='../down.svg' style={{ cursor: "pointer" }} width={12} height={6} />
        </div>

        <div className={styles.right}>
          <div className={styles.amt}>0.000001</div>
        </div>
      </div>

    </div>

    <img className={styles.addition} src='../addition.svg' />

    <div className={styles.text_select_token}>Select Token</div>


    <div className={styles.select_token}>
      <div className={styles.coin_container}>
        <div className={styles.left}>
          <img src='../btc.svg' style={{ cursor: "pointer" }} width={28} height={28} />
          <div>BTC</div>
          <img src='../down.svg' style={{ cursor: "pointer" }} width={12} height={6} />
        </div>

        <div className={styles.right}>
          <div className={styles.amt}>0.000001</div>
        </div>
      </div>

    </div>

    <Button />
  </div>
  )
}