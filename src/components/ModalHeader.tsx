// ModalHeader.tsx
import { X } from "lucide-react";

type ModalHeaderProps = {
    onClose: () => void;
    title: string;
    themeColor?: string;
};

export default function ModalHeader({ onClose, title, themeColor }: ModalHeaderProps) {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-[#262727] border-b border-[#2F2F2F]">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: themeColor }}
                ></span>
                {title}
            </h2>
            <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2F2F2F] transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}
