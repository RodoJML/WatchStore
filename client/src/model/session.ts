import { useDispatch, useSelector } from 'react-redux';
import * as Fetch from './fetch';
import { RootState } from '../state/store/store';
import { addMessage, setLoading } from '../state/store/slice/sessionSlice';

export default function api(url: string, data?: any, method?: string, headers?: any){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();

    dispatch(setLoading({ value: true }));

    return Fetch.api(url, data, method, headers)
    .catch(
        error => 
        {
            console.error({ error });
            () => dispatch(addMessage({ message: error.message ?? JSON.stringify, type: 'danger'}));
        }
    )
    .finally(
        () => {
            () => dispatch(setLoading({ value: false }));
        }
    );
}