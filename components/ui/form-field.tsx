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
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type: "text" | "email" | "url" | "number";
  placeholder?: string;
  icon?: React.ReactNode;
  register: UseFormRegister<any>;
  min?: number;
  max?: number;
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  register: UseFormRegister<any>;
}

interface SelectFormFieldProps extends BaseFormFieldProps {
  type: "select";
  placeholder?: string;
  options: { value: string; label: string }[];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

interface PhoneFormFieldProps extends BaseFormFieldProps {
  type: "phone";
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

interface DateFieldProps extends BaseFormFieldProps {
  type: "date";
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

type FormFieldProps =
  | InputFormFieldProps
  | TextareaFormFieldProps
  | SelectFormFieldProps
  | PhoneFormFieldProps
  | DateFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, name, error, required = false, className = "" } = props;

  const renderInput = () => {
    if (props.type === "textarea") {
      return (
        <Textarea
          id={name}
          {...props.register(name)}
          placeholder={props.placeholder}
          rows={props.rows || 4}
          className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
        />
      );
    }

    if (props.type === "select") {
      return (
        <Select
          value={props.watch(name)}
          onValueChange={(value) => props.setValue(name, value)}
        >
          <SelectTrigger
            className={`w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
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
        <PhoneInput
          value={props.watch(name)}
          onChange={(value) => props.setValue(name, value)}
          placeholder={props.placeholder}
          className={className}
        />
      );
    }

    if (props.type === "date") {
      const [open, setOpen] = useState(false);

      return (
        <div className="flex flex-col gap-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className={`flex justify-between border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
              >
                {props.watch(name)
                  ? new Date(props.watch(name)).toLocaleDateString()
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
                  props.watch(name) ? new Date(props.watch(name)) : undefined
                }
                onSelect={(date) => {
                  if (date) {
                    props.setValue(name, date.toISOString());
                  }
                  setOpen(false);
                }}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
      ...props.register(name),
      className: `border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`,
    };

    return <Input {...inputProps} />;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label} {required && "*"}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export { FormField };
