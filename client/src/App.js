import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

//need to destructure AuthContext from auth.js
import { AuthProvider } from "./context/auth";

// AuthRoute doesn't need to be destructured since it's the only fuction that was exported default from AuthRoute.js
import AuthRoute from './util/AuthRoute'


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
      {/* Container is from semantic UI */}
      <Container>
        {/* later <Container> will have to change to div className="ui container", because of semantic UI*/}
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} /> */}

          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;