import React, {useState, useRef, useEffect} from "react";
import {createPortal} from 'react-dom';

interface NewWindowProps {
    url: string;
    onUnLoad: () => void;
    guildId?: string;
    children?: React.ReactNode;
}

export const LoginWindow = (props: NewWindowProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const newWindow = useRef<Window | null>(window);

    useEffect(() => {
        const div = document.createElement("div");
        setContainer(div);
    }, [])

    useEffect(() => {
        if(container) {
            newWindow.current = window.open(`${props.url}`, "", "width=600,height=640,top=100,left=50");
            if(newWindow.current) {
                newWindow.current.document.body.appendChild(container);
                const curWindow = newWindow.current;
                curWindow.addEventListener('unload', () => props.onUnLoad())
            }
        }
    }, [container,props]);

    return container && createPortal(props.children, container);
};
