import { Switch, Route } from "react-router-dom";
import { CategoryPage } from "./pages";
import { BoxedLayout } from "./layouts";
import "./App.scss";

// MOCK PRODUCT DATA
const products = [
  { id:1, name: "product 1", price: "$50.00", image: "https://via.placeholder.com/300" },
  { id:2, name: "product 2", price: "$50.00", image: "https://via.placeholder.com/300" },
  { id:3, name: "product 3", price: "$50.00", image: "https://via.placeholder.com/300" },
  { id:4, name: "product 4", price: "$50.00", image: "https://via.placeholder.com/300" },
  { id:5, name: "product 5", price: "$50.00", image: "https://via.placeholder.com/300" },
  { id:6, name: "product 6", price: "$50.00", image: "https://via.placeholder.com/300" }
];

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <BoxedLayout>
            <CategoryPage categoryName="WOMEN" products={products}/>
          </BoxedLayout>
        </Route>
        <Route path="/men">
          <BoxedLayout>
            <CategoryPage categoryName="MEN" products={products}/>
          </BoxedLayout>
        </Route>
        <Route exact path="/kids">
          <BoxedLayout>
            <CategoryPage categoryName="KIDS" products={products}/>
          </BoxedLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
