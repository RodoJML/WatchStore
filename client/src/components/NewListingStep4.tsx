import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../state/store/store";
import { listing_mainForm } from "../pages/NewListing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faBoxArchive, faBoxesStacked, faCalendar, faCertificate, faCheckDouble, faClock, faColonSign, faDollarSign, faDolly, faEnvelope, faLocationDot, faPhone, faTruckRampBox, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNotification } from "../state/store/slice/sessionSlice";
import { guestHasListing } from "../state/store/slice/listingsSlice";

export interface step4form {
    date: Date,
    description: string,
    name: string,
    lastName: string,
    user_id: number,
    user_email: string,
    cprice: number,
    dprice: number,
    warranty: number,
    province: string,
}

export default function NewListingStep4({ begin, mainForm, complete, sessionStatus }: { begin: boolean, mainForm: listing_mainForm, complete: (form: step4form) => (void), sessionStatus: RootState["session"] }) {


    const [form, setForm] = useState({} as step4form);
    const [active, setActive] = useState(false);
    const [currencyExchange, setCurrencyExchange] = useState(true);
    const [ceValue, setCeValue] = useState(500);
    const [listingAlreadyExist, setListingAlreadyExist] = useState(false);
    const [finished, setFinished] = useState(false);
    const [transition1, setTransition1] = useState(false);
    const [transition2, setTransition2] = useState(false);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch<AppDispatch>();

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

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };

    }, [begin])

    useEffect(() => {

        if (listingAlreadyExist == true) {
            dispatch(setNotification({ message: "Solo usuarios registrados con tienda pueden tener más de 1 publicación.", type: "danger" }));
        }

        return () => { dispatch(setNotification(undefined)) };

    }, [listingAlreadyExist])


    useEffect(() => {
        if (currencyExchange) {
            setForm({ ...form, dprice: (form.cprice / ceValue) });
        }
    }, [form.cprice, currencyExchange])

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {

        e.preventDefault();

        dispatch(guestHasListing(form.user_id)).then((result: any) => {
            if (result.payload.total > 0) {
                setListingAlreadyExist(true);
            } else {
                setFinished(true);
                complete(form);
            }
        });

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const maxPhotos = 5

        if (input.name == "currencyExchange") {
            setCurrencyExchange(input.checked ? true : false);
        }

        if (input.files) {
            if (input.files.length > maxPhotos) {
                dispatch(setNotification({ message: "El máximo son 5 fotos", type: "danger" }));
                input.value = "";
            }
        } else {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value });
        }
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    useEffect(() => {
        setListingAlreadyExist(false);
    }, [form.user_id])

    return (
        <div className={`${active ? "visible" : "hidden"} absolute w-screen p-3 transition-all ease-in-out duration-700 ${transition1 ? " right-0 " : " -right-full "}`}>

            <div className="flex justify-center h-42 opacity-70 animate-pulse">
                <img src="/src/assets/images/listingInfo.png" alt="" />
            </div>


            <form className="grid gap-3 bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 text-white shadow shadow-black" onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 bg-black bg-opacity-40 rounded p-2 px-3 gap-1 text-shadow shadow-black ">
                    <div className="font-bold text-xl col-span-2">Datos de publicación</div>

                    <div>Reloj {mainForm.step1.certification == 1 ? "Original"
                        : mainForm.step1.certification == 2 ? "AAA"
                            : mainForm.step1.certification == 3 ? "AA"
                                : mainForm.step1.certification == 4 ? "A"
                                    : "Error"}: </div>
                    <div className="flex overflow-visible">
                        <div className="mr-1 overflow-scroll text-nowrap whitespace-nowrap">
                            {sessionStatus.brands.find((brand) => brand.brand_id == mainForm.step1.brand)?.brand_name} {mainForm.step2.model}</div>
                        <div className="mr-1">|</div>
                        <div className="flex justify-center items-center mr-1 text-xs"><FontAwesomeIcon icon={faBoxArchive} /></div>
                        <div> x{mainForm.step3.quantity}</div>
                    </div>


                    {sessionStatus.user.user_type <= 1 &&
                        <>
                            <div>Teléfono:</div>
                            <div>{sessionStatus.user.user_id}</div>
                            <div>Correo:</div>
                            <div>{sessionStatus.user.user_email}</div>
                        </>
                    }

                    <div className="flex">
                        <div className="text-shadow shadow-black">Publicado en:</div>
                    </div>
                    <div>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</div>
                </div>

                <textarea name="description" id="description" placeholder="Descripción o comentario" className="p-1 rounded w-full text-stone-800" rows={2} onChange={handleTextAreaChange} />

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faCertificate} /></div>
                    <input name="warranty" id="warranty" type="number" placeholder="Meses de garantía" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" min={0} max={48} required onChange={handleInputChange} />
                </div>

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faColonSign} /></div>
                    <input name="cprice" id="cprice" type="number" placeholder="Precio en colones" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" min={5} required onChange={handleInputChange} />
                </div>

                <div className="flex">
                    <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faDollarSign} /></div>

                    <div className="flex w-full">
                        <input name="dprice" id="dprice" type="number" placeholder="Precio en dolares" className={`p-1 rounded w-full ${currencyExchange ? "text-white" : "text-stone-800"} mr-1`} pattern="[0-9]*" min={1} required onChange={handleInputChange} disabled={currencyExchange} {...(currencyExchange ? { value: form.cprice / ceValue } : {value: form.dprice})} />

                        <div className="flex items-center justify-center bg-black bg-opacity-40 rounded py-1 px-2">
                            <input name="currencyExchange" id="currencyExchange" className="mr-1" type="checkbox" defaultChecked onChange={handleInputChange} />
                            <div className="text-xs whitespace-nowrap text-nowrap">Tipo Cambio</div>
                        </div>
                    </div>


                </div>

                {
                    sessionStatus.user.user_type > 1 &&
                    <>
                        <div className="text-xs text-shadow shadow-black ">📇 Los compradores tendran acceso a la siguiente información para contactarle.</div>

                        <div className="flex">
                            <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-20 mr-1"><FontAwesomeIcon icon={faUser} /></div>
                            <input name="name" id="name" type="text" placeholder="Nombre" className="p-1 rounded text-stone-800 w-full mr-2" required onChange={handleInputChange} />
                            <input name="lastName" id="lastName" type="text" placeholder="Apellido" className="p-1 rounded text-stone-800 w-full" required onChange={handleInputChange} />
                        </div>

                        <div className="flex">
                            <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faLocationDot} /></div>
                            <select className="p-1 rounded text-stone-800 w-full" name="province" id="province" defaultValue="" onChange={handleSelectChange}>
                                <option key={0} value="" disabled>Ubicación</option>
                                {sessionStatus.provinces.map((province) => {
                                    return <option key={province} value={province}>{province}</option>
                                })}
                            </select>
                        </div>


                        <div className="flex">
                            <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faPhone} /></div>
                            <input name="user_id" id="user_id" type="tel" minLength={8} maxLength={8} placeholder="Teléfono" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" required onChange={handleInputChange} />
                        </div>

                        <div className="flex">
                            <div className="flex justify-center items-center bg-black bg-opacity-40 rounded w-10 mr-1"><FontAwesomeIcon icon={faEnvelope} /></div>
                            <input name="user_email" id="user_email" type="mail" placeholder="Correo" className="p-1 rounded w-full text-stone-800" required onChange={handleInputChange} />
                        </div>
                    </>
                }

                <img className="opacity-70 p-2" src="/src/assets/images/angles.png" alt="" />
                <div className="text-xs text-center text-shadow shadow-black">*Sugerencia de los angulos a incluir en sus fotos  </div>

                <input type="file" name="photo" id="photo" accept="image/*" multiple
                    className="flex justify-center w-full text-white px-5 py-2" onChange={handleInputChange} />

                {
                    listingAlreadyExist &&
                    <div className="text-sm text-center text-shadow shadow-black bg-black bg-opacity-40 rounded p-3 border border-white border-opacity-30">
                        🚨 Ya existe una publicación bajo este usuario, solo usuarios registrados con tienda pueden tener mas de 1 publicación.
                    </div>
                }

                <button type="submit" disabled={listingAlreadyExist} className={`flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black ${listingAlreadyExist && " opacity-50"}`}>
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