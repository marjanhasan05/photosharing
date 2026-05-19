type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // ✅ Native Tailwind sizes
  const sizeStyles = {
    sm: "text-xs",
    md: "text-sm",
  };

  // ✅ Native Tailwind colors ONLY
  const variants = {
    light: {
      primary:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      success:
        "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
      error: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
      warning:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
      info: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
      light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300",
      dark: "bg-gray-800 text-white dark:bg-white/10 dark:text-white",
    },

    solid: {
      primary: "bg-blue-600 text-white",
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      warning: "bg-yellow-500 text-white",
      info: "bg-sky-600 text-white",
      light: "bg-gray-300 text-gray-900",
      dark: "bg-gray-900 text-white",
    },
  };

  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
