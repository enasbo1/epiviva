import {AddressObject} from "../address-model/addressObject";
import {SectorObject} from "../sector-model/sectorObject";
import {DistributeAffectedObject, DistributeSectorObject} from "../distribute-model/distributeObject";

export interface UserObject extends UserRecap{
  id: number|bigint;
  prenom: string;
  nom: string;
  mail: string;
  status: string;
  num:string;
}

export interface UserGivingObject extends UserLocatedObject{
  gift:number;
}

export interface UserVolunteerObject extends UserLocatedObject{
  status:string;
  num:string;
  distribute:DistributeSectorObject[];
}

export interface UserLocatedObject extends UserRecap{
  id: number|bigint;
  address:AddressObject;
}

export interface UserPatch extends UserMin{
  id: number|bigint;
}

export interface UserPost extends UserRecap {
  mdp: string;
}

export interface UserRecap extends UserMin{
  prenom: string;
  nom: string;
  mail: string;
}

export interface UserMin{
  id?: number|bigint;
  prenom?: string;
  nom?: string;
  mail?: string;
  status?: string;
  mdp?: string;
  num?:string;
  service_id?: number|bigint;
  benefit_id?: number|bigint;
  address_id?: number|bigint
}
