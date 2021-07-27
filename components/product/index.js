import React, { useEffect } from 'react'
import styles from './index.module.css'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

export default function Product ({ product }) {
  const { data, error } = useSWR('/api/carts/', fetcher)

  const createCart = async () => {

    const resp = await fetch('http://localhost:3000/api/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const json = resp.json()
    console.log(json)
  }

  const handleAddCart = async (e) => {
    e.preventDefault()
    if (!data) {
      await createCart()
    }
    const resp = await fetch('http://localhost:3000/api/cart-items/add', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({
        id: product.id
      })

    })

    const json = await resp.json()
    console.log(json)

  }

  return (

    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.imgwrap}>
          <img className={styles.img} src={product.image}/>
        </div>
        <div className={styles.upper}>
          <h1>{product.name}</h1>

        </div>
        <div className={styles.lower}>
          <h5>{product.description}</h5>
        </div>
        <div className={styles.lower}>
          <p>{product.price}</p>
          <button className="" type="button" onClick={handleAddCart}>
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="gray"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </button>

        </div>

      </div>


    </div>
  )
}
