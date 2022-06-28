import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import RecipeCreated from "./components/RecipeCreated/RecipeCreated.jsx";
import Detail from "./components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/recipe/:id">
            <Detail />
          </Route>
          <Route path="/recipe">
            <RecipeCreated />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
