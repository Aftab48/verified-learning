
import { Shield } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

export const TrialStatus = () => {
  const { isLoading, remainingDays, isActive } = useSubscription();

  if (isLoading) {
    return null;
  }

  if (!isActive) {
    return (
      <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span>Trial expired. Subscribe to continue learning.</span>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 text-primary px-4 py-2 rounded-md flex items-center gap-2">
      <Shield className="h-4 w-4" />
      <span>{remainingDays} days remaining in trial</span>
    </div>
  );
};
