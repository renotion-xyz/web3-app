import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useReducer } from 'react';
import { useAccount } from 'wagmi';
import { listAllDomains } from '../api';

import { Domain } from '../types/domain';

type ReloadCallback = (account: string) => Promise<void>
type DomainsContextType = {
  domains?: Domain[],
  setNeedsReloadDomains: ReloadCallback
};

const DomainsContext = createContext<DomainsContextType|null>(null);

enum ActionType {
  Reset,
  Update
}

interface Action {
  type: ActionType;
  payload?: Domain[];
}

function domainsReducer(state: any, action: Action): Domain[] | undefined {
  switch (action.type) {
    case ActionType.Update:
      return action.payload;
    case ActionType.Reset:
      return undefined;
  }
}

export function DomainsProvider(props: PropsWithChildren) {
  const { address } = useAccount();
  const [domains, dispatch] = useReducer(domainsReducer, undefined);

  const setNeedsReloadDomains = useCallback(async (account: string) => {
    dispatch({
      type: ActionType.Reset
    });
    const domains = await listAllDomains(account);
    dispatch({
      type: ActionType.Update,
      payload: domains,
    });
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }
    setNeedsReloadDomains(address);
  }, [address, setNeedsReloadDomains]);

  return (
    <DomainsContext.Provider value={{ domains, setNeedsReloadDomains }}>
      {props.children}
    </DomainsContext.Provider>
  );
}

export function useDomains(): DomainsContextType {
  return useContext(DomainsContext)!;
}
