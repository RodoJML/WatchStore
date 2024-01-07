import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Navbar() {
    return (
        <>
        <nav className="bg-gray-800 grid grid-cols-3 text-white min-h-14 items-center">
            <div className="col-span-1">
                <FontAwesomeIcon icon={icon({name: 'user-secret'})} />
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