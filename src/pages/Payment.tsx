import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import QRCode from "qrcode";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  const { total, service, details } = location.state || {
    total: 0,
    service: "Consultation",
    details: "",
  };

  // Generate QR code for UPI payment
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const upiId = "ayushiraoo@ybl";
        const upiString = `upi://pay?pa=${upiId}&am=${total}&cu=INR&tn=Video Call Payment`;
        const qrCodeDataURL = await QRCode.toDataURL(upiString, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataURL(qrCodeDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (total > 0) {
      generateQRCode();
    }
  }, [total]);

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
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-medium">
          {/* Order Summary */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">Review your order and proceed with payment</p>
          </div>

          {/* Service Details */}
          <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            
            {/* Service Type */}
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Service Type</span>
              <span className="text-sm font-semibold">{service}</span>
            </div>
            
            {/* Platform */}
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Platform</span>
              <span className="text-sm font-semibold">{details.split(' • ')[0] || 'Website'}</span>
            </div>
            
            {/* Duration */}
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Duration</span>
              <span className="text-sm font-semibold">{details.split(' • ')[1] || 'N/A'}</span>
            </div>
            
            {/* Dress Type */}
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Dress Type</span>
              <span className="text-sm font-semibold">{details.split(' • ')[2] || 'N/A'}</span>
            </div>
            
            {/* Additional Info (for recorded videos) */}
            {details.includes('4K quality') && (
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Bonus</span>
                <span className="text-sm font-semibold text-primary">40 4K Quality Images</span>
              </div>
            )}
            
            {/* Total Amount */}
            <div className="flex items-center justify-between py-4 mt-4 bg-primary/5 rounded-xl px-4">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-3xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white dark:bg-card rounded-2xl p-8 text-center mb-8 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Scan to Pay via UPI</h3>
            <div className="w-64 h-64 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4 border border-border">
              {qrCodeDataURL ? (
                <img 
                  src={qrCodeDataURL} 
                  alt="UPI QR Code" 
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-32 h-32 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Generating QR Code...</p>
                </div>
              )}
            </div>
            <div className="bg-primary/5 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-primary">UPI ID: ayushiraoo@ybl</p>
              <p className="text-lg font-bold text-primary">Amount: ₹{total.toLocaleString('en-IN')}</p>
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
