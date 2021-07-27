import styles from './index.module.css'
import Product from '../product'
import Link from 'next/Link'

export default function Products ({ products }) {

  return (
    <div className={styles.container}>
      {products?.map((p) => (
        <Link href={`/product-page?id=${p.id}`}>
          <a>
            <Product key={p.id} product={p}/>
          </a>
        </Link>
      ))}
    </div>
  )
}

