import customFetch from "./http-agent";
import wretch from "wretch";

(global as any).fetch = customFetch;

export const httpClient = (baseUrl: string) => wretch(baseUrl);
