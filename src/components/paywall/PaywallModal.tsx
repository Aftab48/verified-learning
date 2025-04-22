
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PaywallModalProps {
  open: boolean;
  onAcknowledge: () => void;
}

const PaywallModal = ({ open, onAcknowledge }: PaywallModalProps) => {
  useEffect(() => {
    // Prevent background scroll when modal is open
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-background max-w-md w-[90vw] rounded-xl shadow-2xl p-8 text-center relative flex flex-col items-center">
        <img
          src="/images/home-2.jpg"
          alt="VerifiedLearn Logo"
          className="w-16 h-16 mx-auto mb-4 object-contain"
          style={{
            filter: "drop-shadow(0 2px 6px #9b87f555)",
          }}
        />
        <h2 className="text-xl font-semibold mb-2 text-primary">Welcome to VerifiedLearn!</h2>
        <div className="text-base text-muted-foreground mb-4">
          <div>
            <span className="font-bold text-primary">Enjoy 3 months free,</span> then only <span className="font-bold text-green-700">₹500/month</span> for unlimited access to verified courses.
          </div>
          <div className="mt-2 text-sm text-secondary-foreground">
            You won't be charged until your free trial ends.<br/>You can cancel anytime.
          </div>
        </div>
        <Button className="w-full mt-2" onClick={onAcknowledge}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PaywallModal;
