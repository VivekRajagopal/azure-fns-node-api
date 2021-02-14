export type ValidateJwt =
  | {
      isValid: true;
      bindingParam: string;
      token: {
        payload: object;
      };
    }
  | { isValid: false };
