import { useEffect, useState } from "react";
import { step1form } from "../components/NewListingStep1";
import { BrandItem } from "../model/fetch";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { clear } from "console";

export default function NewListingStep2({ begin, step1form, sessionStatus }: { begin: boolean, step1form: step1form, sessionStatus: RootState["session"] }) {

    const [brand, setBrand] = useState({} as BrandItem);
    const [style, setStyle] = useState(false);
    const [brandStyle, setBrandStyle] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;

        if (begin) {
            timeout1 = setTimeout(() => { setActive(begin); }, 50);
            timeout3 = setTimeout(() => { setStyle(begin); }, 100);
            timeout2 = setTimeout(() => { setBrandStyle(begin); }, 300);
        }

        setBrand((sessionStatus.brands.find(brand => brand.brand_id == step1form.brand)!));

        return () => {clearTimeout(timeout1); clearTimeout(timeout2); clearTimeout(timeout3)}
       
    }, [step1form, begin])

    const woodDivBg = {
        backgroundImage: "url('/src/assets/images/woodbg.jpg')",
        backgroundSize: "cover",
    };


    return (
        <div className={`${active ? "visible" : "hidden"} absolute w-screen transition-all ease-in-out duration-700 p-3 ${style ? "right-0 " : "-right-full "}`}>

            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36">

                <div className={`absolute flex justify-center items-center w-full transition-right ease-in-out duration-1000 ${brandStyle ? "right-0" : "-right-full"}`}>
                    <div style={woodDivBg} className="flex justify-center items-center p-1 rounded-2xl shadow shadow-black h-20 w-1/2">
                        {brand?.brand_logo_path
                            ? <img className="h-full object-contain " src={brand?.brand_logo_path} alt="" />
                            : <i className="text-3xl text-stone-800 font-bold">{brand?.brand_name}</i>
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
                                    <div className="mr-2 font-bold text-lume-100 text-shadow shadow-lume-100">PUBLICAR</div>
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