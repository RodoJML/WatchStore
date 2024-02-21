import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import BrandsCarousel from "./BrandsCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function NewListingStep1() {

    interface setp1form {
        certification: number,
        brand: number,
        model: number,
    }

    const [step1Form, setStep1Form] = useState({} as setp1form);
    const [step1finished, setStep1Finished] = useState(false);
    const sessionState = useSelector((state: RootState) => state.session);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStep1Form({ ...step1Form, [name]: value });
    }

    useEffect(() => {
    }, [step1Form])

    return (
        <div className={`absolute w-screen p-3 transition-left ease-in-out duration-500 ${step1finished ? "-left-full" : "left-0"}`}>

            <BrandsCarousel />

            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36 mt-4">

                <div className="grid grid-cols-1 gap-4">

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="certification" id="certification" defaultValue={"0"}>
                        <option key="0" value="0" disabled>Certificación</option>
                        <option key="1" value="1">Original</option>
                        <option key="2" value="2">AAA</option>
                        <option key="3" value="3">AA</option>
                        <option key="4" value="4">A</option>
                    </select>

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="brand" id="brand" defaultValue={"777"}>
                        <option key="777" value="777" disabled>Marca</option>
                        {sessionState.brands.map((brand, index) => {
                            return <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                        })}
                    </select>

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="model" id="model" defaultValue={"777"} disabled={sessionState.user.user_type > 1 || step1Form.certification === 0}>
                        <option key="777" value="777" disabled>Pantilla *</option>
                    </select>

                    <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black"
                        onClick={() => setStep1Finished(true)}>
                        <div className="text-white">
                            <div className="flex items-center justify-center">
                                <div className="mr-2 font-bold">Siguiente</div>
                                <div><FontAwesomeIcon icon={faAngleRight} className="text-lume-100" /></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="text-white text-2xs mt-5 font-bold text-shadow shadow-black text-center sm:mx-36">
                * Plantilla permite la creación de una publicación con las caracteristicas del reloj autopopuladas en base al modelo. Disponible solo para relojes originales y usuarios con tienda registrada.
            </div>

        </div>
    )
}