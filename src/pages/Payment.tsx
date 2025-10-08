import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { total, service, details } = location.state || {
    total: 0,
    service: "Consultation",
    details: "",
  };

  const handlePayment = () => {
    if (agreedToTerms) {
      navigate("/verification");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Main Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-medium animate-fade-in">
          {/* Order Summary */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">Review your order and proceed with payment</p>
          </div>

          {/* Service Details */}
          <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
            <div className="text-sm text-muted-foreground mb-1">Service</div>
            <div className="text-xl font-semibold mb-3">{service}</div>
            <div className="text-sm text-muted-foreground">{details}</div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-3xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white dark:bg-card rounded-2xl p-8 text-center mb-8 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Scan to Pay via UPI</h3>
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-secondary/50 to-accent/50 rounded-2xl flex items-center justify-center mb-4">
              <div className="text-center text-muted-foreground">
                <QrCode className="w-32 h-32 mx-auto mb-2 opacity-30" />
                <p className="text-sm">QR Code Placeholder</p>
                <p className="text-xs mt-1">your-UPI-ID-here</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Use any UPI app to scan and complete payment
            </p>
          </div>

          {/* Guidelines */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-lg">Important Guidelines</h3>
            
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium">No Recording Policy:</span> If we find you recording the video call, the call will be cut instantly and no refund will be given.
              </div>
            </div>

            <div className="bg-accent/50 border border-accent rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium">Age Verification:</span> By proceeding, you confirm you are 18 years or older and have read all guidelines.
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 mb-8 p-4 bg-secondary/30 rounded-xl">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I confirm I am 18+ and have read all guidelines. I understand the no-recording policy and agree to all terms and conditions.
            </label>
          </div>

          {/* Payment Button */}
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handlePayment}
            disabled={!agreedToTerms}
          >
            I Have Paid
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Please ensure payment is complete before clicking the button above
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
