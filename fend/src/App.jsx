import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Insights from './pages/Insights'
import LandingPage from './pages/LandingPage'

const App = () => {

  const [data, setData] = useState('')

  return (
    <div className="bg-[#ffffff] w-full flex flex-col min-h-screen relative">
      <BrowserRouter>
        <Nav />
        <main className="flex-1 pt-16 overflow-y-auto mt-2 sm:mt-4 mx-3 sm:mx-8 md:mx-20 lg:mx-38 xl:mx-48">
          <Routes>
            <Route path='/' element={<LandingPage setData={setData}/>}/>
            <Route path='/insights' element={<Insights data={data}/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App