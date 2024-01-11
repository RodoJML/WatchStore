import { api } from './session';
import type { DataEnvelope, DataEnvelopeList } from './fetch';
import Session  from './session';

const session = Session().session;

export interface Style {
    id: number,
    name: string,
}

export function getStyles(): Promise<DataEnvelopeList<Style>> {
    return api('/styles');
}