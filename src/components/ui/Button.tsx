// components/ui/Button.tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "icon";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  variant = "primary",
  size = "md",
  shape = "rounded",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition";
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const shapeStyles =
    shape === "circle" ? "rounded-full p-2 aspect-square" : "rounded-md";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    icon: "bg-transparent hover:bg-gray-100 text-gray-600",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${shapeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
