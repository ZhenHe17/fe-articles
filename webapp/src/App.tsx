import React from "react";
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Article from "./pages/Article";
import Home from "./pages/Home";
import axios from 'axios'

const history = createBrowserHistory()
axios.defaults.baseURL = `//${window.location.hostname}:80/api`

const App: React.FC = () => {
  return (
    <div className="root">
      <Router history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/articles/:category" component={Article} />
      </Router>
    </div>
  );
};

export default App;
