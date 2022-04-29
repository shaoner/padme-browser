import { FunctionalComponent, VNode, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';

type PortalProps = {
    wrapperId: string;
    children: VNode | VNode[];
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

    return createPortal(children as VNode, wrapperElement);
}

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

const Modal: FunctionalComponent<Props> = ({ children, isOpen, onClose, title }) => {
    const bgEl = useRef(null);
    const onDiscard = (e: MouseEvent) => {
        if (e.target as HTMLElement == bgEl.current) {
            onClose();
        }
    };

    return (
        <Portal wrapperId="modals">
            <div class={`modal ${isOpen ? 'is-active' : ''}`}>
                <div ref={bgEl} class="modal-background" onClick={onDiscard}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{title}</p>
                        <button class="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section class="modal-card-body">
                        {children}
                    </section>
                    <footer class="modal-card-foot"></footer>
                </div>
            </div>
        </Portal>
    );
}

export type { Props as ModalProps };
export { Modal };
