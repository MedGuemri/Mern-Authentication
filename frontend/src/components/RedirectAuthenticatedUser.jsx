
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom'

const RedirectAuthenticatedUser = ({children}) => {
    const {isAuthenticated,user}=useAuthStore()
    if(isAuthenticated && user.isVerified){
        return <Navigate to={"/"} replace />
    }
  return children
}

export default RedirectAuthenticatedUser
