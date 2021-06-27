import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            {routes.map(({ path, component }) => {
              return (
                <Route path={path} exact>
                  {component}
                </Route>
              );
            })}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
