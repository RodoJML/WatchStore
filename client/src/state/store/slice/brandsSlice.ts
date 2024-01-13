import type { DataEnvelopeList, DataEnvelope } from '../../../model/fetch';
import { apiFetch } from "../slice/sessionSlice";

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo: string,
}

export function getBrands(): Promise<DataEnvelopeList<BrandItem>>{
    return apiFetch({url: '/brands'});

}