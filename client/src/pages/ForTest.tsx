import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { add_photos_test } from "../state/store/slice/listingsSlice";

export default function ForTest() {

    const dispatch = useDispatch<AppDispatch>();
    const [photos, setPhotos] = useState(new FormData());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const input = e.target;
        const maxPhotos = 5

        if (input.files) {

            const updatedFormFiles = new FormData();

            //Iterate over the files in my input and append them into the updatedFormFiles variable. 
            for (let i = 0; i < input.files.length; i++) {
                updatedFormFiles.append(`photo[${i}]`, input.files[i]);
            }
            
            setPhotos(updatedFormFiles);
        }
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        console.log("Submitted");
        
        e.preventDefault();

        dispatch(add_photos_test(photos));

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Testing photos uploads</div>
                <div>
                    <input type="file" name="photos" id="photos" accept="image/*" multiple
                        className="flex justify-center w-full text-white px-5 py-2" />
                </div>
                <button>Submit</button>
            </form>


        </>
    )
}