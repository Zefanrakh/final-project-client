import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import routes from "./routes";
import "./App.css";
import { setUserAction } from "./store/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = localStorage.access_token;
    if (access_token) {
      axios("http://localhost:3000/" + "/user/getdata", {
        method: "POST",
        headers: {
          access_token,
        },
      })
        .then((res) => {
          dispatch(setUserAction(res.data.user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map(({ path, component }, idx) => {
            return (
              <Route key={idx} path={path} exact>
                {component}
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
