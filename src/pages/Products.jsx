import { Tab } from '@headlessui/react'
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
  return (
    <section className="page-card">
      <h2 className="page-title">Our Products</h2>
      <p className="page-description">Shop the latest items in our catalog and filter by category.</p>
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
              <p>{tabContent[category]}</p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}

export default Products
