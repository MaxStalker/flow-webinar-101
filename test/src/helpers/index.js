import {
  getAccountAddress,
  sendTransaction,
  executeScript,
  shallPass,
} from "@onflow/flow-js-testing";

export const initAccount = async (accountName) => {
  const account = await getAccountAddress(accountName);
  return shallPass(
    sendTransaction({ name: "init-account", signers: [account], limit: 999 })
  );
};

export const getMessages = async (accountName) => {
  const account = await getAccountAddress(accountName);
  return executeScript({ name: "get-messages", args: [account] });
};

export const signYearbook = async (ownerName, signerName, key) => {
  const ownerAddress = await getAccountAddress(ownerName);
  const signerAddress = await getAccountAddress(signerName);
  const name = "sign-yearbook";
  const args = [ownerAddress, key];
  const signers = [signerAddress];
  const limit = 999;

  return shallPass(sendTransaction({ name, args, signers, limit }));
};
