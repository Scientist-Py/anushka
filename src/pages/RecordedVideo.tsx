import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecordedVideo = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState("");
  const [dressType, setDressType] = useState("");

  // Recorded video ke prices yahan define kiye hain
  const durationPrices: Record<string, number> = {
    "25": 579,
    "35": 789,
    "45": 999,
  };

  const dressTypePrices: Record<string, number> = {
    "Stripping Black Saree": 0,
    "Stripping Red Saree": 99,
    "Bikni Stipping ": 149,
    "Black Top Stipping": 199,
    "Custom": 349,
  };

  const calculateTotal = () => {
    const durationPrice = durationPrices[duration] || 0;
    const dressPrice = dressTypePrices[dressType] || 0;
    return durationPrice + dressPrice;
  };

  const total = calculateTotal();
  const canConfirm = duration !== "" && dressType !== "";
  const includesPhotos = duration === "45";
  const includes4KImages = duration === "45";

  const handleConfirm = () => {
    if (canConfirm) { // Check kiya options set hain
      navigate("/payment", { // Payment page par redirect kiya
        state: {
          total,
          service: "Recorded Video Session",
          details: `${duration} min video • ${dressType}${includes4KImages ? ' • 40 4K quality nude images Free' : ''}`
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Main Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-medium">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Recorded Video Session</h1>
            <p className="text-muted-foreground">
              Select your preferred video duration and receive a professionally recorded session
            </p>
          </div>

          <div className="space-y-6">
            {/* Duration Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Duration
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Choose duration..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 minutes — ₹579</SelectItem>
                  <SelectItem value="35">35 minutes — ₹789</SelectItem>
                  <SelectItem value="45">45 minutes — ₹999 🔥 OFFER</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dress Type Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Dress Type
              </label>
              <Select value={dressType} onValueChange={setDressType}>
                <SelectTrigger className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Choose dress type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stripping Black Saree">Stripping Black Saree — ₹0</SelectItem>
                  <SelectItem value="Stripping Red Saree">Stripping Red Saree — +₹99</SelectItem>
                  <SelectItem value="Bikni Stipping ">Bikni Stipping — +₹149</SelectItem>
                  <SelectItem value="Black Top Stipping">Black Top Stipping — +₹199</SelectItem>
                  <SelectItem value="Custom">Custom — +₹349</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bonus 4K Images Notice */}
            {includes4KImages && (
              <div className="bg-accent/50 border border-accent rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Bonus Included!</div>
                    <div className="text-sm text-muted-foreground">
                      Includes <span className="font-bold text-black">40</span> 4K quality Nude images 📸
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price Display */}
            {canConfirm && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Your Total</span>
                </div>
                <div className="text-4xl font-bold text-primary">
                  ₹{total.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {duration} min recorded video • {dressType}{includes4KImages ? ' + 40 4K images' : ''}
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full mt-8"
              onClick={handleConfirm}
              disabled={!canConfirm}
            >
              Confirm Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordedVideo;
