import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './App.css';


import Mvc from './lib/mvc';

/*
if(typeof window.ccc === 'undefined')
{
	window.ccc = {}; // eslint-disable-line	
}

window.ccc.elementKey = 10000000000;
window.ccc.getKey = () =>{
	window.ccc.elementKey--;
	return window.ccc.elementKey;
};

window.ccc.require = (path) => {
	return require(path);
}
*/

ReactDOM.render(<Mvc />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
