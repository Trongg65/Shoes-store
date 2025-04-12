import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProductDetail from './components/PageDetails/ProductDetail'
import Login from './Components/Auth/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register'
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import Admin from './components/Admin/Admin'
import ManageUser from './components/Admin/Content/ManageUser'
import CartPage from './components/Cart/CartPage'
import ManageProduct from './components/Admin/Content/Product/ManageProduct'
import DashBoard from './components/Admin/Content/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DashBoard />
      },
      {
        path: "manage-users",
        element: <ManageUser />
      },
      {
        path: "manage-products",
        element: <ManageProduct />
      }
    ]
  },
  {
    path: "/cart",
    element: <CartPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
