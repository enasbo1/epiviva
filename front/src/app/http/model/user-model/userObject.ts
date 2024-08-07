export interface UserObject extends UserRecap{
  id: number;
  prenom: string;
  nom: string;
  mail: string;
  status: string;
  num:string;
  id_address: number
}

export interface UserPost extends UserRecap {
  mdp: string;
}


export interface UserRecap{
  id?: number;
  prenom: string;
  nom: string;
  mail: string;
  status?: string;
  mdp?: string;
  num?:string;
  id_service?: number;
  id_secteur?: number;
  id_address?: number
}
