
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import Routing_app from './poc/ProtectedRoute/Routing_app.jsx'
import User from './poc/useEffect/User.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <App />
    {/* <Routing_app></Routing_app> */}
    {/* <User></User> */}
    </BrowserRouter>

)
