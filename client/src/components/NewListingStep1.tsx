import { RootState } from "../state/store/store";
import BrandsCarousel from "./BrandsCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export interface step1form {
    certification: number,
    brand: number,
    model: number,
}

export default function NewListingStep1({ complete, sessionStatus }: { complete: (form: step1form) => (void), sessionStatus: RootState["session"] }) {

    const [hide, setHide] = useState(false);
    const [form, setForm] = useState({ certification: 0, brand: 0, model: 0 } as step1form);
    const [finished, setFinished] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        setFinished(true);
        complete(form);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (finished) {
            timeout = setTimeout(() => { setHide(true) }, 1000);
        }

        return () => { clearTimeout(timeout) }

    }, [finished])

    return (
        <div className={`${hide ? "hidden" : "visible"} absolute w-screen p-3 transition-left ease-in-out duration-500 ${finished ? "-left-full" : "left-0"}`}>

            <BrandsCarousel />

            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36 mt-4">

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none font-bold" name="certification" id="certification" defaultValue="" onChange={handleSelectChange} required>
                        <option key={0} value="" disabled>Certificación</option>
                        <option key={1} value={1}>Original</option>
                        <option key={2} value={2}>AAA</option>
                        <option key={3} value={3}>AA</option>
                        <option key={4} value={4}>A</option>
                    </select>

                    <select className="rounded bg-black bg-opacity-20 p-2 appearance-none font-bold" name="brand" id="brand" defaultValue="" onChange={handleSelectChange} required>
                        <option key={0} value="" disabled>Marca</option>
                        {sessionStatus.brands.map((brand, index) => {
                            return <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                        })}
                    </select>

                    <select className={`rounded bg-black bg-opacity-20 p-2 appearance-none font-bold ${(sessionStatus.user.user_type > 1 || (form.certification > 1 || form.certification < 1)) && "text-gray-300"}`} name="template" id="template" defaultValue={0} disabled={sessionStatus.user.user_type > 1 || (form.certification > 1 || form.certification < 1)} onChange={handleSelectChange}>
                        <option key="0" value="0" disabled>Plantilla</option>
                        {/* TO BE CODED */}
                    </select>

                    <div className="text-white text-2xs text-shadow shadow-black text-center">
                    Plantillas facilita la publicación auto-completando toda la info de su reloj en base al modelo. Disponible solo para relojes originales y usuarios con tienda registrada. 
                    </div>

                    <button type="submit" className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                        <div className="text-white">
                            <div className="flex items-center justify-center">
                                <div className="mr-2 font-bold">Siguiente</div>
                                <div><FontAwesomeIcon icon={faAngleRight} className="text-lume-100" /></div>
                            </div>
                        </div>
                    </button>

                </form>
            </div>



        </div>
    )
}