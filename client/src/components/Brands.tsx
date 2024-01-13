import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { getAll } from "../state/store/slice/brandsSlice";
import { type BrandItem } from "../model/brands";
import { useEffect, useState } from "react";

export default function Brands(){

    const brands = useSelector((state: RootState) => state.brands);
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<BrandItem[]>([]);

    useEffect(() => {dispatch(getAll());}, []);
        
    return (
        <>
            {brands.isLoading && <div>Loading...</div>}           
        </>
    )


}