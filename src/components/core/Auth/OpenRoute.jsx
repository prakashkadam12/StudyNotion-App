// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  // agar token = null hai matlab user login hai toh hamne usko login,signup pages par jane de sakte hai
  // but aagar token = value hai means loggedin hai toh ye login,signup pages par kyon jane de tab usko directly dashboard par redirect kar denge
  
  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute;
