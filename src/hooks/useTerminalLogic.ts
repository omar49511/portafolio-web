import { useState, useEffect, useRef } from "react";
import { Message, ContactData } from "@/types/terminalTypes";

export const useTerminalLogic = (onEasterEgg?: () => void) => {
  const SECRET_CODE = "d3#hg5";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "output",
      content:
        "¡Bienvenido al terminal interactivo! Escribe 'help' para ver los comandos disponibles.",
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
        { type: "output", content: `Nombre: ${input}` },
        { type: "output", content: "Introduce tu correo electrónico:" },
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
          {
            type: "error",
            content:
              "Por favor, introduce una dirección de correo electrónico válida.",
          },
          { type: "output", content: "Introduce tu correo electrónico:" },
          { type: "output", content: "> " },
        ]);
        setInput("");
        return true;
      }

      setContactData((prev) => ({ ...prev, email: input }));
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "output", content: `Correo electrónico: ${input}` },
        { type: "output", content: "Introduce el título del mensaje:" },
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
        { type: "output", content: `Título: ${input}` },
        { type: "output", content: "Introduce la descripción:" },
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
        { type: "output", content: `Descripción: ${input}` },
        { type: "output", content: "Enviando mensaje..." },
      ]);

      setTimeout(() => {
        playSound("/sounds/success.mp3", 0.3);
        setMessages((prev) => [
          ...prev,
          { type: "success", content: "✅ ¡Mensaje enviado con éxito!" },
          {
            type: "output",
            content: `De: ${contactData.name} (${contactData.email})`,
          },
          { type: "output", content: `Asunto: ${contactData.title}` },
          { type: "output", content: `Mensaje: ${input}` },
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
          { type: "output", content: "Comandos disponibles:" },
          {
            type: "output",
            content: "- help: Muestra los comandos disponibles",
          },
          { type: "output", content: "- contact: Envía un mensaje" },
          { type: "output", content: "- clear: Limpia el terminal" },
          { type: "output", content: "- [código secreto]: ??????" },
          { type: "output", content: "> " },
        ]);
        break;

      case "contact":
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: "Introduce tu nombre:" } as Message,
          { type: "output", content: "> " } as Message,
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
              "¡Bienvenido al terminal interactivo! Escribe 'help' para ver los comandos disponibles.",
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
            content: `Comando no encontrado: ${command}. Escribe 'help' para ver los comandos disponibles.`,
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
