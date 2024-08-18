export interface AddressObject extends AddressMin {
    address: string;
    postal_code: string;
    instruction: string;
    kind: string;
}

export interface AddressMin {
    id?: number|bigint;
    address?: string;
    postal_code?: string;
    instruction?: string;
    kind?: string;
    id_secteur?: number | bigint;
}