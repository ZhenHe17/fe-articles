import React from "react";
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";
import InsertPage from "./pages/Insert";
import Review from "./admin-pages/Review";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Community from "./pages/Community";
import axios from 'axios'

const history = createBrowserHistory()
axios.defaults.baseURL = `//${window.location.hostname}:80/api`

const App: React.FC = () => {
  return (
    <div className="root">
      <Router history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/community" component={Community} />
        <Route path="/articles/:category" component={Article} />
        <Route path="/recommendArticle" component={InsertPage} />
        <Route path="/admin/review" component={Review} />
      </Router>
    </div>
  );
};

export default App;
