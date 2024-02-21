import { useEffect, useState } from "react";
import { step1form } from "../components/NewListingStep1";
import { BrandItem } from "../model/fetch";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

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

            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36">

                <div className={`absolute flex justify-center items-center w-full transition-right ease-in-out duration-1000 ${brandStyle ? "right-0" : "-right-full"}`}>
                    <div style={woodDivBg} className="flex justify-center items-center p-1 rounded-2xl shadow shadow-black h-20 w-1/2">
                        {brand?.brand_logo_path
                            ? <img className="h-full object-contain " src={brand?.brand_logo_path} alt="" />
                            : <i className="text-lg text-stone-800 font-bold">{brand?.brand_name}</i>
                        }
                    </div>
                </div>
                <div className="h-20"></div>


                <div className="grid grid-cols-2 gap-2 mt-4">

                    <div className="flex justify-center items-center col-span-2 bg-black bg-opacity-30 p-1 rounded">
                        <span className="">
                            {step1form.certification == 1 ? "Original"
                                : step1form.certification == 2 ? "AAA"
                                    : step1form.certification == 3 ? "AA"
                                        : step1form.certification == 4 ? "A"
                                            : "Error"
                            }
                        </span>

                        <span className="mx-3">|</span>

                        <span className="overflow-scroll">Test</span>
                    </div>


                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>
                    <div className="bg-black bg-opacity-30 p-1 rounded">test</div>

                    <div className="col-span-2">
                        <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                            <div className="text-white">
                                <div className="flex items-center justify-center">
                                    <div className="mr-2 font-bold text-lume-100">P U B L I C A R</div>
                                    <div><FontAwesomeIcon icon={faCheckDouble} className="text-lume-100"/></div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>



            </div>
        </div>
    )
}