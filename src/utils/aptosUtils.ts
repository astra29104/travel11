
import { Aptos, AptosConfig, Network, AccountAddress, InputSubmitTransactionData } from "@aptos-labs/ts-sdk";

// Initialize Aptos client
export const initializeClient = () => {
  const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  return new Aptos(aptosConfig);
};

// Format address for display (truncate middle)
export const formatAddress = (address: string | AccountAddress): string => {
  if (!address) return '';
  const addressStr = address instanceof AccountAddress ? address.toString() : address;
  return `${addressStr.slice(0, 6)}...${addressStr.slice(-4)}`;
};

// Format APT amount (convert from octas)
export const formatAptAmount = (amount: string | number): string => {
  if (!amount) return '0';
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return (value / 100000000).toFixed(4);
};

// Convert APT to octas (smallest unit)
export const aptToOctas = (amount: string | number): number => {
  if (!amount) return 0;
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return Math.floor(value * 100000000);
};

// Validate APT amount
export const isValidAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// Create transfer payload
export const createTransferPayload = (recipient: string, amount: string): InputSubmitTransactionData => {
  return {
    function: "0x1::coin::transfer",
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: [recipient, aptToOctas(amount)]
  };
};

// Fetch account resources (including balance)
export const fetchAccountResources = async (client: Aptos, address: string | AccountAddress) => {
  try {
    if (!address) return null;
    const accountAddress = address instanceof AccountAddress ? address : AccountAddress.fromString(address);
    const resources = await client.getAccountResources({ accountAddress });
    return resources;
  } catch (error) {
    console.error('Error fetching account resources:', error);
    return null;
  }
};

// Find APT balance from resources
export const getAptBalance = (resources: any[]): string => {
  if (!resources || !resources.length) return '0';
  
  const aptCoin = resources.find(
    (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
  );
  
  return aptCoin ? formatAptAmount(aptCoin.data.coin.value) : '0';
};

// Fetch account transactions
export const fetchAccountTransactions = async (client: Aptos, address: string | AccountAddress, limit: number = 10) => {
  try {
    if (!address) return [];
    const accountAddress = address instanceof AccountAddress ? address : AccountAddress.fromString(address);
    const transactions = await client.getAccountTransactions({
      accountAddress,
      options: { limit }
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    return [];
  }
};
