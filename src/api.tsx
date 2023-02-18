const API_BASE_URL = process.env.REACT_APP_API_BASE_URL!;

interface TXTRecordDetails {
  name: string;
  value: string;
}

export enum OwnershipStatus {
  Pending = 'pending',
  Active  = 'active',
	Moved   = 'moved',
	Deleted = 'deleted',
	Blocked = 'blocked',
}

export enum SSLVerificationStatus {
  PendingValidation  = 'pending_validation',
	PendingIssuance    = 'pending_issuance',
	PendingDeployment  = 'pending_deployment',
	Active             = 'active',
	Deleted            = 'deleted',
	Initializing       = 'initializing',
}

export interface Domain {
  page: string;
  tokenID: string;
  hostname: string;
  ownershipStatus: OwnershipStatus;
  sslStatus: SSLVerificationStatus;
  txtRecordDetails: TXTRecordDetails | null;
}

export async function listAllDomains(account: string): Promise<Domain[]> {
  const url = `${API_BASE_URL}/domains/${account}`;
  console.log(url);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.domains as Domain[]);
}
