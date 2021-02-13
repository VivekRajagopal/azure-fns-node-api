export * from "@azure/functions";
declare module "@azure/functions" {
  export interface Response {
    status: number;
    body?: any;
    headers?: {
      [key: string]: string;
    };
  }

  export interface TypedContext<TBindingData> extends Context {
    bindingData: TBindingData;
  }
}
