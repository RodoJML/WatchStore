import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import * as Fetch from '../model/fetch';


export default function ForTest() {

    const dispatch = useDispatch<AppDispatch>();
    const [photos, setPhotos] = useState(new FormData());

    useEffect(() => {
        console.log(photos.get('photos'));
    }, [photos])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const input = e.target;

        if (input.files) {
            console.log("File detected");
            const updatedFormFiles = new FormData();

            //Iterate over the files in my input and append them into the updatedFormFiles variable. 
            for (let i = 0; i < input.files.length; i++) {
                console.log(`iterate this ${i} much times`)
                updatedFormFiles.set(`photos`, input.files[i]);
            }

            setPhotos(updatedFormFiles);
            
        }
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        console.log("Submitted");

        e.preventDefault();
        Fetch.api('/listing/addPhotos', photos, 'POST');

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Testing photos uploads</div>
                <div>
                    <input type="file" name="photos" id="photos" accept="image/*" multiple
                        className="flex justify-center w-full text-white px-5 py-2" onChange={handleInputChange} />
                </div>
                <button>Submit</button>
            </form>


        </>
    )
}