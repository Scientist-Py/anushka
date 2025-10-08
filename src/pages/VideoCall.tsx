import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
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
  const [duration, setDuration] = useState("");
  const [dressType, setDressType] = useState("");

  // Pricing logic
  const durationPrices: Record<string, number> = {
    "10": 500,
    "15": 750,
    "25": 1200,
    "30": 1500,
    "45": 2200,
  };

  const dressTypePrices: Record<string, number> = {
    "Casual": 0,
    "Formal": 200,
    "Party": 300,
    "Traditional": 400,
    "Custom": 500,
  };

  const calculateTotal = () => {
    const durationPrice = durationPrices[duration] || 0;
    const dressPrice = dressTypePrices[dressType] || 0;
    return durationPrice + dressPrice;
  };

  const total = calculateTotal();
  const canConfirm = duration && dressType;

  const handleConfirm = () => {
    if (canConfirm) {
      navigate("/payment", { 
        state: { 
          total, 
          service: "Video Call Consultation",
          details: `${duration} min • ${dressType}`
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
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-medium animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Video Call Consultation</h1>
            <p className="text-muted-foreground">
              Select your preferred duration and consultation type
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
                  <SelectItem value="10">10 minutes — ₹500</SelectItem>
                  <SelectItem value="15">15 minutes — ₹750</SelectItem>
                  <SelectItem value="25">25 minutes — ₹1,200</SelectItem>
                  <SelectItem value="30">30 minutes — ₹1,500</SelectItem>
                  <SelectItem value="45">45 minutes — ₹2,200</SelectItem>
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
                  <SelectItem value="Casual">Casual — ₹0</SelectItem>
                  <SelectItem value="Formal">Formal — +₹200</SelectItem>
                  <SelectItem value="Party">Party — +₹300</SelectItem>
                  <SelectItem value="Traditional">Traditional — +₹400</SelectItem>
                  <SelectItem value="Custom">Custom — +₹500</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Display */}
            {canConfirm && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Your Total</span>
                </div>
                <div className="text-4xl font-bold text-primary">
                  ₹{total.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {duration} min consultation • {dressType} dress type
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
