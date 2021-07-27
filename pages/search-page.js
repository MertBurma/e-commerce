import React from 'react'
import NavigationBar from '../components/navigation-bar'
import FilterBar from '../components/filter-bar'
import styles from '../styles/Home.module.css'
import Products from '../components/products'
import useSWR from 'swr'

function SearchPage ({ items }) {
  const { data: category } = useSWR('/api/products/category')
  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={category}/>
      <Products products={items}/>
      {items.length === 0 && <p className="text-center text-4xl">Sorry.. We couldn't find what you want</p>}
    </div>
  )
}

export async function getServerSideProps ({ query }) {
  const { name } = query
  const resp = await fetch(`http://localhost:3000/api/products/search/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

  })

  const json = await resp.json()
  console.log(json)
  return {
    props: { items: json }
  }
}

export default SearchPage