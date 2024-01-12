import { useLoaderData } from "react-router-dom";
import { getBrands, type BrandItem } from "../model/brands";

export async function loader(){
    const brands = (await getBrands()).data;
    console.log(brands);
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