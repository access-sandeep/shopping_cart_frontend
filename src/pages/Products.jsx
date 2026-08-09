import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab } from '@headlessui/react'
import Product from '../components/Product'
import { fetchProductsRequest } from '../features/products/productsSlice'
import { fetchCategoriesRequest } from '../features/categories/categoriesSlice'
import { fetchCartIdForCurrentUser, addItemRequest } from '../features/cart/cartSlice'
import './PageTheme.css'
import { get } from 'lodash'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Products() {
  const dispatch = useDispatch()
  const { products, isLoading, isError, message } = useSelector((state) => state.products)
  const { categories, isLoading: categoriesLoading, isError: categoriesError, message: categoriesMessage } = useSelector((state) => state.categories)
  const { userDetails, isLoading: userIsLoading, isError: userError, message: userMessage } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCategoriesRequest())
    dispatch(fetchProductsRequest())
    dispatch(fetchCartIdForCurrentUser())
  }, [dispatch])

  const matchesCategory = (product, category) => {
    const product_category_id = product?.category_id;
    const category_category_id = category?.category_id;
    return product_category_id === category_category_id;
  }

  function onAddToCart(product) {
    // Implement the logic to add the product to the cart
    dispatch(addItemRequest({ cart_id: get(userDetails, 'cart.cart_id', null), product_id: get(product, 'product_id', null), quantity: 1 }));
    let cart = get(userDetails, 'cart', null);
    let quantity = 1;
    console.log('Product id:', get(product, 'product_id', null));
    console.log('Cart id:', cart?.cart_id);
    console.log('Quantity:', quantity);
  }


  return (
    <section className="page-card">
      <h2 className="page-title">Our Products</h2>
      <p className="page-description">Shop the latest items in our catalog and filter by category.</p>

      {categoriesLoading && <p className="tab-content">Loading categories...</p>}
      {categoriesError && <p className="tab-content">{categoriesMessage || 'Unable to load categories.'}</p>}

      {isLoading && <p className="tab-content">Loading products...</p>}
      {isError && <p className="tab-content">{message || 'Unable to load products.'}</p>}

      <Tab.Group>
        <Tab.List className="tab-list">
          {categories.map((category) => (
            <Tab
              key={category.category_id}
              className={({ selected }) =>
                classNames(
                  'tab-button',
                  selected ? 'tab-button-selected' : 'tab-button-default'
                )
              }
            >
              {category.category_name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {categories.map((category) => {
            const filteredProducts = products.filter((product) => matchesCategory(product, category))

            return (
              <Tab.Panel key={category.category_id} className="tab-panel">
                <div className="product-grid">
                  {filteredProducts.length === 0 ? (
                    <div>There is no product in this category.</div>
                  ) : (
                    filteredProducts.map((product) => (
                      <Product key={product.product_id} product={product} onAddToCart={onAddToCart} />
                    ))
                  )}
                </div>
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}

export default Products
