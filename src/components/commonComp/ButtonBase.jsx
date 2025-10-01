import { Button } from "@mui/material";

export default function ButtonBase({
  children,
  variant = "contained", // "contained" | "outlined" | "text"
  color = "amber",
  className = "",
  ...props
}) {
  const baseStyles = {
    amber: {
      contained: "!bg-amber-500 !hover:bg-amber-600 !text-white",
      outlined: "!border-amber-500 !text-amber-500 hover:!bg-amber-50",
      text: "!text-amber-600 hover:!underline",
    },
    gray: {
      contained: "!bg-gray-400 !hover:bg-gray-500 !text-white",
      outlined: "!border-gray-400 !text-gray-600 hover:!bg-gray-50",
      text: "!text-gray-600 hover:!underline",
    },
  };

  const variantStyles =
    baseStyles[color]?.[variant] || baseStyles.gray.contained;

  return (
    <Button
      variant={variant}
      className={`${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}