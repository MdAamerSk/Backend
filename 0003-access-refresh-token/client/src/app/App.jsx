import './App.css'
import { RouterProvider } from "react-router"
import routes from "./app.routes"
import AuthProvider from "../modules/auth/context/AuthProvider"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App