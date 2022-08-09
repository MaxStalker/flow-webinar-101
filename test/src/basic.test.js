import path from "path";
import {
  emulator,
  init,
  getAccountAddress,
  deployContractByName,
  getContractAddress,
  shallPass,
  shallResolve,
  executeScript,
  sendTransaction,
} from "@onflow/flow-js-testing";
import { getMessages, initAccount, signYearbook } from "./helpers";

// Increase timeout if your tests failing due to timeout
jest.setTimeout(10000);

describe("basic", () => {
  beforeEach(async () => {
    const base = path.resolve(__dirname, "../../cadence");
    const logging = false;
    const port = 8080;

    await init(base);
    return emulator.start(port, { logging });
  });

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop();
  });

  test("should deploy YearbookMinter", async () => {
    await shallPass(deployContractByName({ name: "YearbookMinter" }));

    // We should be able to read "allowedMessages" field of the contract
    const [allowedMessages] = await executeScript({
      code: `
            import YearbookMinter from 0x01

            pub fun main():{String:String}{
                return YearbookMinter.allowedMessages
            }
        `,
    });
    expect(allowedMessages).not.toBe(null);
  });

  test("fresh account should not have Yearbook in possesion", async () => {
    await deployContractByName({ name: "YearbookMinter" });

    const [, err] = await getMessages("Alice");

    const haveError = err
      .toString()
      .includes(`Your account does not have Yearbook in it's storage`);
    expect(haveError).toBe(true);
  });

  test("should init Alice's account with Yearbook resource", async () => {
    await deployContractByName({ name: "YearbookMinter" });
    await initAccount("Alice");
    const messages = await getMessages("Alice");
    expect(messages).not.toBe(null);
  });

  test("Users should be able to left message in Alice's Yearbook", async () => {
    await deployContractByName({ name: "YearbookMinter" });
    await initAccount("Alice");
    await initAccount("Bob");
    await initAccount("Charlie");

    await signYearbook("Alice", "Bob", "sup");
    await signYearbook("Alice", "Charlie", "cya");

    const [messages, err] = await getMessages("Alice");
    console.log(messages);
    const keys = Object.keys(messages)
    expect(keys.length).toBe(2)
    console.log({messages})
  });
});
