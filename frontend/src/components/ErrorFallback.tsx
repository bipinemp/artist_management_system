import { useErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export function ErrorFallback({}) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div
      role="alert"
      className="flex w-fit justify-center h-full flex-col items-center gap-y-4"
    >
      <h2 className="text-destructive">Something went wrong.</h2>
      <Button
        className="w-fit px-7 flex items-center gap-x-2"
        onClick={resetBoundary}
      >
        <RotateCcw className="size-5" />
        Try again
      </Button>
    </div>
  );
}
