import { Domain } from './types/domain';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export async function listAllDomains(account: string): Promise<Domain[]> {
  const url = `${API_BASE_URL}/domains/${account}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.domains as Domain[]);
}
