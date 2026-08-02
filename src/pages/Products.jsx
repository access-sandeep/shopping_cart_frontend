import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const categories = ['All Products', 'New Arrivals', 'On Sale']

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <section>
      <h2>Our Products</h2>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <Listbox.Button className="listbox-button">{selectedCategory}</Listbox.Button>
        <Listbox.Options className="listbox-options">
          {categories.map((category) => (
            <Listbox.Option
              key={category}
              value={category}
              className="listbox-option"
            >
              {category}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <p className="mt-4">Selected category: {selectedCategory}</p>
    </section>
  )
}

export default Products
