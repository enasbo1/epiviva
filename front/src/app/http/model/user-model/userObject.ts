export interface UserObject extends UserRecap{
  id: number|bigint;
  prenom: string;
  nom: string;
  mail: string;
  status: string;
  num:string;
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
  id_service?: number|bigint;
  id_secteur?: number|bigint;
  id_address?: number|bigint
}
