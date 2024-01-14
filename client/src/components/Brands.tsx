import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch } from "../state/store/slice/sessionSlice";
import { type BrandItem } from "../model/brands";
import { useEffect, useState } from "react";
import { setLoading } from "../state/store/slice/sessionSlice";

export default function Brands(){

    const session = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<BrandItem[]>([]);

    useEffect(() => {
        dispatch(setLoading({value: true}));
        dispatch(apiFetch({url: '/brands'}))
        .then((res) => {console.log(res.payload)});
    }, []);
        
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