import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-8.5 w-full min-w-0 rounded-lg border bg-transparent px-4 py-3 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none",
        "aria-invalid:ring-red-400/20 aria-invalid:border-red-400",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
