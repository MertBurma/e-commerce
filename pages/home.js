import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/navigation-bar'
import Products from '../components/products'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import style from '../styles/Home.module.css'
import FilterBar from '../components/filter-bar'

export default function Home () {

  const { data, error } = useSWR('/api/products', fetcher)
  const { data: category } = useSWR('/api/products/category')

  if (error) return <p>Failed to Load</p>
  if (!data || !category) return <p>Loading...</p>

  return (

    <div className={style.body}>

      <NavigationBar/>
      <FilterBar category={category}/>

      <Products products={data}/>

    </div>
  )

}










