import { validateUser } from "../../SaveToCosmos/dtos/user-create-request.dto";
import * as E from "fp-ts/Either";
import { assert } from "../util/typed-assert";

describe.only("user-request-dto", () => {
  it("successfully decodes a valid user-request-dto", () => {
    const userRequest = {
      name: {
        firstName: "Jane",
        lastName: "Doe",
        title: "Ms"
      },
      dateOfBirth: "2000-01-01"
    };

    const actualValidationResult = validateUser(userRequest);

    assert(E.isRight, actualValidationResult);

    expect(actualValidationResult.right).toMatchObject({
      name: {
        firstName: "Jane",
        lastName: "Doe",
        title: "Ms"
      },
      dateOfBirth: new Date("2000-01-01")
    });
  });

  it("unsuccessfully decodes an invalid user-request-dto with missing name.title", () => {
    const userRequest = {
      name: {
        firstName: "Jane",
        lastName: "Doe"
      },
      dateOfBirth: "2000-01-01"
    };

    const actualValidationResult = validateUser(userRequest);

    assert(E.isLeft, actualValidationResult);

    expect(actualValidationResult.left.length).toBe(1);
  });

  it("unsuccessfully decodes an invalid user-request-dto with invalid dateOfBirth string", () => {
    const userRequest = {
      name: {
        firstName: "Jane",
        lastName: "Doe",
        title: "Dr"
      },
      dateOfBirth: "invalid-date-string"
    };

    const actualValidationResult = validateUser(userRequest);

    assert(E.isLeft, actualValidationResult);

    expect(actualValidationResult.left.length).toBe(1);
  });
});
