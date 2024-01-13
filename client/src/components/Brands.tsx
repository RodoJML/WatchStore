import { useLoaderData } from "react-router-dom";
import { getBrands, type BrandItem } from "../model/brands";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { setLoading } from "../state/store/slice/sessionSlice";
import { get } from "http";

export async function loader(){

    const brandItems = [] as BrandItem[];
    const dispatch = useDispatch();
    dispatch(setLoading({value: true}));

    getBrands().then((brands) => {
        brandItems.values = brands.data;
    }
    );

    // const session = useSelector((state: RootState) => state.session);
    


    // const brands = (await getBrands()).data;
    // console.log(brands);
    return brands;
}

export default function Brands(){

    const brands = useLoaderData() as BrandItem[];

    return(
        <>
        <span>
            ANYTHING
        </span>
        </>
    )
}