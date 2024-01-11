import { api } from './session';
import type { DataEnvelope, DataEnvelopeList } from './fetch';
import { useSession } from './session';

const session = useSession();

export interface Style {
    id: number,
    name: string,
}

export function getStyles(): Promise<DataEnvelopeList<Style>> {
    return api('/styles');
}