import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RoomProvider } from "./context/RoomContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoomProvider>
    <App />
    </RoomProvider>
  </StrictMode>,
)
