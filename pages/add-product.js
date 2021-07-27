import React, { useEffect, useState } from 'react'
import getCookie from '../lib/getCookie'
import NavigationBar from '../components/navigation-bar'
import styles from '../styles/Home.module.css'
import FilterBar from '../components/filter-bar'
import useSWR from 'swr'

function AddProduct ({ user }) {
  const [productName, setProductName] = useState('')
  const [decrb, setDescrb] = useState('')
  const [price, setPrice] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [cat, setCat] = useState('')
  const { data: categories } = useSWR('/api/products/category')

  const handleAddProduct = async (e) => {
    e.preventDefault()
    const resp = await fetch('http://localhost:3000/api/products/add', {
      method: 'POST',
      body: JSON.stringify({
        name: productName,
        description: decrb,
        price: price,
        photo: imgURL,
        category: cat,
        id: user.id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })

    const json = await resp.json()
    console.log(json)
  }

  if (user.hasAccess === 0) {
    return (
      <div className={styles.body}>
        <NavigationBar/>
        <FilterBar category={categories}/>
        <p className="text-center mt-40 text-4xl">Sorry You Can't Add Products. This is a Buyer Account.</p>

      </div>
    )
  }

  if (user.hasAccess === 1) {

    return (
      <div className={styles.body}>
        <NavigationBar/>
        <FilterBar category={categories}/>
        <p className="text-center m-12 text-4xl underline">ADD YOUR PRODUCT</p>
        <form className="flex flex-col justify-center items-center space-y-6 mt-10">
          <label>Product Name</label><input onChange={e => setProductName(e.target.value)}
                                            className="border-2 p-2 rounded-md" id="pname" type="text"/>

          <label>Product Description</label><input onChange={e => setDescrb(e.target.value)}
                                                   className="border-2 p-2 rounded-md" id="pdescrb"
                                                   type="text"/>


          <label>Price</label><input onChange={e => setPrice('$' + e.currentTarget.value)}
                                     className="border-2 p-2 rounded-md"
                                     id="pprice" min="0" type="text"/>


          <label>Photo</label><input onChange={e => setImgURL(e.target.value)}
                                     className="border-2 p-2 rounded-md" id="pimage" type="url"/>


          <p>Category</p><input onChange={e => setCat(e.currentTarget.value)} className="border-2 p-2 rounded-md"
                                id="pcat" type="number" min="1" max="8"/>
          <button onClick={handleAddProduct} className="items-center bg-blue-700 px-8 py-3 text-white rounded-md">ADD
          </button>

        </form>

        <p className="text-center m-12">
          1 -> Electronics
          2 -> Person
          3 -> Currency
          4 -> Fashion
          5 -> Book
          6 -> Vehicle
          7 -> Real Estate
          8 -> Furniture
        </p>


      </div>
    )
  }
}

export async function getServerSideProps (ctx) {
  const { cookie } = ctx?.req.headers
  const user = await getCookie(cookie)

  const resp = await fetch(`http://localhost:3000/api/users/${user.sub}`)
  const json = await resp.json()

  return {
    props: { user: json }
  }
}

export default AddProduct