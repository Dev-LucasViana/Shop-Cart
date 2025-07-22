import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import './App.css'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <ProductDetails /> } />
        <Route path='/checkout' element={ <Checkout /> } />
      </Routes>
    </>
  )
}

export default App
