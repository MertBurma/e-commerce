import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import fetcher from '../lib/fetcher'
import NavigationBar from '../components/navigation-bar'
import styles from '../styles/Home.module.css'
import FilterBar from '../components/filter-bar'

function ProductPage ({ product }) {

  const { data } = useSWR(`/api/products/feedback/${product.id}`, fetcher)
  const { data: category } = useSWR('/api/products/category', fetcher)
  const [feedback, setFeedback] = useState('')
  console.log(category)

  const [point, setPoint] = useState()

  const handleAddFeedback = async () => {

    try {
      const resp = await fetch('http://localhost:3000/api/products/feedback/add', {
        body: JSON.stringify({
          feedback: feedback,
          point: point,
          product_id: product.id

        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        }

      })

      const result = await resp.json()
      console.log(result)
      if (result.message === 'feedbacks are here') {
        setMessage('Your Feedback is added')
      }
    } catch (e) {
      setMessage('ERRROR')
    }

  }
  return (
    <div className={styles.body}>
      <NavigationBar/>
      <FilterBar category={category}/>
      <div className="flex flex-col items-center p-2.5  ">

        <div className=" ">
          <h1 className=" font-mono  text-4xl py-3.5  text-gray-800 font-medium ">
            {product.name} {product.price}
          </h1>
        </div>

        <div>
          <p className="text-lg font-semibold leading-6 opacity-50 m-1.5">
            {product.description}
          </p>
        </div>

        <div className="pt-4">
          <div>
            <img className=" bg-black rounded-lg shadow-lg h-96 " src={product.image}/>
          </div>
          <div className="flex justify-center">
            <button
              className=" text-center cursor-pointer border-0 border-black mt-8 ml-8  text-black font-bold py-2 px-4 rounded-full">
              ADD TO CART
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>

            </button>


          </div>

        </div>

        <div className="space-x-6">
          <form className="space-x-6">
            <label>
              <input onClick={e => setPoint(parseInt(e.currentTarget.value))} type="radio" name="stars" value="1"/>
              <span className="icon">★</span>
            </label>
            <label>
              <input onClick={e => setPoint(parseInt(e.currentTarget.value))} type="radio" name="stars" value="2"/>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input onClick={e => setPoint(parseInt(e.currentTarget.value))} type="radio" name="stars" value="3"/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input onClick={e => setPoint(parseInt(e.currentTarget.value))} type="radio" name="stars" value="4"/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input onClick={e => setPoint(parseInt(e.currentTarget.value))} type="radio" name="stars" value="5"/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
          </form>
          <input onChange={e => setFeedback(e.target.value)} className="p-8 bg-green-400" type="text"/>

          <button onClick={handleAddFeedback} className="p-8 bg-red-200">Submit</button>
        </div>


        {data && data.map(d => {
          return (
            <div>
              <p>{d.point}</p>
              <p>{d.feedback}</p>
            </div>
          )
        })}


      </div>
    </div>

  )
}

export async function getServerSideProps ({ query }) {
  const { id } = query
  try {

    const resp = await fetch(`http://localhost:3000/api/products/${id}`)
    const product = await resp.json()

    return {
      props: { product }
    }
  } catch (e) {
    console.error(e)
  }
}

export default ProductPage