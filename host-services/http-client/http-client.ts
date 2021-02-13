import fetchWithCustomAgent from "./http-agent";
import wretch from "wretch";

(global as any).fetch = fetchWithCustomAgent; // https://github.com/elbywan/wretch#nodejs

export const httpClient = (baseUrl: string) => wretch(baseUrl);
