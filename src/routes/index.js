import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
