import React, { useState } from 'react'
import NavigationBar from '../components/navigation-bar'
import styles from '../styles/Home.module.css'

import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import FilterBar from '../components/filter-bar'
import { useRouter } from 'next/router'

function Cart () {

  const { data, error } = useSWR('/api/cart-items', fetcher)
  const { data: category } = useSWR('/api/products/category', fetcher)
  if (error) return <p>Failed to Load</p>
  if (!data) return <p>Loading...</p>

  const router = useRouter()

  const handleCheckout = async (e) => {
    e.preventDefault()
    const resp = await fetch('http://localhost:3000/api/users/pay')
    const json = await resp.json()

    if (json) {
      await createCart()
    }

    if (findPrice(data) !== 0) {
    await router.push('/checkout')
    }
  }

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

  console.log(data)

  function findOcc (arr, key) {
    let occ = []

    arr.forEach((a) => {

      if (occ.some((val) => { return val[key] == a[key]})) {
        occ.forEach((k) => {
          if (k[key] === a[key]) {
            k['count']++
          }
        })
      } else {
        let x = {}
        x[key] = a[key]
        x['count'] = 1
        occ.push(x)
      }
    })

    return occ
  }

  function findPrice (arr) {
    const sum = arr.reduce((s, e) => s + parseInt(e.price.slice(1)), 0)
    return sum
  }

  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={category}/>
      <h1 className="m-4 underline text-6xl font-extrabold p-2">Your Cart</h1>
      <div className="text-4xl space-y-5 ml-12">
        {findOcc(data, 'name').map(d => (
          <p>{d.name} x{d.count}</p>
        ))}

      </div>

      <div className="text-5xl space-y-4 mt-12 ml-12">
        <p className="underline">Subtotal:</p>
        <p>${findPrice(data)}</p>
      </div>

      <button
        onClick={handleCheckout}
        className="hover:bg-red-800 focus:outline-none rounded-md p-3 text-white bg-red-400 text-2xl ml-12 mt-20">CHECKOUT
      </button>

    </div>
  )
}

export default Cart