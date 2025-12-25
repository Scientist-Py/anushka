import { Link, useNavigate } from "react-router-dom";
import { Video, Film, CheckCircle, Users, Image, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  // Yeh home page ka main component hai
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const navigate = useNavigate();

  const handleGroupAccess = () => {
    const basePrice = 780;
    const gstRate = 0.12;
    const total = Math.round(basePrice * (1 + gstRate));

    navigate("/payment", {
      state: {
        total: total,
        service: "Premium Live Group Access",
        details: "WhatsApp • 1 Month Validity • 30 Photos & 3 Videos Daily"
      }
    });
  };

  useEffect(() => {
    // Increment visitor count
    const currentVisitors = parseInt(localStorage.getItem("anushka_visitors") || "0");
    localStorage.setItem("anushka_visitors", (currentVisitors + 1).toString());

    // Check agar user pehle se registered hai
    const existingUser = localStorage.getItem("anushka_user");
    if (!existingUser) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userPhone.length >= 10) {
      const userData = { name: userName, phone: userPhone, time: new Date().toLocaleString() };
      localStorage.setItem("anushka_user", JSON.stringify(userData));

      // Admin leads mein bhi save karein
      const leads = JSON.parse(localStorage.getItem("anushka_leads") || "[]");
      leads.unshift(userData);
      localStorage.setItem("anushka_leads", JSON.stringify(leads));

      setShowOnboarding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 animate-pulse">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            VERIFIED CREATOR
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-blue-500 bg-clip-text text-transparent">
            ANUSHKA VIDEO CALLS
          </h1>
          <p className="text-muted-foreground text-lg mb-8 uppercase tracking-[0.2em] font-medium text-primary/80">
            Your private spot for naughty fantasies & live sessions 💋
          </p>

          {/* Quick Nav */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => document.getElementById('album-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-primary/10 transition-colors text-sm font-semibold border border-white/5 shadow-lg shadow-primary/5"
            >
              <Image className="w-4 h-4 text-primary" /> ALBUM
            </button>
            <Link
              to="/support"
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-primary/10 transition-colors text-sm font-semibold border border-white/5"
            >
              <Users className="w-4 h-4 text-primary" /> SUPPORT
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="glass-card p-4 rounded-2xl">
              <div className="text-2xl font-bold text-primary">5,000+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Average Rating</div>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Privacy Guaranteed</div>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Live Support</div>
            </div>
          </div>

          {/* Circular Video */}
          <div className="max-w-3xl mx-auto mb-12 flex flex-col items-center">
            <div className="relative group">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-[0_0_50px_rgba(234,56,76,0.3)] border-4 border-primary/20 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_60px_rgba(234,56,76,0.5)]">
                <video
                  src="/anushkavideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: 'center',
                    transform: 'scale(1.2)',
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                />
              </div>
              <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-background animate-pulse flex items-center gap-1 shadow-lg">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                ONLINE NOW
              </div>
            </div>
            <p className="mt-4 text-primary font-medium flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Official Verified Account
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Kaise Shuru Karein? 👅</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-primary">1</div>
              <h3 className="font-semibold mb-2">Pick Your Fantasy</h3>
              <p className="text-xs text-muted-foreground">Video call ya recorded naughty videos? Choose karo.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-primary">2</div>
              <h3 className="font-semibold mb-2">Private Payment</h3>
              <p className="text-xs text-muted-foreground">UPI se 100% private aur safe payment karein.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-primary">3</div>
              <h3 className="font-semibold mb-2">Let's Get Naughty</h3>
              <p className="text-xs text-muted-foreground">Instant link milega aur phir maza hi maza!</p>
            </div>
          </div>
        </div>

        {/* Visual Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Video Call Card */}
          <Link to="/video-call" className="group">
            <div className="glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth transform hover:scale-[1.02]">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-3xl opacity-50 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=10')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <Video className="w-12 h-12 text-white relative z-10 animate-bounce" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md">LIVE 🔞</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">Live Naughty Call</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Full nude, explicit, and teasing sessions. Anushka is waiting to show you everything you desire.
                </p>
                <div className="space-y-2 text-xs text-muted-foreground mb-6 font-medium text-primary/70 italic">
                  <span>— Stripping, Moaning, & Cumming Included 💦</span>
                </div>
                <Button className="w-full font-bold h-12" size="lg">
                  Book A Naughty Call Now
                </Button>
              </div>
            </div>
          </Link>

          {/* Recorded Video Card */}
          <Link to="/recorded-video" className="group">
            <div className="glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth transform hover:scale-[1.02]">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-3xl opacity-50 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=10')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <Film className="w-12 h-12 text-white relative z-10 animate-pulse" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">4K QUALITY</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">Recorded Fantasies</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Watch Anushka in high intensity, super naughty recorded videos. 4K quality with bonus flirty photos.
                </p>
                <div className="space-y-2 text-xs text-muted-foreground mb-6 font-medium text-purple-400 italic">
                  <span>— 40+ Naughty Photos FREE (45 min Plan) 📸</span>
                </div>
                <Button className="w-full font-bold h-12" size="lg" variant="secondary">
                  Order My Fantasy Video
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Exclusive Album Section */}
        <div id="album-section" className="mt-20 max-w-4xl mx-auto scroll-mt-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold mb-4 border border-green-500/20 uppercase tracking-tighter">
              <CheckCircle className="w-3 h-3" /> 100% Real & Verified Photos
            </div>
            <h2 className="text-3xl font-bold mb-4">Anushka's Private Gallery 📸</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out these real shots of Anushka. No fake profiles, no filters—just 100% pure beauty for your trust.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/IMG_20251225_110255_157.webp",
              "/SaveClip.App_542898438_17891614770335791_4568971459979116340_n.jpg",
              "/SaveClip.App_543351725_17891614746335791_4501057502712227281_n.jpg",
              "/SaveClip.App_573711049_17898310224335791_7201884703612400426_n.jpg",
              "/SaveClip.App_583245147_17899753089335791_1619758458747494755_n.jpg"
            ].map((url, index) => (
              <div
                key={index}
                onClick={handleGroupAccess}
                className="relative group aspect-[3/4] overflow-hidden rounded-2xl glass-card border border-white/10 cursor-pointer"
              >
                {/* Image with Blur */}
                <img
                  src={url}
                  alt={`Anushka ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 blur-[8px] group-hover:blur-[4px] scale-110 group-hover:scale-100"
                />

                {/* Lock Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform duration-500">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-lg">Unlock Full Album</span>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Join VIP Group 🔥</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center space-y-6">
            <Button
              onClick={handleGroupAccess}
              className="rounded-full px-12 h-16 text-xl font-bold shadow-xl shadow-primary/20 animate-pulse"
              variant="gradient"
            >
              Get Daily Group Access 🚀
            </Button>

            <div className="max-w-md mx-auto p-8 glass-card rounded-[2rem] border border-primary/20 space-y-4">
              <h3 className="font-bold text-primary text-xl tracking-tight">VIP Group Benefits:</h3>
              <ul className="text-sm space-y-3 text-muted-foreground font-medium text-left">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> 30+ Nude Photos Every Day 📸</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> 3+ Cumming Videos Every Day 📽️</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> Lucky Chance: 10 Min Private Call 🔞</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> Exclusive WhatsApp Community Access</li>
                <li className="flex items-center gap-3 font-bold text-white"><CheckCircle className="w-5 h-5 text-primary" /> 1 Month Full Validity 📅</li>
              </ul>
              <div className="pt-6 border-t border-white/10">
                <p className="text-3xl font-black text-white">₹780 <span className="text-xs font-normal text-muted-foreground">+ 12% GST</span></p>
                <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest mt-2 bg-primary/5 py-1 rounded-full italic font-mono">Month-to-Month Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Real Client Reviews ⭐</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rahul K.", rating: 5, text: "sexy ekdum pura maal nikal diya" },
              { name: "Suresh P.", rating: 5, text: "Video quality ekdum top notch hai. Sab kuch ekdum private aur secure rehta hai." },
              { name: "Vikram M.", rating: 5, text: "Recorded videos ki quality real 4K hai. Paisa vasool!" },
              { name: "Ankit S.", rating: 5, text: "Bhai log, Anushka real hai aur bahut hi acchha cum karati hai" },
              { name: "Deepak J.", rating: 5, text: "Payment smoothly ho gaya aur 5 min ke andar call connect ho gayi." },
              { name: "Sameer T.", rating: 5, text: "Anushka ne bahut maza dilaya. one day i will fuck you" }
            ].map((review, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-border/50 hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm italic text-muted-foreground mb-4">"{review.text}"</p>
                <div className="text-xs font-bold text-primary">— {review.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <h2 className="text-xl font-bold">Live Feed Pe Charcha 💬</h2>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
            <div className="bg-secondary/30 p-4 border-b border-border/50 flex justify-between items-center text-xs font-semibold text-muted-foreground">
              <span>ACTIVE COMMENTS</span>
              <span>🟢 142 Users Online</span>
            </div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {[
                { user: "Sunny_Boy", time: "2 min ago", comment: "Bhai abhi call kiya tha, Anushka real h!" },
                { user: "Lucky88", time: "5 min ago", comment: "Payment verify hone me kitna time lagta h?" },
                { user: "Admin", time: "6 min ago", comment: "Lucky88, usually 2-3 mins lagte hain." },
                { user: "Killer_King", time: "10 min ago", comment: "Saree wala session best h yar." },
                { user: "Vishal_99", time: "12 min ago", comment: "Next session book kar liya Anushka!" }
              ].map((c, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="font-bold text-primary flex-shrink-0">{c.user}:</div>
                  <div className="flex-grow text-muted-foreground">{c.comment}</div>
                  <div className="text-[10px] text-muted-foreground/50 whitespace-nowrap">{c.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-10 border-t border-border/50 flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Identity Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">₹</span>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">100% Private</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground border-t border-white/5 pt-8">
          <p className="mb-2">✨ Official Platform • 18+ Only • Privacy Guaranteed</p>
          <p>© 2024 Anushka Video Calls. All rights reserved.</p>
        </div>
      </div>

      {/* Entry Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="glass-card w-full max-w-md p-8 rounded-[2rem] border border-primary/30 shadow-[0_0_80px_rgba(234,56,76,0.3)] my-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Before We Begin 💋</h2>
              <p className="text-muted-foreground text-sm px-4">Please verify your details below to join Anushka's private sessions.</p>
            </div>

            <form onSubmit={handleOnboarding} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Your Name</label>
                <Input
                  required
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-14 bg-white/5 border-primary/20 rounded-2xl focus:border-primary text-lg px-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Phone (WhatsApp Only)</label>
                <Input
                  required
                  type="tel"
                  placeholder="98xxxxxx00"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="h-14 bg-white/5 border-primary/20 rounded-2xl focus:border-primary text-lg px-6 font-mono"
                />
              </div>
              <div className="pt-6">
                <Button type="submit" className="w-full h-16 text-xl font-bold shadow-lg shadow-primary/20" variant="gradient">
                  Enter Now 🚀
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground/60 px-6 leading-relaxed">
                *Privacy Guarantee: Hum aapki details kisi ko share nahi karte. Yeh sirf connection banaye rakhne ke liye hai.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
