export default function Navbar() {
    return (
        <>
        <nav className="bg-gray-800 grid grid-cols-3 text-white min-h-14 items-center">
            <div className="col-span-1">
                <i className="fa-solid fa-bars" />
            </div>

            <div className="col-span-1 text-center">
                Test text
            </div>

            <div className="col-span-1 text-right">
                User and wishlist
            </div>
        </nav>
        </>
    );
}

// Styles