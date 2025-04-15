"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import MatrixEffect from "@/components/matrix-effect";

type TerminalProps = {
  onClose: () => void;
  themeColor: string;
  onEasterEgg?: () => void;
};

type Message = {
  type: "input" | "output" | "error" | "success";
  content: string;
};

type ContactData = {
  name: string;
  email: string;
  title: string;
  description: string;
};

export default function TerminalModal({
  onClose,
  themeColor,
  onEasterEgg,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "output",
      content:
        "Welcome to the interactive terminal! Type 'help' to see available commands.",
    },
    { type: "output", content: "> " },
  ]);
  const [contactStep, setContactStep] = useState<
    null | "name" | "email" | "title" | "description"
  >(null);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    title: "",
    description: "",
  });
  const [showMatrix, setShowMatrix] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevInputLengthRef = useRef<number>(0);

  const playSound = (src: string, volume: number = 0.3) => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (input.length > prevInputLengthRef.current) {
      playSound("/sounds/key-press.mp3", 0.9);
    } else if (input.length < prevInputLengthRef.current) {
      playSound("/sounds/key-delete.mp3", 0.2);
    }
    prevInputLengthRef.current = input.length;
  }, [input]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand();
  };

  const handleCommand = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { type: "input", content: `> ${input}` },
      { type: "output", content: "> " },
    ]);

    if (contactStep === "name") {
      setContactData((prev) => ({ ...prev, name: input }));
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "output", content: `Name: ${input}` },
        { type: "output", content: "Enter your email:" },
        { type: "output", content: "> " },
      ]);
      setContactStep("email");
      setInput("");
      return;
    }

    if (contactStep === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        playSound("/sounds/error.mp3", 0.3);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "error", content: "Please enter a valid email address." },
          { type: "output", content: "Enter your email:" },
          { type: "output", content: "> " },
        ]);
        setInput("");
        return;
      }

      setContactData((prev) => ({ ...prev, email: input }));
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "output", content: `Email: ${input}` },
        { type: "output", content: "Enter message title:" },
        { type: "output", content: "> " },
      ]);
      setContactStep("title");
      setInput("");
      return;
    }

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
      ]);

      setTimeout(() => {
        playSound("/sounds/success.mp3", 0.3);
        setMessages((prev) => [
          ...prev,
          { type: "success", content: "✅ Message sent successfully!" },
          {
            type: "output",
            content: `From: ${contactData.name} (${contactData.email})`,
          },
          { type: "output", content: `Subject: ${contactData.title}` },
          { type: "output", content: `Message: ${input}` },
          { type: "output", content: "> " },
        ]);
        setContactStep(null);
        setInput("");
      }, 1500);
      return;
    }

    const command = input.toLowerCase().trim();
    playSound("/sounds/command.mp3", 0.3);

    switch (command) {
      case "help":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: "Available commands:" },
          { type: "output", content: "- help: Show available commands" },
          { type: "output", content: "- skills: List technologies and skills" },
          { type: "output", content: "- projects: Show projects with links" },
          { type: "output", content: "- contact: Send a message" },
          { type: "output", content: "- clear: Clear the terminal" },
          { type: "output", content: "- easter-egg: ??????" },
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
          { type: "output", content: "Enter your name:" },
          { type: "output", content: "> " },
        ]);
        setContactStep("name");
        break;

      case "easter-egg":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "output",
            content: "Initializing Matrix... Follow the white rabbit.",
          },
          { type: "output", content: "> " },
        ]);
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 10000);
        break;

      case "clear":
        setMessages([
          {
            type: "output",
            content:
              "Welcome to the interactive terminal! Type 'help' to see available commands.",
          },
          { type: "output", content: "> " },
        ]);
        break;

      default:
        playSound("/sounds/error.mp3", 0.3);
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
      <div className="bg-[#191819] rounded-lg w-full max-w-2xl h-[500px] flex flex-col overflow-hidden border border-[#5730E6]">
        {/* Terminal header */}
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

        {/* Terminal content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-[#191819] text-gray-300 relative">
          {showMatrix && <MatrixEffect />}
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
        <div className="p-2 bg-[#5730E6] border-t border-gray-700 flex items-center">
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
    </div>
  );
}
