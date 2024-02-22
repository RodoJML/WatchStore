import { useEffect, useState } from "react";
import { step1form } from "../components/NewListingStep1";
import { BrandItem } from "../model/fetch";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryThreeQuarters, faCalendarCheck, faCertificate, faCheckDouble, faCircleNotch, faColonSign, faCubesStacked, faDollarSign, faDroplet, faFilePen, faGears, faGem, faHillRockslide, faLightbulb, faPalette, faPen, faPersonHalfDress, faRing, faS, faShapes, faStopwatch20, faStroopwafel, faT, faUnlockKeyhole, faWater } from "@fortawesome/free-solid-svg-icons";


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

        return () => { clearTimeout(timeout1); clearTimeout(timeout2); clearTimeout(timeout3) }

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
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                        <textarea name="description" id="description" placeholder="Descripción" className="p-1 rounded w-full text-stone-800" rows={2}/>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faStopwatch20} />
                        </div>
                        <input type="text" placeholder="Modelo" className="p-1 rounded w-full text-stone-800" />
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faColonSign} />
                        </div>
                        <input type="number" placeholder="Precio" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*"/>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faDollarSign} />
                        </div>
                        <input type="number" placeholder="Precio" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*"/>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                            <FontAwesomeIcon icon={faCubesStacked} />
                        </div>
                        <input type="number" placeholder="Cantidad" className="p-1 rounded w-full text-stone-800" min={1} pattern="[0-9]*"/>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCertificate} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="water_proof" id="water_proof" defaultValue={0}>
                            <option key={0} value={0} disabled>Condición</option>
                            <option key={1} value={1}>Nuevo</option>
                            <option key={2} value={2}>Usado</option>
                        </select>
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
                            {sessionStatus.glass_materials.map((glass) => { return <option key={glass.glass_material_id} value={glass.glass_material_id}>{glass.glass_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Carcasa - Material</option>
                            {sessionStatus.case_materials.map((material) => { return <option key={material.caseMaterial_id} value={material.caseMaterial_id}>{material.caseMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faHillRockslide} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Carcasa - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Correa - Material</option>
                            {sessionStatus.strap_materials.map((material) => { return <option key={material.strapMaterial_id} value={material.strapMaterial_id}>{material.strapMaterial_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCircleNotch} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Correa - Color</option>
                            {sessionStatus.colors.map((color) => { return <option key={color} value={color}>{color}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faPersonHalfDress} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="glass_material" id="glass_material" defaultValue={0}>
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
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
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
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
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
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="water_resistant" id="water_resistant" defaultValue={0}>
                            <option key={0} value={0} disabled>Luminiscencia</option>
                            <option key={1} value={1}>Si</option>
                            <option key={2} value={2}>No</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faUnlockKeyhole} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Cierre</option>
                            {sessionStatus.clasps.map((clasp) => { return <option key={clasp.claspType_id} value={clasp.claspType_id}>{clasp.claspType_name}</option> })}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCalendarCheck} /></div>
                        <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="bezel_material" id="bezel_material" defaultValue={0}>
                            <option key={0} value={0} disabled>Garantía</option>
                            <option key={1} value={1}>1 mes</option>
                            <option key={2} value={2}>2 meses</option>
                            <option key={3} value={3}>3 meses</option>
                            <option key={4} value={4}>4 meses</option>
                            <option key={5} value={5}>5 meses</option>
                            <option key={6} value={6}>6 meses</option>
                            <option key={7} value={7}>7 meses</option>
                            <option key={8} value={8}>8 meses</option>
                            <option key={9} value={9}>9 meses</option>
                            <option key={10} value={10}>10 meses</option>
                            <option key={11} value={11}>11 meses</option>
                            <option key={12} value={12}>12 meses</option>

                        </select>
                    </div>


                    <div className="">
                        <div className="flex justify-center items-center bg-gradient-to-b from-stone-700 to-stone-900 p-2 rounded shadow shadow-black">
                            <div className="text-white">
                                <div className="flex items-center justify-center">
                                    <div className="mr-2 font-bold text-white text-shadow">PUBLICAR</div>
                                    <div><FontAwesomeIcon icon={faCheckDouble} className="text-lume-100" /></div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>



            </div>
        </div>
    )
}