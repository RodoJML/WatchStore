import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllBrands, type BrandItem } from "../state/store/slice/brandsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";

export default function Brands(){

    const sessionState = useSelector((state: RootState) => state.session);
    const brandsState = useSelector((state: RootState) => state.brands);
    const dispatch = useDispatch<AppDispatch>();

    const [brands, setData] = useState<DataEnvelopeList<BrandItem>>();

    useEffect(() => {
        dispatch(getAllBrands()).then((res) => {
            setData(res.payload as DataEnvelopeList<BrandItem>)
        })
    }, []);
        
    return (
        <>
            {brandsState.isLoading && <div>Loading...</div>}


            <ul>
                {brands?.data.map((brand) => (
                    <li key={brand.brand_id}>
                        {brand.brand_name}
                    </li>
                ))}
            </ul>
        </>
    )


}