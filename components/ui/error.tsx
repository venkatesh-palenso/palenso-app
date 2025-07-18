import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry, 
  className = "" 
}: ErrorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-6 ${className}`}>
      <AlertCircle className="w-12 h-12 text-destructive" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Error
        </h3>
        <p className="text-muted-foreground mb-4">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error; 