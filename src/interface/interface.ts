export interface AssetModel {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface Asset {
  id: number;
  name: string;
  image: string;
  assetModel: string;
  department: string;
  supplier: string;
  status: string;
  statusColor: string;
}

export interface RequestAsset {
  id: number;
  assetModel: string;
  date: string;
  status: string;
  note: string;
}

export enum RequestAssetStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}

export interface NewRequestAsset {
  assetModelId: number;
  note: string;
}

export enum Actions {
  CREATE,
  UPDATE,
  CLONE,
}
