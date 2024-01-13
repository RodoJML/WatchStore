import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch } from "../state/store/slice/sessionSlice";

export default function Brands(){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    dispatch(apiFetch( '/brands'));

    return <>Brands under construction</>

}