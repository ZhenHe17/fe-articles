import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'minireset.css';
import Route, {publicPath} from './Route';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

function getCookie(name: string) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if (arr) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

axios.defaults.baseURL = `//${window.location.hostname}:${window.location.port}${publicPath}/api`
axios.defaults.headers = {'x-csrf-token': getCookie("csrfToken")}
ReactDOM.render(<Route />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
