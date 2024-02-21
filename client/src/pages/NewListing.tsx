import NewListingStep1 from "../components/NewListingStep1";
import NewListingNav from "../components/NewListingNav";

export default function NewListing() {
        
    const woodDivBg = {
        backgroundImage: "url('/src/assets/images/woodbg.jpg')",
        backgroundSize: "cover",
    };

    return (
        <div>
            <NewListingNav />

            <NewListingStep1 />

        </div>
    )
}