export interface AddressObject {
    id?: number|bigint;
    address: string;
    postal_code: string;
    instruction: string;
    kind: string;
    id_secteur?: number | bigint;
}