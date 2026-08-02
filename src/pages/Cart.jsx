import { Disclosure } from '@headlessui/react'

function Cart() {
  return (
    <section>
      <h2>Your Cart</h2>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="disclosure-button">
              {open ? 'Hide cart details' : 'Show cart details'}
            </Disclosure.Button>
            <Disclosure.Panel className="disclosure-panel">
              <p>Your selected items will appear here.</p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  )
}

export default Cart
