import '../dist/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

//Don't forget to add your API key 
filepicker.setKey("AN5RPjc1mSo6sUdsrGpCmz");

//Our views are rendered inside the #content div
ReactDom.render(
	Routes,
	document.getElementById("content")
);