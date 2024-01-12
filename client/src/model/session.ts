import * as Fetch from './fetch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store/store';
import { addMessage, setLoading } from '../state/store/slice/sessionSlice';



export function api(url: string, data?: any, method?: string, headers?: any){
    
    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();

    dispatch(setLoading({ value: true }));
    console.log(session);

    return Fetch.rest(url, data, method, headers)
    .catch(
        error => 
        {
            console.error({ error });
            () => dispatch(addMessage({ message: error.message ?? JSON.stringify, type: 'danger'}));
        }
    )
    .finally(
        () => {
            dispatch(setLoading({ value: false }));
            console.log(session);
        }
        
    );

}