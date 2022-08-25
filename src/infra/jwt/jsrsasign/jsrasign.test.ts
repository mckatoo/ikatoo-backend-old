import { randomUUID } from "crypto";

import { JwtSign } from "..";
import { jwtSign } from "./sign";
import { jwtDisassemble } from "./disassemble";
import { jwtVerify } from "./verification";

const generateFunction = async (options: JwtSign) => await jwtSign(options);

const disassembleFunction = async (token: string) => await jwtDisassemble(token);

const verificationFunction = async (token: string) => await jwtVerify(token);

describe("Jwt module", () => {
  it("Should generate valid token with valid input data", async () => {
    const token = await generateFunction({
      id: "testId",
      expireTime: 1000,
    });
    const disassembledToken = await disassembleFunction(token + 'crash');
    expect(token).toBeDefined();
    expect(disassembledToken).toHaveProperty("header");
    expect(disassembledToken).toHaveProperty("payload");
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

  it("Should validate token", async () => {
    const id = randomUUID();
    const token = await generateFunction({
      id,
      expireTime: 1000,
    });
    const validToken = await disassembleFunction(token);
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

  it("Should not validate a token with invalid data 'COUNTERFEIT'", async () => {
    const token = await generateFunction({
      id: "testId",
      expireTime: 1,
    });
    const isValid = await verificationFunction(token + "counterfeit_data");

    expect(isValid).toBe(false);
  });
});
