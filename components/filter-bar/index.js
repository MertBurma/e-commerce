import React from 'react'
import { useRouter } from 'next/router'
import style from "./index.module.css"
import useSWR from 'swr'

function FilterBar ({ category }) {

  const router = useRouter()
  const handleFilter = async (categoryId) => {

    if (categoryId === 9) {
      await router.push('/home')
      return
    }

    await router.push(`/filtered-page?id=${categoryId}`)
  }
  return (
    <div className="flex justify-center bg-gray-900 space-x-8 py-2">
      {category && category?.map(c => (
        <button className={style.filterButton} onClick={() => handleFilter(c.id)}>{c.name}</button>
      ))}

    </div>
  )
}

export default FilterBar