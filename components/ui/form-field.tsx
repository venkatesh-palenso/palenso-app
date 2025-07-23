import React, { useState } from "react";

import {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AlertCircle, ChevronDownIcon } from "lucide-react";

// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface BaseFormFieldProps {
  label: string;
  name: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type: "text" | "email" | "url" | "number";
  placeholder?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  min?: number;
  max?: number;
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

interface SelectFormFieldProps extends BaseFormFieldProps {
  type: "select";
  placeholder?: string;
  options: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  disabled?: boolean;
}

interface PhoneFormFieldProps extends BaseFormFieldProps {
  type: "phone";
  placeholder?: string;
  rightIcon?: React.ReactNode;
  onBlur?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
}

interface DateFieldProps extends BaseFormFieldProps {
  type: "date";
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  disabled?: boolean;
}

type FormFieldProps =
  | InputFormFieldProps
  | TextareaFormFieldProps
  | SelectFormFieldProps
  | PhoneFormFieldProps
  | DateFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    label,
    name,
    error,
    required = false,
    className = "",
    disabled = false,
  } = props;
  const [open, setOpen] = useState(false);

  const renderInput = () => {
    if (props.type === "textarea") {
      return (
        <div
          className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${error ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" : ""} ${className}`}
        >
          <Textarea
            id={name}
            {...props.register(name)}
            placeholder={props.placeholder}
            rows={props.rows || 4}
            disabled={disabled}
            className="border-0 px-4 py-3 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none bg-transparent resize-none h-full"
          />
        </div>
      );
    }

    if (props.type === "select") {
      return (
        <Select
          value={props.watch(name) as string}
          onValueChange={(value) => props.setValue(name, value)}
          disabled={disabled}
        >
          <SelectTrigger
            className={`w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 flex items-center justify-between text-sm px-4 py-0 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
          >
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (props.type === "phone") {
      return (
        <div
          className={`flex items-center gap-3 px-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${error ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" : ""} ${className}`}
        >
          <PhoneInput
            value={props.watch(name) as string}
            onChange={(value) => props.setValue(name, value)}
            placeholder={props.placeholder}
            disabled={disabled}
            onBlur={props.onBlur}
            className="flex-1 border-0 px-0 py-0 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none bg-transparent"
          />
          {props.rightIcon && (
            <div className="text-gray-400 flex-shrink-0">{props.rightIcon}</div>
          )}
        </div>
      );
    }

    if (props.type === "date") {
      return (
        <div
          className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${error ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" : ""} ${className}`}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                disabled={disabled}
                className={`w-full justify-between px-4 py-0 bg-transparent border-0 text-left flex items-center focus:ring-0 focus:border-0 focus:outline-none`}
              >
                {props.watch(name)
                  ? new Date(props.watch(name) as string).toLocaleDateString()
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={
                  props.watch(name)
                    ? new Date(props.watch(name) as string)
                    : undefined
                }
                onSelect={(date) => {
                  if (date) {
                    props.setValue(name, date.toISOString());
                  }
                  setOpen(false);
                }}
                className="input-handshake"
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    // Input field
    const inputProps = {
      id: name,
      type: props.type,
      placeholder: props.placeholder,
      min: props.min,
      max: props.max,
      disabled: disabled,
      ...props.register(name),
      className: `input-handshake ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`,
    };

    // If icon is provided, wrap input with icon
    if (props.icon || props.rightIcon) {
      return (
        <div
          className={`flex items-center gap-3 px-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${error ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" : ""} ${className}`}
        >
          {props.icon && (
            <div className="text-gray-400 flex-shrink-0">{props.icon}</div>
          )}
          <Input
            {...inputProps}
            className="flex-1 border-0 py-0 px-0 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none bg-transparent"
          />
          {props.rightIcon && (
            <div className="text-gray-400 flex-shrink-0">{props.rightIcon}</div>
          )}
        </div>
      );
    }

    // Regular input without icons
    return (
      <div
        className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${error ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500" : ""} ${className}`}
      >
        <Input
          {...inputProps}
          className="border-0 px-3 py-0 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none bg-transparent w-full"
        />
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export { FormField };
