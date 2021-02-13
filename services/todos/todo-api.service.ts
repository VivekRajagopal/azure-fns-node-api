import { httpClient } from "../../host-services/http-client/http-client";

const apiBaseUrl = "https://jsonplaceholder.typicode.com";

const todosApiUrl = httpClient(apiBaseUrl).url("/todos");

export const getTodoAsync = (id: string) =>
  todosApiUrl.url(`/${id}`).get().json();

export const postTodoAsync = (todo: string) => todosApiUrl.post(todo).json();
