import { api } from './session';
import type { DataEnvelope, DataEnvelopeList } from './fetch';

export interface StyleItem {
    style_id: number,
    style_name: string,
}

export function getStyles(): Promise<DataEnvelopeList<StyleItem>>{
    return api('/brands');
}