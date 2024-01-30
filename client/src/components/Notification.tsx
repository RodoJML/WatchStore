import { useEffect, useState } from "react";
import { Message } from "../state/store/slice/sessionSlice";

interface NotificationProps {
    message: Message;
};

export default function Notification({ message = { message: null, type: null } }: NotificationProps) {

    const [active, setActive] = useState(false);
    const NotificationStyle = 'grid fixed left-4 right-4 h-16 ease-in-out duration-500 shadow-2xl justify-start items-center rounded-lg bg-white pl-3 text-left';
    const NotificationActive = `${NotificationStyle} top-5 z-20`;
    const NotificationInactive = `${NotificationStyle} -top-20 z-0`;
    // These styles are technically not used but can be useful for future reference
    const successNotification = `${active ? NotificationActive : NotificationInactive} border-green-500 border-opacity-20 bg-green-500`;
    const errorNotification = `${active ? NotificationActive : NotificationInactive} border-red-500 border-opacity-20 bg-red-500`;

    useEffect(() => {
        console.log("from react", message);
        if (message.message !== null){
            setActive(true);
            setTimeout(() => setActive(false), 5000);
        }
    }, [message]);

    return <div className={`${message.type === 'success' ? successNotification : errorNotification}`}>
        <div className="text-stone-800 text-sm capitalize">
            {message.type === 'success' &&
                <div>
                    <span>✅ </span>
                    <span>Type: </span>
                    <span className="text-green-800">{message.type}</span>
                </div>
            }
            {message.type === 'danger' &&
                <div>
                    <span>🚨 </span>
                    <span>Type: </span>
                    <span className="text-red-800">{message.type}</span>
                </div>
            }
            {message.type === 'warning' &&
                <div>
                    <span>🚸 </span>
                    <span>Type: </span>
                    <span className="text-yellow-800">{message.type}</span>
                </div>
            }
            {message.type === 'info' &&
                <span>ℹ️ Type: {message.type}</span>
            }
        </div>
        <div className="absolute bg-black bg-opacity-10 h-px w-11/12 place-self-center"></div>
        <div className="text-stone-800 text-sm capitalize">
            💬 Message: {message.message}
        </div>

    </div>;
}

