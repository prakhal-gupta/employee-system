import "./assets/css/constant.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RoutesHome from "./RoutesHome";
import {Layout} from "antd";
import ErrorBoundary from "./crashHandling/ErrorBoundary";

function App() {
  return (
      <Layout>
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route
                  path={"/login"}
                  render={(route) => <RoutesHome {...route} />}
              />
              <Route
                  path={"/"}
                  render={(route) => <RoutesHome {...route} />}
              />
            </Switch>
          </Router>
        </ErrorBoundary>
      </Layout>
  );
}

export default App;
