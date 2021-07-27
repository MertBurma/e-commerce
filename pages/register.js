import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import useSWR, { mutate } from 'swr'
import fetcher from '../lib/fetcher'
import jwt from 'jsonwebtoken'

import Link from 'next/link'

function Register () {

  const [username, setUsername] = useState('')
  const [passwd, setPasswd] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [msg, setMsg] = useState({})

  let isInValid = username === '' || passwd === '' || email === '' || userType === ''

  async function handleRegister (e) {
    e.preventDefault() // re-render disabled
    if (!isInValid) {
      const value = userType === 'Buyer' ? 0 : 1
      const res = await fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          password: passwd,
          userType: value
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      isInValid = false
      const json = await res.json()

      if (!json.id) {
        setMsg({ userError: 'This user already exists' })
      } else {
        setMsg({ success: 'Your Account is created' })
      }

      mutate('/api/users', json)
    }

  }

  return (
    <div className="">
      <form className={styles.login}>

        <img className="w-52 h-1/8 my-8" src="https://www.mef.edu.tr/images/logo_tr_color.png" alt="logo"/>
        <div className="flex flex-col space-y-6">
          <input value={username} onChange={e => setUsername(e.target.value)}
                 className="focus:outline-none focus:ring-2 rounded-2xl py-2 px-8 focus:placeholder-gray-300"
                 type="text" placeholder="Username"/>


          <input value={email} onChange={e => setEmail(e.target.value)}
                 className="focus:outline-none focus:ring-2 rounded-2xl py-2 px-8 focus:placeholder-gray-300"
                 type="text" placeholder="Email"/>


          <input value={passwd} onChange={e => setPasswd(e.target.value)}
                 className="focus:outline-none focus:ring-2 rounded-2xl py-2 px-8 focus:placeholder-gray-300"
                 type="password" placeholder="Password"/>
        </div>

        <div className="mt-6 mb-6 space-x-8">


          <input onChange={e => setUserType(e.currentTarget.value)} type="radio" name="user type"
                 value="Buyer"/> Buyer
          <input onChange={e => setUserType(e.currentTarget.value)} type="radio" name="user type"
                 value="Seller"/> Seller
        </div>

        <div className="mt-2 mb-6">


          <input onClick={handleRegister}
                 className="cursor-pointer focus:outline-none hover:bg-blue-700 text-white rounded-3xl bg-blue-600 px-6 py-1"
                 type="submit" value="Register"/>

        </div>

        {isInValid && <h2>There cannot be blank areas</h2>}
        {msg.userError && <h2>{msg.userError}</h2>}
        {msg.success && <h3>{msg.success}</h3>}
      </form>
    </div>

  )
}

export default Register