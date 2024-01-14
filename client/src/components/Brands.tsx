import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch } from "../state/store/slice/sessionSlice";
import { type BrandItem } from "../model/brands";
import { useEffect, useState } from "react";
import { setLoading } from "../state/store/slice/sessionSlice";
import { getAll } from "../state/store/slice/brandsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";


export default function Brands(){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const [brands, setData] = useState<DataEnvelopeList<BrandItem>>();

    useEffect(() => {
        dispatch(setLoading({value: true}));

        dispatch(
            getAll()).then((res) => {
                setData(res.payload as DataEnvelopeList<BrandItem>);
                console.log(brands?.data);
            }
        ).finally(() => {
            dispatch(setLoading({value: false}));
        })}, []);
        
    return (
        <>
            {session.isLoading && <div>Session Loading...</div>}


            {/* <ul>
                {brands?.items?.data.map((brand) => (
                    <li key={brand.brand_id}>
                        {brand.brand_name}
                    </li>
                ))}
            </ul> */}
        </>
    )


}