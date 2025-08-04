import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Alert variant="destructive" className="w-full max-w-md bg-destructive/10 border-destructive/20">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-destructive-foreground">
        {message}
      </AlertDescription>
    </Alert>
  );
};