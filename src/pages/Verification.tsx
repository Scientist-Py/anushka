import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Verification = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-12 shadow-medium text-center animate-fade-in">
          {isVerifying ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <Loader2 className="w-20 h-20 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Verifying Payment</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your transaction...
              </p>
              <div className="mt-8">
                <div className="flex gap-2 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-destructive">Payment Failed</h2>
              <p className="text-muted-foreground mb-8">
                We could not verify your transaction. Please contact support if you have already made the payment.
              </p>
              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => navigate("/support")}
              >
                Need Support
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-3"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
