import { Switch, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import "./App.scss";
import { CategoryPage } from "./pages";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <Switch>
          <Route exact path="/">
            <CategoryPage categoryName="WOMEN" />
          </Route>
          <Route path="/men">
          <CategoryPage categoryName="MEN" />
          </Route>
          <Route exact path="/kids">
          <CategoryPage categoryName="KIDS" />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
