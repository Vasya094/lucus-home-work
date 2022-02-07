import React from "react"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/actions/authActions"

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  function logOut(e) {
      e.preventDefault()
      dispatch(logout())
  }
  
  return (
    <div
      style={{
        display: "flex",
        height: "110%",
        overflow: "scroll initial",
        position: "absolute",
      }}
    >
      <CDBSidebar textColor='#fff' backgroundColor='#333'>
        <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
          <a
            href='/'
            className='text-decoration-none'
            style={{ color: "inherit" }}
          >
            Lucus LAB
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            {userInfo ? (
              <div>
                <NavLink exact default to='/tables' activeClassName='activeClicked'>
                  <CDBSidebarMenuItem icon="th">
                    Data Table
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to='/gallery' activeClassName='activeClicked'>
                  <CDBSidebarMenuItem icon='image'>Gallery</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to='/todo' activeClassName='activeClicked'>
                  <CDBSidebarMenuItem icon='list'>Todo</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to='/login' onClick={logOut} activeClassName='activeClicked'>
                  <CDBSidebarMenuItem icon='user'>Log Out</CDBSidebarMenuItem>
                </NavLink>
              </div>
            ) : (
              <NavLink exact to='/login' activeClassName='activeClicked'>
                <CDBSidebarMenuItem icon='columns'>Login</CDBSidebarMenuItem>
              </NavLink>
            )}

            {/* <NavLink to='/signup' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='chart-line'>
              Sign Up
              </CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  )
}

export default Sidebar
