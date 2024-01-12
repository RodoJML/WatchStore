import { useLoaderData } from "react-router-dom";
import { getBrands, type BrandItem } from "../model/brands";

export async function loader(){
    const brands = (await getBrands()).data;
    console.log(brands);
    return brands;
}

export default function WatchStyles(){

    const brands = useLoaderData() as BrandItem[];

    return(
        <>
        <span>
            {brands.map((brand) => (
                <div key={brand.brand_id}>
                    <span>{brand.brand_name}</span>
                </div>
            ))}
        </span>
        </>
    )
}