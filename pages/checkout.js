import React from 'react'
import NavigationBar from '../components/navigation-bar'
import FilterBar from '../components/filter-bar'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

function Checkout () {
  const { data, error } = useSWR('/api/products/category', fetcher)
  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={data}/>
      <div className="text-5xl mt-32 space-y-12">
        <p className="flex justify-center">
          Your order has been successfully completed.
        </p>
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" viewBox="0 0 20 20" fill="green">
            <path fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"/>
          </svg>

        </div>
        <Link href="/home">
          <a className="hover:text-blue-600 flex justify-center text-5xl">Home Page</a>
        </Link>
      </div>


    </div>

  )
}

export default Checkout