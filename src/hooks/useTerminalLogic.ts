import { useState, useEffect, useRef } from "react";
import { Message, ContactData } from "@/types/terminalTypes";

// type Message = {
//   type: "input" | "output" | "error" | "success";
//   content: string;
// };

// type ContactData = {
//   name: string;
//   email: string;
//   title: string;
//   description: string;
// };

export const useTerminalLogic = (onEasterEgg?: () => void) => {
  const SECRET_CODE = "d3#hg5";
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
  const prevInputLengthRef = useRef<number>(0);

  const playSound = (src: string, volume: number = 0.3) => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  const handleContactProcess = () => {
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
      return true;
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
        return true;
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
      return true;
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
      return true;
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
      return true;
    }

    return false;
  };

  const handleCommand = (command: string) => {
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
          { type: "output", content: "- [secret code]: ??????" },
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

      case SECRET_CODE:
        // successAudioRef.current?.play().catch(() => {})
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "success",
            content: "🎉 ¡Código secreto activado! Iniciando secuencia...",
          },
          { type: "output", content: "> " },
        ]);
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 10000);
        if (onEasterEgg) onEasterEgg();
        // Resetear el código secreto para que el usuario pueda volver a buscarlo
        localStorage.removeItem("secretCodeChars");
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
  };

  const executeCommand = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { type: "input", content: `> ${input}` },
      { type: "output", content: "> " },
    ]);

    const command = input.toLowerCase().trim();

    if (!handleContactProcess()) {
      handleCommand(command);
    }

    setInput("");
  };

  useEffect(() => {
    if (input.length > prevInputLengthRef.current) {
      playSound("/sounds/key-press.mp3", 0.9);
    } else if (input.length < prevInputLengthRef.current) {
      playSound("/sounds/key-delete.mp3", 0.2);
    }
    prevInputLengthRef.current = input.length;
  }, [input]);

  return {
    input,
    setInput,
    messages,
    showMatrix,
    executeCommand,
  };
};
