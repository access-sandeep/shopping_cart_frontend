import { Tab } from '@headlessui/react'

const tabs = [
  { name: 'Overview', content: 'Browse products and add items to your cart.' },
  { name: 'How It Works', content: 'Select a category and use the cart to manage your order.' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Home() {
  return (
    <section>
      <h2>Welcome to the Shop</h2>
      <Tab.Group>
        <Tab.List className="tab-list">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'tab-button',
                  selected ? 'tab-button-selected' : 'tab-button-default'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="tab-panel">
              <p>{tab.content}</p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}

export default Home
