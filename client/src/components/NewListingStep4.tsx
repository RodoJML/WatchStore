import { useEffect, useState } from "react";
import { RootState } from "../state/store/store";
import { mainForm } from "../pages/NewListing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faCalendarCheck, faCertificate, faCheckDouble, faColonSign, faDollarSign, faFileArrowUp, faImage, faPen, faPhone, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNotification } from "../state/store/slice/sessionSlice";

export interface step4form {
    date: Date,
    description: string,
    cprice: number,
    dprice: number,
    warranty: number,
}

export default function NewListingStep4({ begin, mainForm, complete, sessionStatus }: { begin: boolean, mainForm: mainForm, complete: (form: step4form) => (void), sessionStatus: RootState["session"] }) {

    const [form, setForm] = useState({} as step4form);
    const [active, setActive] = useState(false);
    const [finished, setFinished] = useState(false);
    const [transition1, setTransition1] = useState(false);
    const [transition2, setTransition2] = useState(false);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;
        const currentDate = new Date();
        const date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
        // we sum 1 to the month because it is 0 based

        if (begin) {
            timeout1 = setTimeout(() => { setActive(begin) }, 50);
            timeout2 = setTimeout(() => { setTransition1(true) }, 100);
        }

    }, [begin])

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const maxPhotos = 5;

        if (input.files) {
            if (input.files.length > maxPhotos) {
                dispatch(setNotification({ message: "El máximo son 5 fotos", type: "danger" }));
                input.value = "";
            }
        }

    }

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setForm({...form, [name]: value});
    // }

    return (
        <div className={`${active ? "visible" : "hidden"} absolute w-screen p-3 transition-all ease-in-out duration-700 ${transition1 ? " right-0 " : " -right-full "}`}>

            <div className="flex justify-center h-52 opacity-70 animate-pulse">
                <img src="/src/assets/images/listingInfo.png" alt="" />
            </div>


            <form className="grid gap-3 bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 text-white shadow shadow-black">

                <div className="grid bg-black bg-opacity-40 rounded p-2 gap-1">
                    <div className="font-bold ">Datos de publicación</div>
                    <div>{mainForm.step1.brand + mainForm.step2.model}</div>
                    <div className="flex ">
                        <div className="mr-1">Fecha de publicación:</div>
                        <div>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</div>
                    </div>
                </div>

                <textarea name="description" id="description" placeholder="Descripción o comentario" className="p-1 rounded w-full text-stone-800" rows={2} />

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faPhone} /></div>
                    <input type="tel" minLength={8} maxLength={8} placeholder="Contácto" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" required/>
                </div>

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faCertificate} /></div>
                    <input type="number" placeholder="Meses de garantía" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" min={1} max={48} required/>
                </div>

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faColonSign} /></div>
                    <input type="number" placeholder="Precio en colones" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" required/>
                </div>

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faDollarSign} /></div>
                    <input type="number" placeholder="Precio en dolares" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" required />
                </div>

                <img className="opacity-70 p-2" src="/src/assets/images/angles.png" alt="" />
                <div className="text-xs text-center text-shadow shadow-black">*Sugerencia de los angulos a incluir en sus fotos  </div>

                <input type="file" name="photo" id="photo" accept="image/*" multiple
                    className="flex justify-center w-full text-white px-5 py-2" onChange={handleImagesChange} />

                <button type="submit" onClick={() => { setFinished(true), complete(form) }} className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                    <div className="text-white">
                        <div className="flex items-center justify-center">
                            <div className="mr-2 font-bold text-white text-shadow">PUBLICAR</div>
                            <div><FontAwesomeIcon icon={faCheckDouble} className="text-lume-100" /></div>
                        </div>
                    </div>
                </button>

            </form>



        </div>

    )
}