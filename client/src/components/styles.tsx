import { useEffect, useState } from 'react'
import { getStyles, type StyleItem } from '../store/styles'

export default function StyleList() {

    const [styles, setStyles] = useState<StyleItem[]>([])

    useEffect(() => 
    {
        getStyles()
            .then( (data) => setStyles(data.data) )
            .catch( () => console.log("Something bad happened") )
    })

    return (
        <div className="grid grid-cols-3 gap-4">
            {styles.map( (style: { id: number; name: string }) => (
                <div key={style.id} className="bg-white rounded shadow-md p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{style.name}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}