import { api } from './session';
import type { DataEnvelopeList } from './fetch';

export interface BrandItem {
    brand_id: number,
    brand_name: string,
}

export function getBrands(): Promise<DataEnvelopeList<BrandItem>>{
    return api('/brands', null, 'GET', null);
}