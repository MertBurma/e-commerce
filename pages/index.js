import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Login () {

  const [username, setUsername] = useState('')
  const [passwd, setPasswd] = useState('')
  const [error, setError] = useState({})

  const router = useRouter()

  async function handleLogin (e) {
    e.preventDefault() // re-render disabled
    try {
      const resp = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',

        body: JSON.stringify({
          username: username,
          password: passwd
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        },

      })
      const json = await resp.json()
      if (json.message === 'Welcome') {
        setError({ errorMessage: '' })
        router.push('/home')
      }
    } catch (e) {
      setError({ errorMessage: 'Invalid Login' })
    }
  }


  return (

      <div className={styles.login}>

        <div clas>
          <img className=" w-52 h-1/8 pl-3 my-8" src="https://www.mef.edu.tr/images/logo_tr_color.png" alt="logo"/>

          <div className="flex flex-col space-y-6">
            <input value={username} onChange={e => setUsername(e.target.value)}
                   className="focus:outline-none focus:ring-2 rounded-2xl py-2 px-8 focus:placeholder-gray-300"
                   type="text" placeholder="Username"/>
            <input value={passwd} onChange={e => setPasswd(e.target.value)}
                   className="focus:outline-none focus:ring-2 rounded-2xl py-2 px-8 focus:placeholder-gray-300"
                   type="password" placeholder="Password"/>
          </div>

          <div className="space-y-6 space-x-4">
            <input onClick={handleLogin}
                   className="cursor-pointer focus:outline-none hover:bg-red-700 text-white rounded-2xl bg-red-600 px-6 py-1"
                   type="submit"
                   value="Login"/>
            <Link href="/register">
              <input
                  className="cursor-pointer focus:outline-none hover:bg-blue-700 text-white rounded-3xl bg-blue-600 px-6 py-1"
                  type="submit" value="Register"/>
            </Link>
          </div>
          {error && <h3 className="bg-blue-700">{error.errorMessage}</h3>}


        </div>
      </div>


















  )
}

export default Login