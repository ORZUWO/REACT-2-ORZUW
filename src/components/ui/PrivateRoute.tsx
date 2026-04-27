import { Navigate } from "react-router-dom"
import { GetToken } from "../../utils/token"

const PrivateRoute = ({ children }: any) => {
  const token = GetToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute