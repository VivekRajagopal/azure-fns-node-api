import { Either, getOrElseW } from "fp-ts/lib/Either";

export const id = <T>(x: T) => x;

export const flattenEither = <TLeft, TRight>(e: Either<TLeft, TRight>) =>
  getOrElseW<TLeft, TLeft>(id)(e);
