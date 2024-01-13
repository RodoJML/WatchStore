import { useLoaderData } from "react-router-dom";
import { getBrands, type BrandItem } from "../model/brands";
import { useEffect } from "react";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default function Brands(){
    return <>Brands under construction</>

}