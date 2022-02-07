import React from "react"
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute({ component: Component, ...rest }) {
  const userLogin = useSelector( ( state ) => state.userLogin );
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={props => {
        return userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
