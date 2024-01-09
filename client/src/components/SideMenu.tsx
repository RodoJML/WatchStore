export default function SideMenu({ isActive }: { isActive: boolean; }) {

    return isActive ? (
        <div className="bg-white w-40 h-full absolute transition-transitionright"> My Flyout </div>
    ) : null;

}