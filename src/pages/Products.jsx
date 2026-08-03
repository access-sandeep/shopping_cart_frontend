import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab } from '@headlessui/react'
import Product from '../components/Product'
import { fetchProductsRequest } from '../features/products/productsSlice'
import './PageTheme.css'

const categories = [
  'All Products',
  'iOS Mobiles',
  'Android Mobiles',
  'Smart TV',
  'New Arrivals',
  'On Sale',
]

const tabContent = {
  'All Products': 'Browse all the items in our catalog, including newest releases and best-selling favorites.',
  'iOS Mobiles':
    'Sleek design. Powerful performance. Seamless iOS experience. Explore the latest iPhones and elevate your everyday with style and innovation.',
  'Android Mobiles':
    'Endless choices. Smart features. Ultimate flexibility. Discover Android mobiles that match your lifestyle with powerful performance and innovative designs.',
  'Smart TV':
    'Big screen. Brilliant picture. Smarter entertainment. Explore Smart TVs with streaming, apps, and voice control—all in one sleek package.',
  'New Arrivals': 'Explore the latest additions to our store, fresh from our newest product drops.',
  'On Sale': 'Save on popular items with current discounts and limited-time offers.',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Products() {
  const dispatch = useDispatch()
  const { products, isLoading, isError, message } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  const matchesCategory = (product, category) => {
    const productCategory = product?.category?.category_name
    if (category === 'Android Mobiles' && productCategory === 'Android Mobiles') {
      return true
    }
    return productCategory === category
  }

  return (
    <section className="page-card">
      <h2 className="page-title">Our Products</h2>
      <p className="page-description">Shop the latest items in our catalog and filter by category.</p>

      {isLoading && <p className="tab-content">Loading products...</p>}
      {isError && <p className="tab-content">{message || 'Unable to load products.'}</p>}

      <Tab.Group>
        <Tab.List className="tab-list">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'tab-button',
                  selected ? 'tab-button-selected' : 'tab-button-default'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {categories.map((category) => (
            <Tab.Panel key={category} className="tab-panel">
              <p className="tab-content">{tabContent[category]}</p>
              <div className="product-grid">
                {products
                  .filter((product) => matchesCategory(product, category))
                  .map((product) => (
                    <Product key={product.product_id} product={product} />
                  ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}

export default Products
