import React from "react";

const Input = ({
  label,
  error,
  type = "text",
  className = "",
  required = false,
  ...props
}) => {
  const inputClasses = `w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ${
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  } ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input type={type} className={inputClasses} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
