import React, { useState } from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export default function NavigationBar () {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const handleLogout = async (e) => {
    e.preventDefault()
    router.push('/')
    const resp = await fetch('http://localhost:3000/api/users/logout')

    const json = await resp.json()
    console.log(json)

  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (search) {
      await router.push(`/search-page?name=${search}`)
    }

  }

  return (
    <div className={styles.container}>
      <div className="h-24 items-center bg-gray-900 shadow-2xl flex flex-1 justify-between">
        <Link href="/home">


          <div className="flex items-center">


            <p className="pl-14 text-2xl text-white  font-bold">WISDOM</p>


          </div>

        </Link>

        <div className="flex justify-around ">
          <input onChange={e => setSearch(e.target.value)} type="text" className="px-36 rounded-3xl px-4 py-0.5"
                 placeholder="Search product"/>
          <button onClick={handleSearch} type="button" className="mx-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
              <path fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <div className=" flex flex-wrap content-around items-center  ">
          
          <div className="p-7">
            <Link href="/about">
              <button className="  text-xl cursor-pointer border-0 border-black   text-white font-bold   rounded-full">
                About
              </button>
            </Link>
          </div>



          <Link href="/add-product">
            <div className="font-bold p-7 flex space-y-4">

              <button className="  text-xl cursor-pointer border-0 border-black   text-white font-bold   rounded-full">


                Add Product
              </button>

            </div>
          </Link>
          <div className="font-bold p-7 flex space-y-4">

            <button onClick={handleLogout}
                    className="  text-xl cursor-pointer border-0 border-black   text-white font-bold   rounded-full">

              Log Out
            </button>

          </div>


        </div>

        <Link href="/cart">

          <button type="button" className={[styles.container, 'mr-8']}>
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff">
              <path fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"/>
            </svg>

          </button>
        </Link>
      </div>


    </div>
  )
}

