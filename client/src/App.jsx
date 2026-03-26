import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typography variant='h3' color='black'>
        Pokemon Party Picker
      </Typography>
    </>
  )
}

export default App
