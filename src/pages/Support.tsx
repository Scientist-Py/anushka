import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    reason: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.reason || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Support request submitted successfully! We'll get back to you soon.");

    setTimeout(() => {
      navigate("/");
    }, 2000);
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Let's fix this 🛠️</h1>
            <p className="text-muted-foreground">
              Having trouble? Fill out the form below and we'll help you resolve the issue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-3">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Email or Telegram */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-3">
                Email or Telegram ID
              </label>
              <Input
                id="contact"
                type="text"
                placeholder="email@example.com or @telegram_username"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Reason
              </label>
              <Select value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
                <SelectTrigger className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Choose a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment-deducted">Payment deducted but not received</SelectItem>
                  <SelectItem value="video-call-issue">Video Call Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-3">
                Short Message
              </label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-32 rounded-xl resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full mt-8"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Support Request
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-accent/50 rounded-xl border border-accent">
            <p className="text-sm text-muted-foreground text-center">
              💡 We typically respond within 2-4 hours during business hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
