import { useEffect, useState } from 'react';
import { createSignedURL } from '../api';

const useSignedUrl = (wallet: string | undefined) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    createSignedURL(wallet).then((url) => setUrl(url));
  }, [wallet]);

  return url;
}

export default useSignedUrl;
