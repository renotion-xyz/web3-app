export interface TXTRecordDetails {
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