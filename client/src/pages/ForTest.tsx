export default function ForTest() {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const maxPhotos = 5

        if (input.files) {
           
                const updatedFormFiles = new FormData();

                //Iterate over the files in my input and append them into the updatedFormFiles variable. 
                for(let i = 0; i < input.files.length; i++){
                    updatedFormFiles.append(`photo[${i}]`, input.files[i]);
                }
            
        }
    }
    

    return (
        <>
        <div>Testing photos uploads</div>
            <div>
                <input type="file" name="photos" id="photos" accept="image/*" multiple
                    className="flex justify-center w-full text-white px-5 py-2"  />
            </div>
        </>
    )
}