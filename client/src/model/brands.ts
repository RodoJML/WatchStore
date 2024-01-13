import { apiFetch } from '../state/store/slice/sessionSlice';
import { api } from './fetch';
import type { DataEnvelopeList } from './fetch';

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo: string,
}

// export function getBrands(): Promise<DataEnvelopeList<BrandItem>>{
//     return apiFetch('/brands');
// }