import {AddressObject} from "../address-model/addressObject";

export interface SectorObject {
    id?: number|bigint;
    nom: string;
    address:AddressObject
}