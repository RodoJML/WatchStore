import { useEffect, useState } from "react";
import { step1form } from "../components/NewListingStep1";
import { BrandItem } from "../model/fetch";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBatteryThreeQuarters, faCircleNotch, faCube, faDroplet, faEarthAmericas, faExpand, faGaugeSimpleHigh, faGears, faGem, faHillRockslide, faLightbulb, faPersonHalfDress, faRing, faS, faShapes, faStopwatch20, faT, faUnlockKeyhole, faWater, faWeightHanging } from "@fortawesome/free-solid-svg-icons";

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

export default function NewListingStep2({ begin, step1form, sessionStatus, complete }: { begin: boolean, step1form: step1form, sessionStatus: RootState["session"], complete: (form: step2form) => (void)}) {

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

        setBrand((sessionStatus.brands.find(brand => brand.brand_id == step1form.brand)!));

        return () => { clearTimeout(timeout1); clearTimeout(timeout2); clearTimeout(timeout3); clearTimeout(timeout4); }

    }, [step1form, begin])

    const woodDivBg = {
        backgroundImage: "url('/src/assets/images/woodbg.jpg')",
        backgroundSize: "cover",
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    return (
        <div className={`${active ? "visible" : "hidden"} transition-all ease-in-out duration-700 absolute w-screen p-3 ${transition3 ? (finished ? " -left-full " : " left-0 ") : (transition1 ? " right-0 " : " -right-full ")} `}>

            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-5 shadow shadow-black text-white sm:mx-36">

                <div className={`absolute flex justify-center items-center w-full transition-right ease-in-out duration-1000 ${transition2 ? "right-0" : "-right-full"}`}>
                    <div style={woodDivBg} className="flex justify-center items-center p-1 rounded-2xl shadow shadow-black h-20 w-1/2">
                        {brand?.brand_logo_path
                            ? <img className="h-full object-contain " src={brand?.brand_logo_path} alt="" />
                            : <i className="text-3xl text-stone-800 font-bold text-center">{brand?.brand_name}</i>
                        }
                    </div>
                </div>

                <div className="h-20"></div>

                <div className="grid grid-cols-1 gap-2 mt-4">

                    <div className="flex justify-center items-center bg-black bg-opacity-30 p-1 rounded text-shadow shadow-black">
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

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faStopwatch20} />
                        </div>
                        <input type="text" placeholder="Modelo" className="p-1 rounded w-full text-stone-800" name="model" id="model" />
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faT} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="type" id="type" defaultValue={0}>
                            <option key={0} value={0} disabled>Tipo</option>
                            {sessionStatus.types.map((type) => { return <option key={type.type_id} value={type.type_id}>{type.type_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGears} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="movement" id="movement" defaultValue={0}>
                            <option key={0} value={0} disabled>Movimiento</option>
                            {sessionStatus.movements.map((movement) => { return <option key={movement.movement_id} value={movement.movement_id}>{movement.movement_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faS} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="style" id="style" defaultValue={0}>
                            <option key={0} value={0} disabled>Estilo</option>
                            {sessionStatus.styles.map((style) => { return <option key={style.style_id} value={style.style_id}>{style.style_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faShapes} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="shape" id="shape" defaultValue={0}>
                            <option key={0} value={0} disabled>Forma</option>
                            {sessionStatus.shapes.map((shape) => { return <option key={shape.shape_id} value={shape.shape_id}>{shape.shape_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGem} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Cristal</option>
                            {sessionStatus.glass_materials.map((glass) => { return <option key={glass.glass_id} value={glass.glass_id}>{glass.glass_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="case_material" id="case_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Carcasa - Material</option>
                            {sessionStatus.case_materials.map((material) => { return <option key={material.caseMaterial_id} value={material.caseMaterial_id}>{material.caseMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="case_color" id="case_color" defaultValue={0}>
                            <option key={0} value={0} disabled>Carcasa - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="strap_material" id="strap_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Correa - Material</option>
                            {sessionStatus.strap_materials.map((material) => { return <option key={material.strapMaterial_id} value={material.strapMaterial_id}>{material.strapMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="strap_color" id="strap_color" defaultValue={0}>
                            <option key={0} value={0} disabled>Correa - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faGaugeSimpleHigh} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="dial_color" id="dial_color" defaultValue={0}>
                            <option key={0} value={0} disabled>Dial - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faWeightHanging} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="weight" id="weight" >
                            <option key={0} value={0}>Peso</option>
                            <option key="liviano" value="liviano">Liviano</option> {/* 30 - 100g*/}
                            <option key="normal" value="normal">Normal</option> {/* 100 - 150g*/}
                            <option key="pesado" value="pesado">Pesado</option> {/* 150 - 200g*/}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCube} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="depth" id="depth" >
                            <option key={0} value={0}>Grosor</option>
                            <option key="ultra_slim" value="ultra_slim">Ultra-slim</option> {/* 2-6mm */}
                            <option key="slim" value="slim">Slim</option> {/* 6-9mm */}
                            <option key="standard" value="standard">Standard</option> {/* 10 - 12mm */}
                            <option key="thick" value="thick">Thick</option> {/* 13 - 15mm */}
                            <option key="bulky" value="bulky">Bulky</option> {/* >15mm */}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faExpand} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="width" id="width">
                            <option key={0} value={0}>Tamaño</option>
                            {sessionStatus.sizes.map((size) => {
                                return <option key={size} value={size}>{size}mm</option>
                            })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faPersonHalfDress} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="gender" id="gender" defaultValue={0}>
                            <option key={0} value={0} disabled>Genero</option>
                            <option key={1} value={1}>Hombre</option>
                            <option key={2} value={2}>Mujer</option>
                            <option key={3} value={3}>Unisex</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faWater} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="water_proof" id="water_proof" defaultValue={0}>
                            <option key={0} value={0} disabled>Water Proof</option>
                            <option key={1} value={1}>Si</option>
                            <option key={2} value={2}>No</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faDroplet} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="water_resistant" id="water_resistant" defaultValue={0}>
                            <option key={0} value={0} disabled>Water Resistant</option>
                            <option key={1} value={1}>Si</option>
                            <option key={2} value={2}>No</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faRing} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_type" id="bezel_type" defaultValue={0}>
                            <option key={0} value={0} disabled>Tipo Bisel</option>
                            {sessionStatus.bezels.map((bezel) => { return <option key={bezel.bezelType_id} value={bezel.bezelType_id}>{bezel.bezelType_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faRing} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Material Bisel</option>
                            {sessionStatus.bezel_materials.map((material) => { return <option key={material.bezelMaterial_id} value={material.bezelMaterial_id}>{material.bezelMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faBatteryThreeQuarters} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="power_reserve" id="power_reserve" defaultValue={0}>
                            <option key={0} value={0} disabled>Reserva</option>
                            <option key={24} value={24}>24hr</option>
                            <option key={48} value={48}>48hr</option>
                            <option key={72} value={72}>72hr</option>
                            <option key={96} value={96}>96hr</option>
                            <option key={120} value={120}>120hr</option>
                            <option key={148} value={148}>148hr</option>
                            <option key={172} value={172}>172hr</option>
                            <option key={196} value={196}>96hr</option>
                            <option key={999} value={999}>Batería</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faLightbulb} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="lume" id="lume" defaultValue={0}>
                            <option key={0} value={0} disabled>Luminiscencia</option>
                            <option key={1} value={1}>Si</option>
                            <option key={2} value={2}>No</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faUnlockKeyhole} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="clasp_type" id="clasp_type" defaultValue={0}>
                            <option key={0} value={0} disabled>Cierre</option>
                            {sessionStatus.clasps.map((clasp) => { return <option key={clasp.claspType_id} value={clasp.claspType_id}>{clasp.claspType_name}</option> })}
                        </select>
                    </div>

                    {step1form.certification != 1 &&
                        <div className="flex items-center">
                            <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faEarthAmericas} /></div>
                            <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="country" id="country" autoComplete="country" defaultValue={0}>
                                <option key={0} value={0} disabled>Manufactura</option>
                                {sessionStatus.countries.map((country) => { return <option key={country.country_id} value={country.country_id}>{country.country_name}</option> })}
                            </select>
                        </div>
                    }

                    <div className="" onClick={() => {setFinished(true), complete(form), window.scrollTo(0,0)}}> 
                        <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                            <div className="text-white">
                                <div className="flex items-center justify-center">
                                    <div className="mr-2 font-bold text-white text-shadow">Siguiente</div>
                                    <div><FontAwesomeIcon icon={faAngleRight} className="text-lume-100" /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

// scrollto() lets you
// scroll to the top of the page
// as follows in the following snippet:
//    const scrollTo = () => {
//        window.scrollTo(0, 0);
//    }