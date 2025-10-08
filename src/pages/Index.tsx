import { Link } from "react-router-dom";
import { Video, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-blue-500 bg-clip-text text-transparent">
            Professional Consulting Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect consultation format for your needs — live video call or recorded video session
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Video Call Card */}
          <Link to="/video-call" className="group">
            <div className="glass-card rounded-3xl p-8 shadow-soft hover:shadow-medium transition-smooth transform hover:scale-[1.02]">
              <div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Video Call Consultation</h2>
              <p className="text-muted-foreground mb-6">
                Get personalized advice in real-time with live one-on-one video consultation sessions
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Multiple duration options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Category-specific pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Instant scheduling</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Book Video Call
              </Button>
            </div>
          </Link>

          {/* Recorded Video Card */}
          <Link to="/recorded-video" className="group">
            <div className="glass-card rounded-3xl p-8 shadow-soft hover:shadow-medium transition-smooth transform hover:scale-[1.02]">
              <div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Recorded Video Session</h2>
              <p className="text-muted-foreground mb-6">
                Receive a professionally recorded consultation video tailored to your requirements
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Watch anytime, anywhere</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Bonus photos included</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Flexible pricing</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Order Recorded Video
              </Button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>✨ Secure payment • 18+ only • Professional service</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
