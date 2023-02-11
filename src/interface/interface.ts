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
  assetModel: string;
  department: string;
  supplier: string;
  status: string;
}

export interface RequestAsset {
  id: number;
  assetModel: string;
  date: string;
  status: string;
  note: string;
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
