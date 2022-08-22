import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const displayName = localStorage.getItem('displayName')
    if (!displayName) {
      return <Navigate to="/login" replace />
    }
  
    return children
}

export default ProtectedRoute