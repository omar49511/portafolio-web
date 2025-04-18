import React, { useState } from "react";
import { FaLockOpen } from "react-icons/fa";
import SecretCodeCollector from "./SecretCodeCollector"; // Asegúrate de importar el componente

export default function FloatingSecretButton() {
    const [isSecretVisible, setIsSecretVisible] = useState(false);
    const toggleSecret = () => setIsSecretVisible(prev => !prev);

    return (
        <>
            {/* Botón flotante en esquina inferior derecha */}
            <button
                onClick={toggleSecret}
                className="fixed bottom-6 right-6 z-50 bg-[#181918] text-white p-3 rounded-full shadow-lg hover:bg-[#2a2a2a] transition"
                aria-label="Abrir código secreto"
            >
                <FaLockOpen size={20} />
            </button>

            {/* Panel que aparece al hacer click */}
            {isSecretVisible && (
                <div className="fixed bottom-20 right-6 z-40 bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-xl border border-gray-700 min-w-72 max-w-[90vw] animate-slide-up">
                    <SecretCodeCollector themeColor="#ffffff" />
                </div>
            )}
        </>
    );
}
