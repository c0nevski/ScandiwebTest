import { Switch, Route } from "react-router-dom";
import { KidsProducts, MenProducts, WomenProducts } from "./pages";
import { BoxedLayout } from "./layouts";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <BoxedLayout>
            <WomenProducts />
          </BoxedLayout>
        </Route>
        <Route path="/men">
          <BoxedLayout>
            <MenProducts />
          </BoxedLayout>
        </Route>
        <Route exact path="/kids">
          <BoxedLayout>
            <KidsProducts />
          </BoxedLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
