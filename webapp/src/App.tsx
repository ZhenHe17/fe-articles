import React from "react";
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Article from "./pages/Article";
import axios from 'axios'

const history = createBrowserHistory()
axios.defaults.baseURL = 'http://0.0.0.0:3000'

const App: React.FC = () => {
  return (
    <div className="root">
      <Router history={history}>
        <Route path="/" component={Article} />
        <Route path="/articles" component={Article} />
      </Router>
    </div>
  );
};

export default App;
