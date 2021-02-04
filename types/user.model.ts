import { either, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { formatValidationErrors } from "io-ts-reporters";

const DateFromString = new t.Type<Date, string, unknown>(
  "DateFromString",
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
    }),
  a => a.toISOString()
);

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

export type User = t.TypeOf<typeof TUser>;

export const validateUser = (value: unknown) => {
  return pipe(value, TUser.decode, mapLeft(formatValidationErrors));
};
