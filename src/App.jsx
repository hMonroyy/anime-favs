import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimeItem from './Components/AnimeItem/AnimeItem'
import Header from './Components/Header/Header'

function App() {
  return (
    <>
      <BrowserRouter> 
        <div className="app">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/anime/:id/:title" element={<AnimeItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
