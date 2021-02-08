import { httpClient } from "./http-client";

const apiBaseUrl = "https://jsonplaceholder.typicode.com";

const externalApi = httpClient(apiBaseUrl).url("/todos");

export const getTodoAsync = (id: string) =>
  externalApi.url(`/${id}`).get().json();

export const postTododAsync = (todo: string) => externalApi.post(todo).json();
