import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function NotFoundPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-140px)] p-6 bg-background text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        <span className="text-8xl font-bold text-primary/20 leading-none">
          404
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-muted-foreground text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
