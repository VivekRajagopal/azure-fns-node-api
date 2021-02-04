import Ajv from "ajv";
import addFormats from "ajv-formats";
import { User } from "../users/model";
import { userSchema } from "./user.schema";

const ajv = new Ajv();
addFormats(ajv);

const userValidator = ajv.compile(userSchema);

export const validateAsUser = (data: object) => {
  if (userValidator(data)) {
    return data as User;
  }
};
