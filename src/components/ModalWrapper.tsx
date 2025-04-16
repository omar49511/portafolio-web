// ModalWrapper.tsx
import { useEffect, useRef } from "react";

type ModalWrapperProps = {
    onClose: () => void;
    children: React.ReactNode;
};

export default function ModalWrapper({ onClose, children }: ModalWrapperProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
            <div ref={modalRef} className="bg-[#191819] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-[#262727] shadow-xl">
                {children}
            </div>
        </div>
    );
}
