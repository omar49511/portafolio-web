"use client";

import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

export default function TerminalModal({ onClose, themeColor }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "output",
      content:
        "Welcome to the interactive terminal! Type 'help' to see available commands.",
    },
    { type: "output", content: "> " },
  ]);
  const [contactStep, setContactStep] = useState(null);
  const [contactData, setContactData] = useState({
    title: "",
    description: "",
  });
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  // Process command
  const handleCommand = () => {
    if (input.trim() === "") return;

    // Add user input to messages
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { type: "input", content: `> ${input}` },
      { type: "output", content: "> " },
    ]);

    // Handle contact form steps
    if (contactStep === "title") {
      setContactData((prev) => ({ ...prev, title: input }));
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "output", content: `Title: ${input}` },
        { type: "output", content: "Enter description:" },
        { type: "output", content: "> " },
      ]);
      setContactStep("description");
      setInput("");
      return;
    }

    if (contactStep === "description") {
      setContactData((prev) => ({ ...prev, description: input }));
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "output", content: `Description: ${input}` },
        { type: "output", content: "Sending message..." },
        { type: "success", content: "✅ Message sent successfully!" },
        { type: "output", content: "> " },
      ]);
      setContactStep(null);
      setInput("");
      return;
    }

    // Process regular commands
    const command = input.toLowerCase().trim();

    switch (command) {
      case "help":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "output",
            content:
              "Available commands: help, skills, projects, contact, easter-egg",
          },
          { type: "output", content: "> " },
        ]);
        break;

      case "skills":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: "Skills:" },
          { type: "output", content: "- React (70%)" },
          { type: "output", content: "- Next.js (70%)" },
          { type: "output", content: "- CSS (70%)" },
          { type: "output", content: "- PHP (70%)" },
          { type: "output", content: "- C# (70%)" },
          { type: "output", content: "> " },
        ]);
        break;

      case "projects":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: "Projects:" },
          {
            type: "output",
            content: "1. E-commerce Platform - https://example.com/project1",
          },
          {
            type: "output",
            content: "2. Portfolio Website - https://example.com/project2",
          },
          {
            type: "output",
            content: "3. Task Management App - https://example.com/project3",
          },
          {
            type: "output",
            content: "4. Social Media Dashboard - https://example.com/project4",
          },
          { type: "output", content: "> " },
        ]);
        break;

      case "contact":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: "Enter title:" },
          { type: "output", content: "> " },
        ]);
        setContactStep("title");
        break;

      case "easter-egg":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "output",
            content: "🎈🎉 Activating secret mode... Enjoy the show! 🎉🎈",
          },
          { type: "output", content: "> " },
        ]);
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 10000); // Hide after 10 seconds
        break;

      default:
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "error",
            content: `Command not found: ${command}. Type 'help' for available commands.`,
          },
          { type: "output", content: "> " },
        ]);
    }

    setInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl h-[500px] flex flex-col overflow-hidden border border-gray-800">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
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
            <MdClose className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-gray-950 text-gray-300">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-1 ${
                message.type === "error"
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

        {/* Terminal input */}
        <div className="p-2 bg-gray-800 border-t border-gray-700 flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-white font-mono"
            placeholder="Type a command..."
          />
        </div>
      </div>

      {/* Easter egg animation */}
      {showEasterEgg && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {i % 5 === 0
                ? "🚀"
                : i % 5 === 1
                ? "💻"
                : i % 5 === 2
                ? "⚛️"
                : i % 5 === 3
                ? "🔥"
                : "✨"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
