import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-1/2 justify-center text-center">
      <TypographyH1 className="text-6xl font-extrabold mb-2">404</TypographyH1>

      <TypographyH2 className="text-2xl font-bold mb-4">Page Not Found</TypographyH2>

      <TypographyP className="mb-6 max-w-md">
        Oops! Looks like the page you are looking for doesn&#8217;t exist or you wandered off track.
      </TypographyP>

      <Link to="/">
        <Button variant="default" size="lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
