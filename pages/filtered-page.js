import React from 'react'
import Products from '../components/products'
import NavigationBar from '../components/navigation-bar'
import FilterBar from '../components/filter-bar'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import styles from "../styles/Home.module.css"

function FilteredPage ({ products }) {
  const { data: category, error } = useSWR('/api/products/category', fetcher)

  if (error) return <p>Failed to Load</p>
  if (!category) return <p>Loading...</p>
  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={category}/>
      <Products products={products}/>
    </div>
  )
}

export async function getServerSideProps ({ query }) {

  try {
    const { id } = query
    const resp = await fetch(`http://localhost:3000/api/products/category/${id}`)
    const products = await resp.json()

    return {
      props: { products }
    }
  } catch (e) {
    console.error(e)
  }

}

export default FilteredPage