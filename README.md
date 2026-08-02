# Shopping Cart Frontend Development Plan

This README is organized as a step-by-step development plan for the React shopping cart frontend.

## Phase 1: Setup Project

Goal: Initialize the project and verify the base app works.

Steps:
1. Create the project with Vite.
   ```bash
   npm create vite@latest ecommerce-ui -- --template react
   ```
2. Enter the project folder.
   ```bash
   cd ecommerce-ui
   ```
3. Install dependencies.
   ```bash
   npm install
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```
5. Verify the app loads in the browser.

> Confirm the default Vite React page appears before moving on.

---

## Phase 2: Add Routing

Goal: Add app navigation using React Router.

Steps:
1. Install React Router.
   ```bash
   npm install react-router-dom
   ```
2. Create a routing structure in `src/routes`.
3. Implement a layout component using `BrowserRouter`, `Routes`, and `Route`.
4. Add pages for `Home`, `Products`, and `Cart`.
5. Verify navigation works.

Example:
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
</BrowserRouter>
```

---

## Phase 3: Add Global State Management

Goal: Manage app state using Redux Toolkit.

Steps:
1. Install Redux Toolkit and React Redux.
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
2. Create `src/app/store.js` and `src/app/reducers.js`.
3. Add feature slices in `src/features/`:
   - `authSlice`
   - `cartSlice`
   - `productsSlice`
4. Wrap the app with Redux provider.
   ```jsx
   <Provider store={store}>
     <App />
   </Provider>
   ```
5. Test state updates using simple actions.

> Use Redux for local state such as cart contents and auth status.

---

## Phase 4: Add API Data Layer

Goal: Fetch server data using a centralized API client.

Steps:
1. Create `src/services/api.js`.
2. Use `axios` with a shared base URL.
3. Add a config constant in `src/config.js`.
4. Replace hard-coded URLs with the shared constant.

Example:
```js
import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default api
```

---

## Phase 5: Add Async Side Effects with Redux Saga

Goal: Replace thunks with saga-based async flows.

Steps:
1. Install Redux Saga.
   ```bash
   npm install redux-saga
   ```
2. Create `src/app/rootSaga.js` and connect saga middleware in `src/app/store.js`.
3. Add feature sagas:
   - `src/features/auth/authSaga.js`
   - `src/features/products/productsSaga.js`
4. Replace async thunks with request/success/failure actions.
5. Verify sagas respond to dispatched actions.

---

## Phase 6: Add UI Components with Headless UI

Goal: Use Headless UI for accessible interactive components.

Steps:
1. Install Headless UI.
   ```bash
   npm install @headlessui/react
   ```
2. Use `Disclosure`, `Menu`, `Tab`, and `Listbox` in layouts and pages.
3. Add minimal Tailwind-friendly CSS for Headless UI components.
4. Verify the UI interactions work.

---

## Phase 7: Add Styling with Tailwind CSS

Goal: Style the project with Tailwind utilities.

Steps:
1. Install Tailwind CSS and Vite plugin.
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```
2. Update `vite.config.js`.
3. Import Tailwind in `src/index.css`.
   ```css
   @import 'tailwindcss';
   ```
4. Apply utility classes and custom CSS as needed.

---

## Phase 8: Verify and Document

Goal: Confirm the app is stable and document setup.

Steps:
1. Run the development server.
   ```bash
   npm run dev
   ```
2. Confirm routes render correctly.
3. Confirm Redux state updates and sagas work.
4. Confirm API calls use `API_BASE_URL`.
5. Update this README with any project-specific notes.

> Keep this README as the working development plan and update it as the project evolves.


```bash
npm run dev
```

Test

```jsx
<h1 className="text-4xl font-bold text-blue-500">
Hello Tailwind
</h1>
```

---

# Phase 6: Install Headless UI

Headless UI works beautifully with Tailwind.

```bash
npm install @headlessui/react
```

Useful components

* Dialog
* Menu
* Listbox
* Popover
* Disclosure

Example

```
Confirmation dialog

Dropdown

Mobile navigation

User profile menu
```

---

## Alternative

If you prefer Material UI instead

```bash
npm install @mui/material @emotion/react @emotion/styled
```

For icons

```bash
npm install @mui/icons-material
```

I generally recommend **Tailwind + Headless UI** for an e-commerce application because it provides greater design flexibility and usually results in a smaller bundle than a heavily customized MUI setup.

---

# Phase 7: Install Axios

Although not in your list, you'll almost certainly need it.

```bash
npm install axios
```

Create

```
services/api.js
```

```javascript
const api = axios.create({
    baseURL: "http://localhost:8080"
});
```

---

# Phase 8: Authentication

After login

Store

```
JWT Token

Logged User

Role
```

inside Redux.

Example

```
Auth Slice

token

role

userId

email
```

---

# Phase 9: Frontend RBAC

Once authentication works, implement role-based access control.

Roles from backend

```
ADMIN

MANAGER

CUSTOMER
```

Redux example

```javascript
auth = {
    token,
    role,
    user
}
```

Conditional rendering

```jsx
{role === "ADMIN" && (
    <Button>Add Product</Button>
)}
```

Protected Route

```jsx
<ProtectedRoute role="ADMIN">
    <ProductManagement />
</ProtectedRoute>
```

Example implementation

```jsx
const ProtectedRoute = ({ role, children }) => {
    const userRole = useSelector(state => state.auth.role);

    if (userRole !== role)
        return <Navigate to="/unauthorized" />;

    return children;
};
```

---

# Suggested Project Structure

```
src/
│
├── app/
│      store.js
│
├── features/
│      auth/
│      cart/
│      user/
│
├── pages/
│      Home.jsx
│      Login.jsx
│      Products.jsx
│      Orders.jsx
│
├── components/
│      Navbar.jsx
│      Sidebar.jsx
│      Footer.jsx
│      ProductCard.jsx
│
├── layouts/
│      MainLayout.jsx
│      AdminLayout.jsx
│
├── routes/
│      ProtectedRoute.jsx
│      AppRoutes.jsx
│
├── services/
│      api.js
│      productService.js
│      authService.js
│
├── hooks/
│
├── utils/
│
└── styles/
```

---

# Recommended Installation Order

| Step | Technology           | Purpose                                        |
| ---- | -------------------- | ---------------------------------------------- |
| ✅ 1  | React (Vite)         | Base application                               |
| ✅ 2  | React Router v6      | Routing and layouts                            |
| ✅ 3  | Redux Toolkit        | Global client state (auth, cart, UI)           |
| ✅ 4  | React Query          | Server state and API caching                   |
| ✅ 5  | Tailwind CSS         | Styling framework                              |
| ✅ 6  | Headless UI (or MUI) | Accessible UI components                       |
| ✅ 7  | Axios                | HTTP client for Spring Boot API                |
| ✅ 8  | JWT Authentication   | Login and session handling                     |
| ✅ 9  | Frontend RBAC        | Role-based route protection and conditional UI |

This sequence lets you build on a stable foundation, testing each layer before introducing the next.

Since you're already building the **Spring Boot e-commerce backend**, this frontend stack is a modern, production-ready combination that aligns well with your existing APIs and will scale cleanly as you add features like product management, shopping cart, orders, and admin dashboards.
