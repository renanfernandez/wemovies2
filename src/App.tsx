import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MovieProvider } from "./context/MoviesContext"
import Header from "./components/Header"
import { GlobalStyle } from "./styles/GlobalStyles"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import OrderCompleted from "./pages/OrderCompleted"

function App() {

  return (
    <MovieProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/carrinho' element={<Cart />} />
          <Route path='/pedido-finalizado' element={<OrderCompleted />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
