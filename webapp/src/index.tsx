import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'minireset.css';
import 'animate.css';
import Route, {publicPath} from './Route';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

axios.defaults.baseURL = `//${window.location.hostname}:${window.location.port}${publicPath}/api`

ReactDOM.render(<Route />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
