import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

export default async function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <span className="text-[8rem] sm:text-[10rem] font-extrabold leading-none bg-gradient-to-b from-primary/40 to-transparent bg-clip-text text-transparent select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl font-semibold text-foreground mt-8">
            Page Not Found
          </span>
        </div>
      </div>

      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try using the command palette to find what you need.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" prefetch={true}>
          <Button className="active:scale-95 transition-transform">
            <HomeIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Tip: Press{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
          Ctrl+K
        </kbd>{" "}
        to search
      </p>

      <Link
        href="/"
        className="mt-8 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
      >
        <ArrowLeftIcon className="w-3 h-3" />
        Go back
      </Link>
    </div>
  );
}
