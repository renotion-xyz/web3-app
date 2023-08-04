import { Domain } from './types/domain';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const NODE_ENV = process.env.NODE_ENV;

export async function listAllDomains(account: string): Promise<Domain[]> {
  const url = `${API_BASE_URL}/domains/${account}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.domains as Domain[]);
}

export async function createSignedURL(wallet: string | undefined): Promise<string> {
  if (NODE_ENV === 'production') {
    // FIXME: maybe I get a MoonPay production key some day
    return 'https://www.moonpay.com/en-gb/buy/matic';
  }

  const url = `${API_BASE_URL}/moonpay/signed-url`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ wallet }),
  })
    .then((res) => res.json())
    .then((data) => data.url as string);
}
