export default function SideMenu({ isActive }: { isActive: boolean; }) {

    return isActive ? (
        <div className="bg-white w-40 h-full absolute transition ease-in delay-1000 duration-1000"> My Flyout </div>
    ) : null;

}