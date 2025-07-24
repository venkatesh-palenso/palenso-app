import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  error,
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          {...register(name)}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-colors"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default PasswordField;
