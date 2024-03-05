import { useEffect, useState } from "react";
import { Message } from "../state/store/slice/sessionSlice";

interface NotificationProps {
    message: Message | undefined;
};

export default function Notification({ message }: NotificationProps) {

    const [active, setActive] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const NotificationStyle = 'grid fixed left-4 right-4 h-20 ease-in-out duration-500 shadow-2xl justify-start items-center rounded-lg px-3 text-left bg-white backdrop-blur bg-opacity-50 z-40';
    const NotificationActive = `${NotificationStyle} top-3`;
    const NotificationInactive = `${NotificationStyle} -top-20`;
    
    // These styles are technically not used but can be useful for future reference
    const successNotification = `${active ? NotificationActive : NotificationInactive} border-green-500 border-opacity-20 bg-green-500`;
    const errorNotification = `${active ? NotificationActive : NotificationInactive} border-red-500 border-opacity-20 bg-red-500`;


    useEffect(() => {
        if (message != undefined) {
            setActive(true);
        } else {
            setActive(false);
        }

        const timeout = setTimeout(() => {
            setActive(false);
            
        }, 5000);

        const clearNotification = setTimeout(() => {
            message = undefined;
            setShowMore(false);
        }, 6000);

        return () => { clearTimeout(timeout), clearTimeout(clearNotification) };

    }, [message]);

    return <div className={`${message?.type === 'success' ? successNotification : errorNotification}`}>
        <div className="text-stone-800 text-sm -mb-3">
            {message?.type === 'success' &&
                <span className="text-green-800 capitalize">✅ {message.type}</span>}
            {message?.type === 'danger' &&
                <span className="text-red-800 capitalize">🚨 {message.type}</span>}
            {message?.type === 'warning' &&
                <span className="text-yellow-800 capitalize">🔔 {message.type}</span>}
            {message?.type === 'info' &&
                <span>ℹ️ {message.type}</span>}
        </div>
        <div className=" bg-black bg-opacity-10 h-px w-full place-self-center"></div>

        <div className="flex overflow-scroll -mt-2">
            <div className={`text-stone-800 text-sm ${showMore ? "whitespace-wrap text-wrap" : "whitespace-nowrap text-nowrap overflow-scroll"}`}>
                💬 {message?.message}
            </div>
            {/* <div className="text-sm text-nowrap whitespace-nowrap text-stone-700 ml-2" onClick={() => setShowMore(!showMore)}>Ver más...</div> */}
        </div>
    </div>;
}

