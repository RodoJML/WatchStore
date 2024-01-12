import { useLoaderData } from "react-router-dom";
import { getStyles, type StyleItem } from "../model/watchStyles";

export async function loader(){
    const styles = (await getStyles()).data;
    return styles;
}

export default function WatchStyles(){

    const styles = useLoaderData() as StyleItem[];

    return(
        <>
        <span>
            {styles.map((style) => (
                <div key={style.style_id}>
                    <span>{style.style_name}</span>
                </div>
            ))}
        </span>
        </>
    )
}