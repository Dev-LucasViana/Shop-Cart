import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/product-details' element={ <ProductDetails /> } />
      </Routes>
    </>
  )
}

export default App
