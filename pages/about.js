import React from 'react'
import NavigationBar from '../components/navigation-bar'
import styles from '../styles/Home.module.css'
import FilterBar from '../components/filter-bar'
import useSWR from 'swr'

function About () {
  const { data } = useSWR('/api/products/category')
  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={data}/>
      <div className="mt-12 text-3xl space-y-4">
        <p className="m-12">
          THIS IS TERM PROJECT OF COMP 302
        </p>
        <p className="m-12 underline">Teammates: </p>
        <ul className="m-12">
          <li>Mustafa Mert BURMA</li>
          <li>Cem SANLI</li>
          <li>Mehmet Ali YAMAN</li>
          <li>Furkan GÜNEY</li>
        </ul>
      </div>
    </div>
  )
}

export default About