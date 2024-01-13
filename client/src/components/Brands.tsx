import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { getAll } from "../state/store/slice/brandsSlice";
import { type BrandItem } from "../model/brands";
import { useEffect, useState } from "react";

export default function Brands(){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<BrandItem[]>([]);

    useEffect(() => {dispatch(getAll);}, []);
        
    return (
        <>
            {session.isLoading && <div>Loading...</div>}           
        </>
    )


}