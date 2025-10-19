import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export function SpinnerButton() {
          return (
            <div className="flex flex-col items-center gap-4">
              <Button disabled size="sm">
                <Spinner />
                Loading...
              </Button>
            </div>
          )
        }