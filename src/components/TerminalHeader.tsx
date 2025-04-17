import { X } from "lucide-react";

type TerminalHeaderProps = {
    onClose: () => void;
};

export const TerminalHeader = ({ onClose }: TerminalHeaderProps) => (
    <div className="flex items-center justify-between px-4 py-2 bg-[#5730E6] border-b border-gray-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-medium">Terminal</div>
        <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
        >
            <X className="w-4 h-4" />
        </button>
    </div>
);