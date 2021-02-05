import { Either, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { formatValidationErrors } from "io-ts-reporters";
import { DateFromString } from "../util/fp/io-ts.util";
import { User } from "./user.model";

const TName = t.type({
  firstName: t.string,
  middleName: t.union([t.string, t.undefined]),
  lastName: t.string,
  title: t.union([
    t.literal("Mr"),
    t.literal("Mrs"),
    t.literal("Ms"),
    t.literal("Dr")
  ])
});

const TUser = t.type({
  id: t.string,
  name: TName,
  dateOfBirth: DateFromString
});

export const validateUser = (value: unknown): Either<string[], User> => {
  return pipe(value, TUser.decode, mapLeft(formatValidationErrors));
};
