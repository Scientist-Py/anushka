import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Globe, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VideoCall = () => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("");
  const [duration, setDuration] = useState("");
  const [dressType, setDressType] = useState("");

  // Duration ke hisab se prices set kiye hain
  const durationPrices: Record<string, number> = {
    "10": 339,
    "15": 399,
    "25": 499,
    "30": 599,
    "45": 799,
  };

  // Dress type ke extra charges yahan hain
  const dressTypePrices: Record<string, number> = {
    "Stripping Black Saree": 0,
    "Stripping Red Saree": 99,
    "Bikni Stipping ": 149,
    "Black Top Stipping": 199,
    "Custom": 349,
  };

  const platformPrices: Record<string, number> = {
    "Website": 0,
    "Telegram": 0,
    "WhatsApp": 150,
  };

  const calculateTotal = () => {
    const durationPrice = durationPrices[duration] || 0; // Duration ka price
    const dressPrice = dressTypePrices[dressType] || 0; // Dress type ka extra charge
    const platformPrice = platformPrices[platform] || 0; // Platform ka extra charge
    return durationPrice + dressPrice + platformPrice; // Sabko jod ke total
  };

  const total = calculateTotal(); // Total price calculate kiya
  const canConfirm = platform && duration && dressType; // Check kiya ki saare options select hue hain ya nahi

  // Confirm button click hone par kya hoga
  const handleConfirm = () => {
    if (canConfirm) { // Agar saare options select hue hain
      navigate("/payment", { // Payment page par navigate karo
        state: { // State data pass karo
          total, // Total amount
          service: "Live Video Call", // Service ka naam
          details: `${platform} • ${duration} min • ${dressType}` // Details string banayi
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Live Video Call</h1>
            <p className="text-muted-foreground">
              Choose your platform, duration, and consultation type
            </p>
          </div>

          {/* Platform Info Box */}
          <div className="bg-accent/50 border border-accent rounded-2xl p-5 mb-8">
            <h3 className="font-semibold mb-2">📱 Choose Your Platform</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Website:</strong> Video call directly on our platform (private) <br />
              <strong>Telegram:</strong> Call via Telegram (username only) <br />
              <strong>WhatsApp:</strong> Call via WhatsApp (shares your phone number) — <strong className="text-primary">+₹150</strong>
            </p>
            <p className="text-xs text-destructive mt-3 font-medium">
              ⚠️ Number is confidential. If found spamming on WhatsApp, you will be blocked directly.
            </p>
          </div>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Platform (Where to do the call?)
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setPlatform("Website")}
                  className={`p-4 rounded-xl border-2 text-left transition-smooth ${platform === "Website"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform === "Website" ? "bg-primary text-white" : "bg-secondary"
                      }`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Website</div>
                      <div className="text-xs text-muted-foreground">Most private — no contact details shared</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("Telegram")}
                  className={`p-4 rounded-xl border-2 text-left transition-smooth ${platform === "Telegram"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform === "Telegram" ? "bg-primary text-white" : "bg-secondary"
                      }`}>
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Telegram</div>
                      <div className="text-xs text-muted-foreground">Semi-private — username only</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("WhatsApp")}
                  className={`p-4 rounded-xl border-2 text-left transition-smooth ${platform === "WhatsApp"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform === "WhatsApp" ? "bg-primary text-white" : "bg-secondary"
                      }`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">WhatsApp <span className="text-primary text-xs">+₹150</span></div>
                      <div className="text-xs text-muted-foreground">⚠️ Shares your phone number</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

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
                  <SelectItem value="10">10 minutes — ₹339</SelectItem>
                  <SelectItem value="15">15 minutes — ₹399</SelectItem>
                  <SelectItem value="25">25 minutes — ₹499</SelectItem>
                  <SelectItem value="30">30 minutes — ₹599</SelectItem>
                  <SelectItem value="45">45 minutes — ₹799</SelectItem>
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
                  {platform} • {duration} min • {dressType} dress type
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

export default VideoCall;
