import { RootState } from "../state/store/store";
import BrandsCarousel from "./BrandsCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export interface step1form {
    certification: number,
    brand: number,
    model: number,
}

export default function NewListingStep1({complete, sessionStatus}: {complete: (form: step1form) => (void), sessionStatus: RootState["session"]}) {

    const [form , setForm] = useState({certification: 0, brand: 0, model: 0} as step1form);
    const [finished, setFinished] = useState(false);
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <div className={`absolute w-screen p-3 transition-left ease-in-out duration-500 ${finished ? "-left-full" : "left-0"}`}>

            <BrandsCarousel />
            
            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36 mt-4">

                <div className="grid grid-cols-1 gap-4">

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="certification" id="certification" defaultValue={0} onChange={handleSelectChange}>
                        <option key="0" value="0" disabled>Certificación</option>
                        <option key="1" value="1">Original</option>
                        <option key="2" value="2">AAA</option>
                        <option key="3" value="3">AA</option>
                        <option key="4" value="4">A</option>
                    </select>

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="brand" id="brand" defaultValue={0} onChange={handleSelectChange}>
                        <option key="0" value="0" disabled>Marca</option>
                        {sessionStatus.brands.map((brand, index) => {
                            return <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                        })}
                    </select>

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none" name="model" id="model" defaultValue={0} disabled={sessionStatus.user.user_type > 1 || form.certification > 1 || form.certification < 1} onChange={handleSelectChange}>
                        <option key="0" value="0" disabled>Plantilla *</option>
                    </select>

                    <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black"
                        onClick={() => {setFinished(true), complete(form)}}>
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