
export const addEventListener = (target: HTMLElement | Window | Document, name: string, callback: EventListenerOrEventListenerObject): () => void => {
    target.addEventListener(name, callback);
    return () => target.removeEventListener(name, callback);
}