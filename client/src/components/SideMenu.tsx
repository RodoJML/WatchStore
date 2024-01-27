import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface SideMenuProps {
    isActive: boolean;
    onXclick: () => (void);
}

export default function SideMenu({ isActive, onXclick }: SideMenuProps) {

    return <div className={`${isActive ? sideMenuActive : sideMenuInactive}`}>

        <div className="flex">
            <div className="w-full ml-10 mt-4 text-center">
                <span className="text-white font-bold">⌚️Tico</span><span className="text-white font-light">Toc</span>
            </div>
            <a className="w-full mt-4 mr-4 text-right" onClick={onXclick}>
                <FontAwesomeIcon icon={faCircleXmark} inverse/>              
            </a>
            
        </div>
       
    </div>;

}

const sideMenuBase = 'fixed bg-transparent w-56 h-full rounded rounded-l-none ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-20';
const sideMenuActive = `${sideMenuBase} left-0`;
const sideMenuInactive = `${sideMenuBase} -left-80`;

