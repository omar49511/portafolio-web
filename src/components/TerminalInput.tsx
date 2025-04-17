type TerminalInputProps = {
    input: string;
    setInput: (value: string) => void;
    executeCommand: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
};

export const TerminalInput = ({
    input,
    setInput,
    executeCommand,
    inputRef,
}: TerminalInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.code === "Space") {
            e.stopPropagation(); // evita que otros listeners escuchen el evento
        }

        if (e.key === "Enter") {
            e.preventDefault();
            executeCommand();
        }
    };

    return (
        <div className="p-2 bg-[#5730E6] border-t border-gray-700 flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white font-mono"
                placeholder="Type a command..."
            />
        </div>
    );
};