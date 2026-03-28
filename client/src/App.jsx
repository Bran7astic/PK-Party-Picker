import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ThemeProvider, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import AddPkmn from './pages/AddPkmn'
import { theme } from './theme.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/add" element={<AddPkmn/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
