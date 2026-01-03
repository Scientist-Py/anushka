import { Link, useNavigate } from "react-router-dom";
import { Video, Film, CheckCircle, Users, Image, Lock, MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { initializeChats, formatTimeAgo, ChatMessage } from "@/lib/chatUtils";
import { getReviews, Review } from "@/lib/reviewUtils";
import videoCallBg from "../components/SaveClip.App_559453078_17894459628335791_1669631404230936057_n.jpg";
import recordedBg from "../components/SaveClip.App_590889507_17900658735335791_6705053405610076337_n.jpg";
import FAQSection from "@/components/FAQSection";
import NotificationModal from "@/components/NotificationModal";

const Index = () => {
  // Yeh home page ka main component hai
  // Yeh home page ka main component hai
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const proceedToPayment = () => {
    setIsLoading(true);

    // Simulate secure connection/loading delay
    setTimeout(() => {
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
    }, 1500); // Reduced delay slightly
  };

  useEffect(() => {
    // Increment visitor count
    const currentVisitors = parseInt(localStorage.getItem("anushka_visitors") || "0");
    localStorage.setItem("anushka_visitors", (currentVisitors + 1).toString());

    localStorage.setItem("anushka_visitors", (currentVisitors + 1).toString());



    // Initialize Chats
    const loadedChats = initializeChats();
    setChats(loadedChats);

    // Initialize Reviews
    setReviews(getReviews());

    // Sync chats every minute
    const interval = setInterval(() => {
      setChats([...initializeChats()]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background py-10 px-4">
      {/* Admin Notification Popup */}
      <NotificationModal />

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center backdrop-blur-xl animate-fade-in">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
            <img src="/SaveClip.App_583245147_17899753089335791_1619758458747494755_n.jpg" className="absolute inset-2 rounded-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-white animate-pulse">Connecting Securely...</h2>
          <p className="text-muted-foreground text-sm mt-2">Please wait while we redirect you to payment.</p>
        </div>
      )}
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
                <div
                  className="absolute inset-0 backdrop-blur-3xl opacity-50 bg-cover bg-center"
                  style={{ backgroundImage: `url(${videoCallBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <Video className="w-12 h-12 text-white relative z-10 animate-bounce" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md">LIVE 🔞</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">Live Nude Call</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Full nude, explicit, and teasing sessions. I will eat your whole cum my BADDIES.
                </p>
                <div className="space-y-2 text-xs text-muted-foreground mb-6 font-medium text-primary/70 italic">
                  <span>— Fingering, Moaning, & Cumming Included 💦</span>
                </div>
                <Button className="w-full font-bold h-12" size="lg">
                  Book A Nude Call Now
                </Button>
              </div>
            </div>
          </Link>

          {/* Recorded Video Card */}
          <Link to="/recorded-video" className="group">
            <div className="glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth transform hover:scale-[1.02]">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 backdrop-blur-3xl opacity-50 bg-cover"
                  style={{ backgroundImage: `url(${recordedBg})`, backgroundPosition: 'center 20%' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <Film className="w-12 h-12 text-white relative z-10 animate-pulse" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">4K QUALITY</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">Recorded Content</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Watch me in high intensity,nude recorded videos. 4K quality with bonus nude photos.
                </p>
                <div className="space-y-2 text-xs text-muted-foreground mb-6 font-medium text-purple-400 italic">
                  <span>— 40+ Nude Photos FREE (45 min Plan) 📸</span>
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
            <h2 className="text-3xl font-bold mb-4">My Private Gallery 📸</h2>
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
                onClick={proceedToPayment}
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
            <div className="max-w-md mx-auto p-8 bg-zinc-900 rounded-[2rem] border-2 border-primary/50 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="font-black text-white text-3xl tracking-tight text-center border-b-2 border-white/10 pb-4 drop-shadow-md">VIP Group Benefits 👑</h3>
              <ul className="text-lg space-y-5 text-white font-bold text-left">
                <li className="flex items-center gap-4 drop-shadow-sm"><CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 fill-green-500/20" /> 30+ Nude Photos Every Day 📸</li>
                <li className="flex items-center gap-4 drop-shadow-sm"><CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 fill-green-500/20" /> 3+ Cumming Videos Every Day 📽️</li>
                <li className="flex items-center gap-4 drop-shadow-sm"><CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 fill-green-500/20" /> Lucky Chance: 10 Min Private Call 🔞</li>
                <li className="flex items-center gap-4 drop-shadow-sm"><CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 fill-green-500/20" /> Exclusive WhatsApp Community Access</li>
                <li className="flex items-center gap-4 font-black text-white bg-white/5 p-3 rounded-xl border border-primary/30 shadow-inner"><CheckCircle className="w-8 h-8 text-primary flex-shrink-0 fill-primary/20" /> 1 Month Full Validity 📅</li>
              </ul>
              <div className="pt-6 border-t-2 border-white/10 text-center">
                <p className="text-5xl font-black text-white mb-2 drop-shadow-lg">₹780 <span className="text-lg font-bold text-gray-400">+ 12% GST</span></p>
                <div className="inline-block mt-2 px-6 py-2 rounded-full bg-primary text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/40 border border-white/10">
                  Month-to-Month Plan
                </div>
              </div>
            </div>

            <Button
              onClick={proceedToPayment}
              className="rounded-full px-12 h-16 text-xl font-bold shadow-xl shadow-primary/20 animate-pulse w-full max-w-md"
              variant="gradient"
            >
              SUBSCRIBE NOW 🚀
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Real Client Reviews ⭐</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-border/50 hover:bg-secondary/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-500 text-sm">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-primary">— {review.name}</div>
                  <div className="flex items-center gap-1 text-[9px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    <CheckCircle className="w-2.5 h-2.5" /> Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />



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


      {/* Floating Chat Widget */}
      {/* Trigger Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white p-5 rounded-full shadow-[0_0_40px_rgba(234,56,76,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce-slow"
      >
        {isChatOpen ? <X className="w-8 h-8" /> : (
          <>
            <MessageCircle className="w-8 h-8 animate-wiggle" />
            <span className="absolute top-2 right-2 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-6 w-80 sm:w-96 h-[550px] bg-white border border-gray-200 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up origin-bottom-right font-sans">
          {/* Header */}
          <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-md p-0.5 bg-white">
                  {/* CHANGE CHATBOT IMAGE HERE */}
                  <img src="/SaveClip.App_583245147_17899753089335791_1619758458747494755_n.jpg" alt="Anushka" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-1">Anushka <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" /></h3>
                <p className="text-[11px] text-green-600 font-bold tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online Now
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#F2F4F7] flex flex-col-reverse">
            <div className="h-2"></div>

            {/* We use flex-col-reverse so the first item (Newest/Index 0) is at the bottom. We map chats directly (Newest...Oldest). */}
            {/* Limit effectively to 10 visible messages */}
            {chats.slice(0, 10).map((chat) => (
              <div key={chat.id} className={`flex flex-col gap-1 text-sm animate-fade-in ${chat.user === 'Admin' ? 'items-end' : 'items-start'}`}>
                {/* Sender Name */}
                <div className="px-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wide ${chat.user === 'Admin' ? 'text-primary' : 'text-gray-500'}`}>
                    {chat.user === 'Admin' ? 'ADMIN 🛡️' : chat.user}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm relative ${chat.user === 'Admin'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                  <p className="leading-snug text-[13px]">{chat.message}</p>
                </div>
              </div>
            ))}

            {/* Subscription/Paywall Notice for older messages */}
            {chats.length > 10 && (
              <div className="text-center py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 mx-2 my-2">
                <Lock className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] text-gray-500 font-medium">
                  Subscribe to view full chat history
                </p>
              </div>
            )}

            <div className="text-center text-[10px] text-gray-400 my-6 relative">
              <span className="bg-[#F2F4F7] px-3 py-1 relative z-10 rounded-full font-medium">Today</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
            </div>
          </div>

          {/* Input Placeholder (Read Only) */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                readOnly
                placeholder="Type a message..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full h-12 px-5 text-sm focus:outline-none text-gray-500 cursor-not-allowed pr-12"
              />
              <button disabled className="absolute right-2 top-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Send className="w-4 h-4 text-primary" />
              </button>
              <div
                onClick={proceedToPayment}
                className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-full opacity-100 cursor-pointer group hover:bg-white/40 transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-white bg-primary px-4 py-2 rounded-full shadow-lg border border-primary/20 transform hover:scale-110 transition-transform animate-pulse flex items-center gap-2">
                  <span>Join VIP to Chat 💬</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
