import { useEffect, useState } from "react";
import { mainForm } from "../pages/NewListing";
import { BrandItem } from "../model/interfaces";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBatteryThreeQuarters, faCircleNotch, faCube, faDroplet, faEarthAmericas, faExpand, faGaugeSimpleHigh, faGears, faGem, faHillRockslide, faLightbulb, faM, faPersonHalfDress, faRing, faS, faShapes, faStopwatch20, faT, faUnlockKeyhole, faVenusMars, faWater, faWeightHanging } from "@fortawesome/free-solid-svg-icons";

export interface step2form {
    model: string,
    type: number,
    movement: number,
    style: number,
    shape: number,
    glass_material: number,
    case_material: number,
    case_color: string,
    strap_material: number,
    strap_color: string,
    dial_color: string,
    weight: string,
    depth: string,
    width: number,
    gender: number,
    water_proof: number,
    water_resistant: number,
    bezel_type: number,
    bezel_material: number,
    power_reserve: number,
    lume: number,
    clasp_type: number,
    country: number,
}

export default function NewListingStep2({ begin, mainForm, sessionStatus, complete }: { begin: boolean, mainForm: mainForm, sessionStatus: RootState["session"], complete: (form: step2form) => (void) }) {

    const [brand, setBrand] = useState({} as BrandItem);
    const [transition1, setTransition1] = useState(false);
    const [transition2, setTransition2] = useState(false);
    const [transition3, setTransition3] = useState(false);
    const [active, setActive] = useState(false);
    const [finished, setFinished] = useState(false);
    const [form, setForm] = useState({} as step2form);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;
        let timeout4: NodeJS.Timeout;

        if (begin) {
            timeout1 = setTimeout(() => { setActive(begin); }, 50);
            timeout3 = setTimeout(() => { setTransition1(begin); }, 100);
            timeout2 = setTimeout(() => { setTransition2(begin); }, 300);
            timeout4 = setTimeout(() => { setTransition3(begin); }, 800);
        }

        setBrand((sessionStatus.brands.find(brand => brand.brand_id == mainForm.step1.brand)!));

        return () => { clearTimeout(timeout1); clearTimeout(timeout2); clearTimeout(timeout3); clearTimeout(timeout4); }

    }, [mainForm.step1, begin])

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (finished) {
            timeout = setTimeout(() => { setActive(false); }, 1000);
        }

    }, [finished])

    const woodDivBg = {
        backgroundImage: "url('/src/assets/images/woodbg.jpg')",
        backgroundSize: "cover",
    };

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
        window.scrollTo(0, 0);
    }

    useEffect(() => {

    }, [form])

    return (
        <div className={`${active ? "visible" : "hidden"} transition-all ease-in-out duration-700 absolute w-screen p-3 ${transition3 ? (finished ? " -left-full " : " left-0 ") : (transition1 ? " right-0 " : " -right-full ")} `}>

            <form className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36" onSubmit={handleSubmit}>

                <div className={`absolute flex justify-center items-center w-full transition-right ease-in-out duration-1000 ${transition2 ? "right-0" : "-right-full"}`}>
                    <div style={woodDivBg} className="flex justify-center items-center p-1 rounded-2xl shadow shadow-black h-20 w-1/2">
                        {brand?.brand_logo_path
                            ? <img className="h-full object-contain " src={brand?.brand_logo_path} alt="" />
                            : <i className="text-3xl text-stone-800 font-bold text-center">{brand?.brand_name}</i>
                        }
                    </div>
                </div>

                {/* Dont delete this is needed, previous div is absolute but needs to have a space in the form */}
                <div className="h-20"></div>

                {
                    sessionStatus.user.user_type > 1 &&
                    <div className="text-xs text-center text-shadow shadow-black mt-4">⚠️ <strong>IMPORTANTE:</strong> Solo usuarios registrados podran editar su anuncio una vez publicado, asegurese de que todos los campos sean correctos. </div>
                }

                <div className="grid grid-cols-1 gap-2 mt-4">

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faM} />
                        </div>
                        <input type="text" placeholder="Modelo" className="p-1 rounded w-full text-stone-800" name="model" id="model" required onChange={handleInputChange} />
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faT} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="type" id="type" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Tipo</option>
                            {sessionStatus.types.map((type) => { return <option key={type.type_id} value={type.type_id}>{type.type_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGears} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="movement" id="movement" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Movimiento</option>
                            {sessionStatus.movements.map((movement) => { return <option key={movement.movement_id} value={movement.movement_id}>{movement.movement_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faS} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="style" id="style" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Estilo</option>
                            {sessionStatus.styles.map((style) => { return <option key={style.style_id} value={style.style_id}>{style.style_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGem} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Cristal</option>
                            {sessionStatus.glass_materials.map((glass) => { return <option key={glass.glass_id} value={glass.glass_id}>{glass.glass_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="case_material" id="case_material" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Caja - Material</option>
                            {sessionStatus.case_materials.map((material) => { return <option key={material.caseMaterial_id} value={material.caseMaterial_id}>{material.caseMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="case_color" id="case_color" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Caja - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faExpand} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="width" id="width" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Tamaño</option>
                            {sessionStatus.sizes.map((size) => {
                                return <option key={size} value={size}>{size}mm</option>
                            })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faPersonHalfDress} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="gender" id="gender" defaultValue="" required onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Genero</option>
                            <option key={1} value={1}>Hombre</option>
                            <option key={2} value={2}>Mujer</option>
                            <option key={3} value={3}>Unisex</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-center">

                        <div className="flex items-center col-span-3">
                            <div className="flex items-center justify-center bg-black bg-opacity-30 rounded mr-2 w-11 h-full"><FontAwesomeIcon icon={faWater} /></div>
                            <div className="bg-black bg-opacity-30 rounded h-full w-full text-left px-2 py-0.5">Water Proof</div>
                        </div>

                        <div className="col-span-2 w-full">
                            <div className="grid grid-cols-2 w-full">
                                <label><input type="radio" name="water_proof" value={1} required onChange={handleInputChange} />Si</label>
                                <label><input type="radio" name="water_proof" value={2} required onChange={handleInputChange} />No</label>
                            </div>

                        </div>

                        <div className="flex items-center col-span-3">
                            <div className="flex items-center justify-center bg-black bg-opacity-30 rounded mr-2 w-11 h-full"><FontAwesomeIcon icon={faDroplet} /></div>
                            <div className="bg-black bg-opacity-30 rounded h-full w-full text-left px-2 py-0.5">Water Resistant</div>
                        </div>

                        <div className="col-span-2 w-full">
                            <div className="grid grid-cols-2 w-full">
                                <label><input type="radio" name="water_resistant" value={1} required onChange={handleInputChange} />Si</label>
                                <label><input type="radio" name="water_resistant" value={2} required onChange={handleInputChange} />No</label>
                            </div>

                        </div>

                    </div>

                    <div className="text-xs my-2 text-shadow shadow-black text-left">* Los siguientes campos NO son obligatorios, sin embargo, incluír todas las caracteristicas ayuda a un mayor alcance a compradores potenciales</div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="strap_material" id="strap_material" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Correa - Material</option>
                            {sessionStatus.strap_materials.map((material) => { return <option key={material.strapMaterial_id} value={material.strapMaterial_id}>{material.strapMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="strap_color" id="strap_color" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Correa - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGaugeSimpleHigh} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="dial_color" id="dial_color" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Dial - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faWeightHanging} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="weight" id="weight" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Peso</option>
                            <option key="liviano" value="liviano">Liviano</option> {/* 30 - 100g*/}
                            <option key="normal" value="normal">Normal</option> {/* 100 - 150g*/}
                            <option key="pesado" value="pesado">Pesado</option> {/* 150 - 200g*/}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCube} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="depth" id="depth" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Grosor</option>
                            <option key="ultra_slim" value="ultra_slim">Ultra-slim</option> {/* 2-6mm */}
                            <option key="slim" value="slim">Slim</option> {/* 6-9mm */}
                            <option key="standard" value="standard">Standard</option> {/* 10 - 12mm */}
                            <option key="thick" value="thick">Thick</option> {/* 13 - 15mm */}
                            <option key="bulky" value="bulky">Bulky</option> {/* >15mm */}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faRing} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_type" id="bezel_type" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Tipo Bisel</option>
                            {sessionStatus.bezels.map((bezel) => { return <option key={bezel.bezelType_id} value={bezel.bezelType_id}>{bezel.bezelType_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faRing} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Material Bisel</option>
                            {sessionStatus.bezel_materials.map((material) => { return <option key={material.bezelMaterial_id} value={material.bezelMaterial_id}>{material.bezelMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faShapes} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="shape" id="shape" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Forma</option>
                            {sessionStatus.shapes.map((shape) => { return <option key={shape.shape_id} value={shape.shape_id}>{shape.shape_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faBatteryThreeQuarters} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="power_reserve" id="power_reserve" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Reserva</option>
                            <option key={999} value={999}>Batería</option>
                            <option key={24} value={24}>24hr</option>
                            <option key={48} value={48}>48hr</option>
                            <option key={72} value={72}>72hr</option>
                            <option key={96} value={96}>96hr</option>
                            <option key={120} value={120}>120hr</option>
                            <option key={148} value={148}>148hr</option>
                            <option key={172} value={172}>172hr</option>
                            <option key={196} value={196}>96hr</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faUnlockKeyhole} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="clasp_type" id="clasp_type" defaultValue="" onChange={handleSelectChange}>
                            <option key={0} value="" disabled>Cierre</option>
                            {sessionStatus.clasps.map((clasp) => { return <option key={clasp.claspType_id} value={clasp.claspType_id}>{clasp.claspType_name}</option> })}
                        </select>
                    </div>

                    {mainForm.step1.certification != 1 &&
                        <div className="flex items-center">
                            <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faEarthAmericas} /></div>
                            <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="country" id="country" autoComplete="country" defaultValue="" onChange={handleSelectChange}>
                                <option key={0} value="" disabled>Manufactura</option>
                                {sessionStatus.countries.map((country) => { return <option key={country.country_id} value={country.country_id}>{country.country_name}</option> })}
                            </select>
                        </div>
                    }

                    <div className="grid grid-cols-5 gap-2 text-center">

                        <div className="flex items-center col-span-3">
                            <div className="flex items-center justify-center bg-black bg-opacity-30 rounded mr-2 w-11 h-full"><FontAwesomeIcon icon={faLightbulb} /></div>
                            <div className="bg-black bg-opacity-30 rounded h-full w-full text-left px-2 py-0.5">Luminiscencia</div>
                        </div>

                        <div className="col-span-2 w-full">
                            <div className="grid grid-cols-2 w-full">
                                <label><input type="radio" name="lume" value={1} onChange={handleInputChange} />Si</label>
                                <label><input type="radio" name="lume" value={2} onChange={handleInputChange} />No</label>
                            </div>

                        </div>
                    </div>

                    <button type="submit">
                        <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                            <div className="text-white">
                                <div className="flex items-center justify-center">
                                    <div className="mr-2 font-bold text-white text-shadow">Siguiente</div>
                                    <div><FontAwesomeIcon icon={faAngleRight} className="text-lume-100" /></div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}

// scrollto() lets you
// scroll to the top of the page
// as follows in the following snippet:
//    const scrollTo = () => {
//        window.scrollTo(0, 0);
//    }