import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { apiFetch } from "../state/store/slice/sessionSlice";
import type { DataEnvelopeList, DataEnvelope, BrandItem } from "../model/fetch";
import { apiFetchCalls } from "../model/fetch";

export default function Brands(){

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const [brands, setData] = useState<DataEnvelopeList<BrandItem>>();

    useEffect(() => {
        dispatch(apiFetch(apiFetchCalls.brands.getOne(2))).then((res) => {
            setData(res.payload as DataEnvelopeList<BrandItem>)
        })
    }, []);
        
    return (
        <>
            {sessionState.isLoading && <div>Loading...</div>}


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