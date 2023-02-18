import { ContractTransaction, ethers } from 'ethers';
import RenotionAbi from '../artifacts/Renotion.abi.json';

type Provider = ethers.providers.Provider;
type Signer = ethers.Signer;

const RENOTION_CONTRACT = process.env.REACT_APP_RENOTION_CONTRACT!;

export async function getMinPrice(provider: Provider): Promise<string> {
  const contract = new ethers.Contract(RENOTION_CONTRACT, RenotionAbi, provider);

  const price = await contract.minPriceETH();
  return ethers.utils.formatEther(price);
}

export async function registerPage(page: string, domain: string, price: string, signer: Signer): Promise<ContractTransaction> {
  const contract = new ethers.Contract(RENOTION_CONTRACT, RenotionAbi, signer);

  const domainHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(domain)
  );

  const value = ethers.utils.parseEther(price);

  const tx = await contract.register(
    domainHash,
    domain,
    page,
    { value }
  );
  return tx;
}
