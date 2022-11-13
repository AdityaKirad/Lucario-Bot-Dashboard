import React, {useState, useRef, useEffect} from "react";
import {useRouter} from 'next/router';
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
    }, [container]);

    return container && createPortal(props.children, container);
};

export const InviteWindow = (props: NewWindowProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const newWindow = useRef<Window | null>(window);
    const router = useRouter();
    let code: string | null;

    useEffect(() => {
        const div = document.createElement("div");
        setContainer(div);
    }, [])

    useEffect(() => {
      if(!newWindow){
        return;
      }
      
      const timer = setInterval(() => {
        if(!newWindow) {
            timer && clearInterval(timer);
            return;
        }

        const currentUrl = newWindow.current?.location.href;
        if(!currentUrl){
            return;
        }
        const searchParams = new URL(currentUrl).searchParams;
        code = searchParams.get("code");
        if(code) {
            newWindow.current?.close()
            router.push(`/dashboard/${props.guildId}`)
        }
      }, 500)

      if(container){
        newWindow.current = window.open(`${props.url}`, "", "width=600,height=640,top=100,left=50");
        if(newWindow.current) {
            newWindow.current.document.body.appendChild(container);
            const curWindow = newWindow.current;
            curWindow.addEventListener('unload', () => props.onUnLoad())
        }
      }
    }, [newWindow, container])

    return container && createPortal(props.children, container);
}