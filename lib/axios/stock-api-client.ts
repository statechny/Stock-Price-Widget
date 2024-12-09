import axios from 'axios';

const alphaVantageUrl = 'https://www.alphavantage.co';

export const stockApiClient = axios.create({ baseURL: alphaVantageUrl });
