export type Message = {
  type: "input" | "output" | "error" | "success";
  content: string;
};

export type ContactData = {
  name: string;
  email: string;
  title: string;
  description: string;
};

export type TerminalStep = null | "name" | "email" | "title" | "description";
