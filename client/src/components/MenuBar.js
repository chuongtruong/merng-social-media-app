import React, { useContext, useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import {Container} from "semantic-ui-react";
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';

function MenuBar() {

  const {user, logout} = useContext(AuthContext)
  
  // window.location.pathname will only return the path name, not the whole url
  // for example: http://localhost:3000/ -> pathname is "/"
  // for example: http://localhost:3000/login -> pathname is "/login"
  
  const pathName = window.location.pathname;
  // console.log(pathName);
  const path = pathName === '/' ? 'home' : pathName.substr(1)

  
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  //if there's a user, return a different menuBar, other a different menuBar
  const menuBar = user ? 
  (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={user.username}
        //this link is ACTIVE when const activeItem === "home"
        //activeItem is controlled by useState()
        active
        as={Link}
        to="/"
      />
  
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        //this link is ACTIVE when const activeItem === "home"
        //activeItem is controlled by useState()
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
  
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar;
}

export default MenuBar;


