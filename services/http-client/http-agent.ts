import * as https from "https";
import fetch from "node-fetch";

const agent = new https.Agent({ keepAlive: true, maxSockets: 300 });

const customFetch = (url: string, init?: RequestInit) => {
  const options = init ? { ...init, agent } : {};

  return fetch(url, options);
};

export default customFetch;
