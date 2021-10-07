import { Switch, Route } from "react-router-dom";
import { CategoryPage } from "./pages";
import { BoxedLayout } from "./layouts";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <BoxedLayout>
            <CategoryPage categoryName="WOMEN" />
          </BoxedLayout>
        </Route>
        <Route path="/men">
          <BoxedLayout>
            <CategoryPage categoryName="MEN" />
          </BoxedLayout>
        </Route>
        <Route exact path="/kids">
          <BoxedLayout>
            <CategoryPage categoryName="KIDS" />
          </BoxedLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
