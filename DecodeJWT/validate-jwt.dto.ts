export type ValidateJwt =
  | {
      isValid: true;
      token: {
        payload: object;
      };
    }
  | { isValid: false };
