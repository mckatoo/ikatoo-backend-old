import { randomUUID } from "crypto";

import { JwtSign } from "..";
import { jwtSign } from "./sign";
import { jwtValidate } from "./validate";
import { jwtVerify } from "./verification";

const generateFunction = async (options: JwtSign) => await jwtSign(options);

const validateFunction = async (token: string) => {
  const result = await jwtValidate(token);
  return result || false;
};

const verificationFunction = async (token: string) => await jwtVerify(token);

describe("Jwt module", () => {
  it("Should generate valid token with valid input data", async () => {
    const token = await generateFunction({
      id: "testId",
      expireTime: 1000,
    });
    const isValid = await validateFunction(token);

    expect(token).toBeDefined();
    expect(isValid).not.toBe(false);
  });

  it("Should not generate valid token with invalid input data", async () => {
    const token = generateFunction({
      expireTime: -3434,
      id: "testId",
    });

    await expect(token).rejects.toThrowError(
      "Expire Time should be greater than current time."
    );
  });

  it("Should validate token with id", async () => {
    const id = randomUUID();
    const token = await generateFunction({
      id,
      expireTime: 1000,
    });
    const validToken = await validateFunction(token);
    const payload = JSON.parse(JSON.stringify(validToken.payload));

    expect(payload.jti).toBe(id);
  });

  it("Should not validate token with time expired", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    const token = await generateFunction({
      id: "testId",
      expireTime: 1,
    });

    setTimeout(async () => {
      const isValid = await verificationFunction(token);

      expect(isValid).toBe(false);
    }, 2000);
  });

  it("Should not validate token with invalid data", async () => {
    const token = await generateFunction({
      id: "testId",
      expireTime: 1,
    });
    const isValid = await verificationFunction(token + 'invalid');

    expect(isValid).toBe(false);
  })
});
