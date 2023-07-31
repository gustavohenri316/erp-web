import React from "react";

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  size,
  variant,
  children,
  disabled,
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-neutral-100";
      case "secondary":
        return "border-gray-600 text-gray-600 hover:bg-gray-500 hover:text-neutral-100";
      case "danger":
        return "border-red-600 text-red-600 hover:bg-red-600 hover:text-neutral-100";
      case "success":
        return "border-green-600 text-gray-600 hover:bg-green-500 hover:text-neutral-100";
      default:
        return "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-neutral-100";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-1 py-1 text-sm";
      case "md":
        return "px-2 py-2 text-base";
      case "lg":
        return "px-3 py-3 text-lg";
      default:
        return "px-1 py-1 text-sm";
    }
  };

  return (
    <button
      disabled={disabled}
      className={`border rounded focus:outline-none focus:ring ${getVariantClasses()} ${getSizeClasses()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
