
"use client";

import React from "react";
import { useTerminalLogic } from "@/hooks/useTerminalLogic";
import { useTerminalEffects } from "@/hooks/useTerminalEffects";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalContent } from "./TerminalContent";
import { TerminalInput } from "./TerminalInput";

type TerminalProps = {
  onClose: () => void;
  themeColor: string;
  onEasterEgg?: () => void;
};

export default function TerminalModal({ onClose, onEasterEgg }: TerminalProps) {
  const { input, setInput, messages, showMatrix, executeCommand } =
    useTerminalLogic(onEasterEgg);
  const { messagesEndRef, inputRef } = useTerminalEffects(messages);


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#191819] rounded-lg w-full max-w-2xl h-[500px] flex flex-col overflow-hidden border border-[#5730E6]">
        <TerminalHeader onClose={onClose} />
        <TerminalContent
          messages={messages}
          showMatrix={showMatrix}
          messagesEndRef={messagesEndRef}
        />
        <TerminalInput
          input={input}
          setInput={setInput}
          executeCommand={executeCommand}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
