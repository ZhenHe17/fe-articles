import React from "react";
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from "history";
import InsertPage from "./pages/Insert";
import Review from "./admin-pages/Review";
import Home from "./pages/Home";
import Community from "./pages/Community";

const history = createBrowserHistory()
export const publicPath = '/front-tech'

const App: React.FC = () => {
  const [isPC, setPC] = React.useState<boolean>(window.innerWidth > 1024)
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        setPC(window.innerWidth > 1024)
      }
    })
  })
  return (
    <div className={`root ${isPC ? 'pc' : 'mobile'}`}>
      <Router history={history}>
        <Switch>
          <Route path={`${publicPath}/`} exact component={Home} />
          <Route path={`${publicPath}/community`} component={Community} />
          <Route path={`${publicPath}/recommendArticle`} component={InsertPage} />
          <Route path={`${publicPath}/admin/review`} component={Review} />
          <Route exact path="/">
            <Redirect to={`${publicPath}/`} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
