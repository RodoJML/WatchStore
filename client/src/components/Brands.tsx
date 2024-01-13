import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch } from "../state/store/slice/sessionSlice";
import { type BrandItem } from "../model/brands";
import { useEffect, useState } from "react";

export default function Brands(){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<BrandItem[]>([]);

    useEffect(() => {
        console.log(dispatch(apiFetch('/brands')));
    }, []);
        
    return <>Brands under construction</>

}