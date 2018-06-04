// packages & scripts import
import express from "express";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import bodyParser from "body-parser";
import api from './routes';

// app declaration
const app = express();

// add middlewares to our express app
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api',api);
app.use(express.static(__dirname + '/../'));

// Main page routing
app.get('/', function(req, res) {
   res.send("Hello World!!");
});

// export the app
module.exports = app;
