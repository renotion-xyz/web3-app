import { formatEther } from 'viem';
import { OwnershipStatus, SSLVerificationStatus } from './types/domain';

export function sslStatusInfo(status: SSLVerificationStatus): { color: string, text: string } {
  switch (status) {
    case SSLVerificationStatus.Active:
      return { text: 'Active', color: 'success' };
    case SSLVerificationStatus.Deleted:
    case SSLVerificationStatus.ValidationTimedOut:
      return { text: 'Deleted', color: 'danger' };
    case SSLVerificationStatus.Initializing:
      return { text: 'Initializing', color: 'info' };
    case SSLVerificationStatus.PendingDeployment:
    case SSLVerificationStatus.PendingIssuance:
    case SSLVerificationStatus.PendingValidation:
      return { text: 'Pending', color: 'warning' };
  }
}

export function ownershipStatusInfo(status: OwnershipStatus): { color: string, text: string } {
  switch (status) {
    case OwnershipStatus.Active:
      return { text: 'Active', color: 'success' };
    case OwnershipStatus.Blocked:
      return { text: 'Blocked', color: 'danger' };
    case OwnershipStatus.Deleted:
      return { text: 'Deleted', color: 'danger' };
    case OwnershipStatus.Moved:
      return { text: 'Moved', color: 'warning' };
    case OwnershipStatus.Pending:
      return { text: 'Pending', color: 'warning' };
  }
}

export function cnameFromHostname(hostname: string): string {
  const components = hostname.split('.').slice(0, -2);
  if (components.length === 0) {
    return '@';
  } else {
    return components.join('.');
  }
}

export function pageIdFromUrl(pageUrl: string): string {
  const components = pageUrl.split('-');
  return components.pop()!.slice(-32);
}

export function shorten(text: string, maxLength: number = 12): string {
  if (text.length < maxLength) {
    return text;
  } else {
    return `${text.slice(0, maxLength/2)}...${text.slice(-maxLength/2)}`;
  }
}

export function formatEtherPretty(value: bigint): string {
  return parseFloat(formatEther(value)).toFixed(4);
}
