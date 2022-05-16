import { ReactNode } from 'react';
import { Data } from '@/pages/api/results';

type ItemType = {
  item: Data;
};

const RowItem = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      border: '1px solid #000',
      wordBreak: 'break-all',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    {children}
  </div>
);

export const Row = ({ item }: ItemType) => {
  return (
    <>
      <RowItem>{item?.Region}</RowItem>
      <RowItem>{item?.region}</RowItem>
      <RowItem>{item?.__name__}</RowItem>
      <RowItem>{item?.namespace}</RowItem>
      <RowItem>{item?.DistributionId}</RowItem>
      <RowItem>{item?.LoadBalancer}</RowItem>
      <RowItem>{item?.NatGatewayId}</RowItem>
      <RowItem>{item?.CacheClusterId}</RowItem>
      <RowItem>{item?.CacheNodeId}</RowItem>
      <RowItem>{item?.ClusterIdentifier}</RowItem>
      <RowItem>{item?.BucketName}</RowItem>
      <RowItem>{item?.StorageType}</RowItem>
      <RowItem>{item?.VolumeId}</RowItem>
    </>
  );
};
