import { Response } from "@azure/functions";
import { chainNullableK, fromNullable, toUndefined } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

const asResponse = (
  status: number,
  body?: any,
  contentType?: string
): Response => ({
  status,
  body,
  headers: pipe(
    contentType,
    fromNullable,
    chainNullableK(contentType => ({
      "content-type": contentType
    })),
    toUndefined
  )
});

export const okObject = (body: any) => asResponse(200, body);

export const unauthorized = () => asResponse(401);
export const badRequest = (body: any) => asResponse(400, body);
export const notFound = () => asResponse(404);
