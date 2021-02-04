import { JSONSchemaType } from "ajv";
import { User } from "../users/model";

const nameSchema: JSONSchemaType<User["name"]> = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    middleName: { type: "string", nullable: true },
    lastName: { type: "string" },
    title: { type: "string" }
  },
  required: ["firstName", "lastName", "title"]
};

export const userSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { $ref: "object" },
    dateOfBirth: { type: "" }
  },
  required: ["id", "name", "dateOfBirth"]
};
