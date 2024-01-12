import { api } from './session'
import type { DataEnvelope, DataEnvelopeList } from '../model/fetch'

export interface StyleItem {
    id: number,
    name: string,
}

export function getStyles(): Promise<DataEnvelopeList<StyleItem>> {
    return api('/brands', null, 'GET', null)
}

