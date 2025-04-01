
import { Route,Routes } from 'react-router-dom'
import { Header } from './Components/layouts/Header/Header'
import { Footer } from './Components/layouts/Footer/Footer'
import { Home } from './Components/pages/Home/Home'
import { Login } from './Components/pages/Login/Login'
import { NotFound } from './Components/pages/NotFound/NotFound'






export const App = () => {

  return (
      <>
      <Header/>
          <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>

          </Routes>
        <Footer/>
      </>
  )
}
