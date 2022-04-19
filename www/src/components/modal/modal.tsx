import { FunctionalComponent, VNode, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';

import style from './modal.scss';

type PortalProps = {
    wrapperId: string;
    children: VNode<any> | VNode<any>[];
}

const createWrapperElement = (wrapperId: string): HTMLElement => {
    const wrapperElement = document.createElement('div');

    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

const Portal: FunctionalComponent<PortalProps> = ({ children, wrapperId }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            element = createWrapperElement(wrapperId);
        }
        setWrapperElement(element);
        return () => {
            // delete the programatically created element
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    // wrapperElement state will be null on very first render.
    if (!wrapperElement) {
        return null;
    }

    return createPortal(children as VNode<any>, wrapperElement);
}

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

const Modal: FunctionalComponent<Props> = ({ children, isOpen, onClose, title }) => {
    const innerEl = useRef(null);
    let modalClass = style.modal;
    if (isOpen) {
        modalClass += ` ${style.open}`;
    }
    const onDiscard = (e: MouseEvent) => {
        if (e.target as HTMLElement == innerEl.current) {
            onClose();
        }
    };
    return (
        <Portal wrapperId="modals">
            <div class={modalClass} onClick={onDiscard}>
                <div ref={innerEl} class={style.inner}>
                    <div class={style.content}>
                        <div class={style.header}>
                            <h5 class={style.title}>{title}</h5>
                            <button onClick={onClose} class={style.close}></button>
                        </div>
                        <div class={style.body}>{children}</div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}

export type { Props as ModalProps };
export { Modal };
