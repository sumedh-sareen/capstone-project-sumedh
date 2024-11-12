// importing files to the main index.js that is used for webpack
import App from "./js/app";
import { getCoords } from "./js/getCoords";
import { getWeatherForecast } from "./js/getWeatherForecast";
import './styles/style.scss';

export {App, getCoords, getWeatherForecast};