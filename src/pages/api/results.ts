// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DEMO_DATA } from './api_result';

export type Data = {
  Region: string;
  region: string;
  __name__: string;
  namespace: string;
  DistributionId: string;
  LoadBalancer?: undefined;
  NatGatewayId?: undefined;
  CacheClusterId?: undefined;
  CacheNodeId?: undefined;
  ClusterIdentifier?: undefined;
  BucketName?: undefined;
  StorageType?: undefined;
  VolumeId?: undefined;
};

type ReturnData = { results: Data[] };

export const getData = async () => {
  // Casting for demo purposes
  return { results: [...DEMO_DATA, ...DEMO_DATA] } as ReturnData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReturnData>) {
  const jsonData = await getData();
  res.status(200).json(jsonData);
}
