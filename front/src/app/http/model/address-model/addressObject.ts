export interface AddressObject extends AddressMin {
    address: string;
    postal_code: string;
    instruction: string;
    city: string;
    kind: string;
}

export interface AddressMin {
    id?: number|bigint;
    address?: string;
    postal_code?: string;
    instruction?: string;
    city?: string;
    kind?: string;
    id_sector?: number | bigint;
}