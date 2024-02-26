import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../state/store/store";
import { mainForm } from "../pages/NewListing";
import { useEffect, useState } from "react";

export interface step3form {
    water_proof: number,
    description: string,
    price: number,
    quantity: number,
    warranty: number,
}

export default function NewListingStep3({ begin, mainForm, complete, sessionStatus }: { begin: boolean, mainForm: mainForm, complete: (form: step3form) => (void), sessionStatus: RootState["session"] }) {

    const [form, setForm] = useState({} as step3form);
    const [active, setActive] = useState(false);
    const [finished, setFinished] = useState(false);
    const [transition1, setTransition1] = useState(false);
    const [transition2, setTransition2] = useState(false);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;

        if (begin) {
            timeout1 = setTimeout(() => { setActive(begin) }, 50);
            timeout2 = setTimeout(() => { setTransition1(true) }, 100);
            timeout3 = setTimeout(() => { setTransition2(true) }, 800);
        }

    }, [begin])

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (finished) {
            timeout = setTimeout(() => { setActive(false) }, 1000);
        }

        return () => { clearTimeout(timeout) }

    }, [finished])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }


    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        setFinished(true);
        complete(form);
    }

    

    return (
        <div className={`${active ? "visible" : "hidden"} absolute w-screen p-3 transition-all ease-in-out duration-700 ${transition2 ? (finished ? " -left-full " : " left-0 ") : (transition1 ? " right-0 " : " -right-full ")}`}>
            <div className="flex justify-center text-white text-shadow-lg shadow-black text-center font-bold text-sm px-5 mt-4">
                Para una organización eficiente esta página cuenta con un sistema de "stock". Antes de publicar su reloj, este se incluira a su inventario.
            </div>

            <div className="flex justify-center h-52 opacity-60 animate-pulse my-6">
                <img src="/src/assets/images/stock.png" alt="" />
            </div>

            <div className="grid bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 text-white shadow shadow-black">


                <form className="grid gap-3" onSubmit={handleSubmit}>

                    <div className="grid grid-cols-3 gap-1 bg-black bg-opacity-40 px-2 py-1 rounded">
                        <div className="font-bold col-span-3">Datos de inventario</div>
                        <div className="col-span-1">Vendedor: </div>
                        <div className="col-span-2">{sessionStatus.user.user_name}</div>
                        <div className="col-span-1">Reloj: </div>
                        <div className="col-span-2">{mainForm.step1.brand} {mainForm.step2.model}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-black bg-opacity-40 p-1 rounded col-span-1">Condicion: </div>
                        <select className="p-1 rounded w-full text-stone-800 col-span-2" name="condition" id="condition" defaultValue="" onChange={handleSelectChange} required>
                            <option key={0} value="" disabled>Seleccionar</option>
                            <option key={1} value={1}>Nuevo</option>
                            <option key={2} value={2}>Usado</option>
                        </select>

                        <div className="bg-black bg-opacity-40 p-1 rounded col-span-1">Cantidad: </div>
                        <input type="number" placeholder="Cantidad" className="p-1 rounded w-full text-stone-800 col-span-2" min={1} pattern="[0-9]*" defaultValue={1} disabled={sessionStatus.user.user_type > 1} name="quantity" id="quantity" onChange={handleInputChange} required/>
                        {sessionStatus.user.user_type > 1 && <div className="col-span-3 text-xs text-shadow shadow-black text-center">Solo usuarios registrados con tienda pueden tener inventario de multiples items</div>}

                    </div>

                    <button type="submit" className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                        <div className="text-white">
                            <div className="flex items-center justify-center">
                                <div className="mr-2 font-bold text-white text-shadow">Siguiente</div>
                                <div><FontAwesomeIcon icon={faAngleRight} className="text-lume-100" /></div>
                            </div>
                        </div>
                    </button>


                </form>

            </div>
        </div>
    )
}