import axios from "axios";

const ROOT_URL = "https://api.coinmarketcap.com/v2/ticker/";
export const FETCH_CRYPTO_DATA = "FETCH_CRYPTO_DATA";

export function fetchCryptoData() {
  const request = axios.get(ROOT_URL);
  return {
    type: FETCH_CRYPTO_DATA,
    payload: request
  };
}
