import { useEffect, useState } from "react";
import { step1form } from "../components/NewListingStep1";
import { BrandItem } from "../model/fetch";
import { RootState } from "../state/store/store";

export default function NewListingStep2({ begin, step1form, sessionStatus }: { begin: boolean, step1form: step1form, sessionStatus: RootState["session"] }) {

    const [brand, setBrand] = useState({} as BrandItem);
    const [brandStyle, setBrandStyle] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (begin) {
            timeout = setTimeout(() => { setBrandStyle(true); }, 300);
        }

        setBrand((sessionStatus.brands.find(brand => brand.brand_id == step1form.brand)!));

        return () => clearTimeout(timeout);

    }, [step1form, begin])

    const woodDivBg = {
        backgroundImage: "url('/src/assets/images/woodbg.jpg')",
        backgroundSize: "cover",
    };


    return (
        <div className={`absolute w-screen transition-all ease-in-out duration-1000 p-3 ${begin ? "right-0" : "-right-full"}`}>

            <div className={`absolute flex justify-center items-center w-full transition-right ease-in-out duration-500 ${brandStyle ? "right-0" : "-right-full"}`}>
                <div style={woodDivBg} className="flex justify-center items-center p-1 rounded-2xl shadow shadow-black h-20 w-1/2">
                    {brand?.brand_logo_path
                        ? <img className="h-full object-contain " src={brand?.brand_logo_path} alt="" />
                        : <i className="text-3xl text-stone-800 font-bold">{brand?.brand_name}</i>
                    }
                </div>
            </div>

            <div className="h-24"></div>

            <div className="text-white text-shadow shadow-black">
                <div>
                    <span className="font-bold">Modelo: </span>
                    <span className="">Test </span>
                </div>

                <div>
                    <span className="font-bold">Certificación: </span>
                    <span>
                        {step1form.certification == 1 ? "Original"
                            : step1form.certification == 2 ? "AAA"
                                : step1form.certification == 3 ? "AA"
                                    : step1form.certification == 4 ? "A"
                                        : "Error"
                        }
                    </span>
                </div>

            </div>



            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36">

                <div className="grid grid-cols-2 gap-2">


                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                </div>

                <div className="col-span-2"> {step1form.certification}</div>

            </div>
        </div>
    )
}