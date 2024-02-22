export default function NewListingStep3() {
    return (
        <div>
            <div className="flex items-center">
                <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full"><FontAwesomeIcon icon={faCertificate} /></div>
                <select className="bg-black bg-opacity-30 p-1 rounded w-full" name="water_proof" id="water_proof" defaultValue={0}>
                    <option key={0} value={0} disabled>Condición</option>
                    <option key={1} value={1}>Nuevo</option>
                    <option key={2} value={2}>Usado</option>
                </select>
            </div>

            <div className="flex items-center">
                <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <textarea name="description" id="description" placeholder="Descripción" className="p-1 rounded w-full text-stone-800" rows={2} />
            </div>

            <div className="flex items-center">
                <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                    <FontAwesomeIcon icon={faColonSign} />
                </div>
                <input type="number" placeholder="Precio" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" />
            </div>

            <div className="flex items-center">
                <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                    <FontAwesomeIcon icon={faDollarSign} />
                </div>
                <input type="number" placeholder="Precio" className="p-1 rounded w-full text-stone-800" pattern="[0-9]*" />
            </div>

            <div className="flex items-center">
                <div className="flex bg-black bg-opacity-30 rounded justify-center items-center mr-2 w-10 h-full">
                    <FontAwesomeIcon icon={faCubesStacked} />
                </div>
                <input type="number" placeholder="Cantidad" className="p-1 rounded w-full text-stone-800" min={1} pattern="[0-9]*" />
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

        </div>
    )
}