import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store/store';
import { logOut } from '../state/store/slice/sessionSlice';

interface SideMenuProps {
    isActive: boolean;
    onXclick: () => (void);
}

export default function SideMenu({ isActive, onXclick }: SideMenuProps) {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();

    return <div className={`${isActive ? sideMenuActive : sideMenuInactive}`}>

        <div className='relative grid grid-cols-1 ml-5'>

            <a className="text-right p-1 mr-1" onClick={onXclick}>
                <FontAwesomeIcon icon={faCircleXmark} inverse />
            </a>

            <div className="text-white">
                <span className="font-bold">⌚️Tico</span><span className="font-light">Toc</span>
            </div>

            <a href="/" onClick={() => dispatch(logOut())}>
                <FontAwesomeIcon className="cursor-pointer" icon={faRightFromBracket} />
            </a>
            
        </div>

    </div>;

}

const sideMenuBase = 'fixed bg-transparent w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 h-full rounded rounded-l-none ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-30';
const sideMenuActive = `${sideMenuBase} left-0`;
const sideMenuInactive = `${sideMenuBase} -left-1/2 sm:-left-1/3 md:-left-1/4 lg:-left-1/5 xl:-left-1/6`;

