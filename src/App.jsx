import { Switch, Route } from "react-router-dom";
import "./App.scss";

// MOCK PRODUCT DATA
// const products = [
//   { id:1, name: "product 1", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:2, name: "product 2", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:3, name: "product 3", price: "$50.00", inStock: false, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:4, name: "product 4", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:5, name: "product 5", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:6, name: "product 6", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
//   { id:7, name: "product 7", price: "$50.00", inStock: false, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" }
// ];

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <h1>WOMEN CATEGORY</h1>
        </Route>
        <Route path="/men">
          <h1>MEN CATEGORY</h1>
        </Route>
        <Route exact path="/kids">
          <h1>KIDS CATEGORY</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
