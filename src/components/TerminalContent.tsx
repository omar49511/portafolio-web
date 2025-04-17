import MatrixEffect from "@/components/matrix-effect";
import { Message } from "@/types/terminalTypes";

type TerminalContentProps = {
    messages: Message[];
    showMatrix: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
};

export const TerminalContent = ({
    messages,
    showMatrix,
    messagesEndRef,
}: TerminalContentProps) => (
    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-[#191819] text-gray-300 relative">
        {showMatrix && <MatrixEffect />}
        {messages.map((message, index) => (
            <div
                key={index}
                className={`mb-1 ${message.type === "error"
                    ? "text-red-400"
                    : message.type === "success"
                        ? "text-green-400"
                        : message.type === "input"
                            ? "text-blue-400"
                            : ""
                    }`}
            >
                {message.content}
            </div>
        ))}
        <div ref={messagesEndRef} />
    </div>
);