import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    DollarSign,
    BarChart3,
    Settings,
    LogOut,
    Phone,
    User as UserIcon,
    Search,
    ArrowUpRight,
    TrendingUp,
    MessageSquare,
    Send,
    Bell,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { getChats, addChat, formatTimeAgo, ChatMessage } from "@/lib/chatUtils";
import { getReviews, addReview, Review } from "@/lib/reviewUtils";
import { getNotification, setNotification, clearNotification, Notification } from "@/lib/notificationUtils";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Metrics from LocalStorage
    const [visitors, setVisitors] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [leads, setLeads] = useState<any[]>([]);

    // Chat State
    const [chats, setChats] = useState<ChatMessage[]>([]);
    const [chatMsg, setChatMsg] = useState("");
    const [chatUser, setChatUser] = useState("Anonymous");
    const [isPostAsAdmin, setIsPostAsAdmin] = useState(true);

    // Review State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);

    // Notification State
    const [notificationMsg, setNotificationMsg] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationType, setNotificationType] = useState<"info" | "success" | "alert" | "promo">("info");
    const [notificationBtnText, setNotificationBtnText] = useState("");
    const [notificationLink, setNotificationLink] = useState("");
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

    useEffect(() => {
        // Read real stats from localStorage
        const savedLeads = JSON.parse(localStorage.getItem("anushka_leads") || "[]");
        const savedVisitors = parseInt(localStorage.getItem("anushka_visitors") || "0");
        const savedRevenue = parseInt(localStorage.getItem("anushka_revenue") || "0");

        setLeads(savedLeads);
        setVisitors(savedVisitors);
        setRevenue(savedRevenue);
        setChats(getChats());
        setReviews(getReviews());
        setCurrentNotification(getNotification());
    }, []);

    const handleSetNotification = (e: React.FormEvent) => {
        e.preventDefault();
        if (!notificationMsg) return;
        const note = setNotification({
            title: notificationTitle,
            message: notificationMsg,
            type: notificationType,
            buttonText: notificationBtnText,
            link: notificationLink
        });
        setCurrentNotification(note);
        // We keep the form filled so they can edit it easily
    };

    const handleDeleteNotification = () => {
        clearNotification();
        setCurrentNotification(null);
        setNotificationMsg("");
        setNotificationTitle("");
        setNotificationLink("");
        setNotificationBtnText("");
        setNotificationType("info");
    };

    const handlePostChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMsg) return;

        const updated = addChat(isPostAsAdmin ? "Admin" : chatUser, chatMsg, isPostAsAdmin);
        setChats(updated);
        setChatMsg("");
    };

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewName || !reviewText) return;

        const updated = addReview(reviewName, reviewRating, reviewText);
        setReviews(updated);
        setReviewName("");
        setReviewText("");
        setReviewRating(5);
    };

    // Mock data for graphs (trends based on real total)
    const data = [
        { name: 'Mon', users: Math.floor(visitors * 0.1), revenue: Math.floor(revenue * 0.1) },
        { name: 'Tue', users: Math.floor(visitors * 0.15), revenue: Math.floor(revenue * 0.12) },
        { name: 'Wed', users: Math.floor(visitors * 0.12), revenue: Math.floor(revenue * 0.08) },
        { name: 'Thu', users: Math.floor(visitors * 0.2), revenue: Math.floor(revenue * 0.25) },
        { name: 'Fri', users: Math.floor(visitors * 0.18), revenue: Math.floor(revenue * 0.15) },
        { name: 'Sat', users: Math.floor(visitors * 0.25), revenue: Math.floor(revenue * 0.3) },
        { name: 'Sun', users: Math.floor(visitors * 0.35 * (visitors > 0 ? 1 : 0)), revenue: Math.floor(revenue * 0.4) },
    ];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "anushka.midnight" && password === "123456") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect details! Please try again.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/");
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-primary/20 bg-zinc-900/40 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Admin Panel</h1>
                        <p className="text-zinc-400">Secure Access for Anushka Midnight</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1 text-zinc-300">Username</label>
                            <Input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 h-12 rounded-xl focus:border-primary text-white placeholder:text-zinc-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1 text-zinc-300">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 h-12 rounded-xl focus:border-primary text-white placeholder:text-zinc-500"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
                        <Button type="submit" className="w-full h-12 text-lg font-bold" variant="gradient">
                            Log In
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-zinc-800 bg-[#0a0a0a] p-6 hidden md:flex flex-col gap-8 fixed h-full z-10">
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    ANUSHKA ADMIN
                </div>
                <nav className="space-y-2 flex-grow">
                    <Button onClick={() => scrollToSection('dashboard')} variant="ghost" className="w-full justify-start gap-3 bg-zinc-900/50 text-white font-medium hover:bg-primary/20 hover:text-primary">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </Button>
                    <Button onClick={() => scrollToSection('users')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Users className="w-5 h-5" /> All Users
                    </Button>
                    <Button onClick={() => scrollToSection('payments')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <DollarSign className="w-5 h-5" /> Payments
                    </Button>
                    <Button onClick={() => scrollToSection('chat-control')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <MessageSquare className="w-5 h-5" /> Live Chat
                    </Button>
                    <Button onClick={() => scrollToSection('reviews-control')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Users className="w-5 h-5" /> Reviews
                    </Button>
                    <Button onClick={() => scrollToSection('settings')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Settings className="w-5 h-5" /> Settings
                    </Button>
                    <Button onClick={() => scrollToSection('notification-control')} variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Bell className="w-5 h-5" /> Notifications
                    </Button>
                </nav>
                <Button onClick={handleLogout} variant="ghost" className="justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 mb-4">
                    <LogOut className="w-5 h-5" /> Logout
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4 md:p-8 overflow-y-auto md:ml-64">
                {/* Header */}
                <div id="dashboard" className="flex justify-between items-center mb-10 pt-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Business Overview 👑</h1>
                        <p className="text-zinc-400">Monitoring real-time user activity and revenue.</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20 text-sm font-semibold flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            SYSTEM LIVE
                        </div>
                    </div>
                </div>

                {/* Top Stats */}
                <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="glass-card p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all group bg-zinc-900">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/20 p-3 rounded-xl"><Users className="text-primary" /></div>
                            <div className="text-green-400 text-xs flex items-center gap-1 font-bold"><TrendingUp size={14} /> Live</div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">{visitors.toLocaleString()}</div>
                        <p className="text-zinc-400 text-sm">Real Total Visits</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group bg-zinc-900">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-500/20 p-3 rounded-xl"><UserIcon className="text-blue-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">{leads.length}</div>
                        <p className="text-zinc-400 text-sm">Leads Captured</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-all group bg-zinc-900">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-500/20 p-3 rounded-xl"><DollarSign className="text-green-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">₹{revenue.toLocaleString()}</div>
                        <p className="text-zinc-400 text-sm">Recorded Revenue</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-zinc-800 hover:border-purple-500/50 transition-all group bg-zinc-900">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-xl"><Phone className="text-purple-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">Active</div>
                        <p className="text-zinc-400 text-sm">Tracking On</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div id="payments" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/50">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            Traffic Trend <ArrowUpRight size={18} className="text-primary" />
                        </h3>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ea384c" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ea384c" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999' }} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff20', borderRadius: '12px' }}
                                        itemStyle={{ color: '#ea384c' }}
                                    />
                                    <Area type="monotone" dataKey="users" stroke="#ea384c" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/50">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            Revenue Growth <ArrowUpRight size={18} className="text-green-500" />
                        </h3>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999' }} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff20', borderRadius: '12px' }}
                                        itemStyle={{ color: '#10b981' }}
                                    />
                                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                <div id="users" className="glass-card rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900 mb-10">
                    <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                        <div>
                            <h3 className="text-xl font-bold text-white">User Access Logs & Leads 📧</h3>
                            <p className="text-zinc-400 text-sm">List of all users who have entered their details.</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800">
                            Export CSV
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-zinc-950 border-b border-zinc-800">
                                    <th className="text-left p-4 pl-8 text-sm font-bold text-zinc-300">USER NAME</th>
                                    <th className="text-left p-4 text-sm font-bold text-zinc-300">PHONE NUMBER</th>
                                    <th className="text-left p-4 text-sm font-bold text-zinc-300">ACCESS TIME</th>
                                    <th className="text-right p-4 pr-8 text-sm font-bold text-zinc-300">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length > 0 ? leads.map((lead, i) => (
                                    <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4 pl-8 font-bold text-white max-w-[200px] truncate">{lead.name}</td>
                                        <td className="p-4 font-mono text-blue-400 font-medium">{lead.phone}</td>
                                        <td className="p-4 text-sm text-zinc-400">{lead.time}</td>
                                        <td className="p-4 pr-8 text-right">
                                            <span className="bg-green-500/10 text-green-400 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-green-500/20">
                                                Verified Lead
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-zinc-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-8 h-8 opacity-20" />
                                                <p>No user data captured yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Chat Management Section */}
                <div id="chat-control" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Chat List */}
                    <div className="glass-card rounded-3xl border border-zinc-800 overflow-hidden flex flex-col h-[600px] bg-zinc-900">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white"><MessageSquare className="text-primary" /> Live Chat Feed</h3>
                                <p className="text-zinc-400 text-xs">Real-time public messages.</p>
                            </div>
                            <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">{chats.length} messages</span>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-black/40">
                            {chats.map((chat) => (
                                <div key={chat.id} className={`flex gap-3 text-sm p-3 rounded-xl border ${chat.user === 'Admin' ? 'bg-primary/10 border-primary/20' : 'bg-zinc-800/50 border-zinc-800'}`}>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`font-bold ${chat.user === 'Admin' ? 'text-primary' : 'text-zinc-200'}`}>
                                                {chat.user}
                                                {chat.user === 'Admin' && <span className="ml-2 text-[10px] bg-primary text-white px-1 rounded">MOD</span>}
                                            </span>
                                            <span className="text-[10px] text-zinc-500">{formatTimeAgo(chat.timestamp)}</span>
                                        </div>
                                        <p className="text-zinc-300 text-sm">{chat.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Control */}
                    <div className="glass-card rounded-3xl border border-zinc-800 p-8 h-fit bg-zinc-900">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><Send className="text-green-500" /> Post Message</h3>

                        <form onSubmit={handlePostChat} className="space-y-6">
                            {/* Identity Selector */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsPostAsAdmin(true)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${isPostAsAdmin ? 'bg-primary/20 border-primary text-primary' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${isPostAsAdmin ? 'border-primary bg-primary' : 'border-zinc-500'}`}></div>
                                    <span className="font-bold text-sm">Post as Admin</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPostAsAdmin(false)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${!isPostAsAdmin ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${!isPostAsAdmin ? 'border-blue-500 bg-blue-500' : 'border-zinc-500'}`}></div>
                                    <span className="font-bold text-sm">Post as User</span>
                                </button>
                            </div>

                            {/* Custom Username Input (Only if 'As User') */}
                            {!isPostAsAdmin && (
                                <div className="space-y-2 animate-fade-in">
                                    <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">Simulated Username</label>
                                    <Input
                                        placeholder="e.g. Rahul_King"
                                        value={chatUser}
                                        onChange={(e) => setChatUser(e.target.value)}
                                        className="bg-zinc-800 border-blue-500/50 h-14 rounded-xl focus:border-blue-500 text-lg font-bold text-white placeholder:text-zinc-500"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-zinc-400">Message Content</label>
                                <textarea
                                    className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none resize-none text-lg"
                                    placeholder="Type your message here..."
                                    value={chatMsg}
                                    onChange={(e) => setChatMsg(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" variant="gradient">
                                <Send className="w-5 h-5 mr-2" /> Send Message
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Review Management Section */}
                <div id="reviews-control" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Add Review Form */}
                    <div className="glass-card rounded-3xl border border-zinc-800 p-8 h-fit bg-zinc-900">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><ArrowUpRight className="text-yellow-500" /> Add Client Review</h3>
                        <form onSubmit={handleAddReview} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-zinc-400">Client Name</label>
                                <Input
                                    placeholder="e.g. Rahul Sharma"
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    className="bg-zinc-800 border-zinc-700 h-12 rounded-xl focus:border-yellow-500 text-white placeholder:text-zinc-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-zinc-400">Rating (1-5)</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={reviewRating}
                                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                                    className="bg-zinc-800 border-zinc-700 h-12 rounded-xl focus:border-yellow-500 text-white placeholder:text-zinc-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-zinc-400">Review Text</label>
                                <textarea
                                    className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none resize-none text-base"
                                    placeholder="Write the review here..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-yellow-500/20 text-black hover:bg-yellow-400" style={{ backgroundColor: '#eab308' }}>
                                Post Review
                            </Button>
                        </form>
                    </div>

                    {/* Review List */}
                    <div className="glass-card rounded-3xl border border-zinc-800 overflow-hidden flex flex-col h-[600px] bg-zinc-900">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">User Reviews</h3>
                                <p className="text-zinc-400 text-xs">Live on website.</p>
                            </div>
                            <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">{reviews.length} reviews</span>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-black/40">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-white">{review.name}</div>
                                        <div className="text-yellow-500 text-xs text-right">
                                            {"★".repeat(review.rating)}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 text-sm italic">"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notification Management Section */}
                <div id="notification-control" className="mb-20">
                    <div className="glass-card rounded-3xl border border-zinc-800 p-8 bg-zinc-900">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><Bell className="text-primary" /> Notification Management</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Set Notification */}
                            <div>
                                <h4 className="font-bold text-white mb-4">Set Active Notification</h4>
                                <form onSubmit={handleSetNotification} className="space-y-4">
                                    {/* Type Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1 text-zinc-400">Notification Type</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {(['info', 'success', 'alert', 'promo'] as const).map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setNotificationType(type)}
                                                    className={`h-10 rounded-lg text-xs font-bold uppercase transition-all ${notificationType === type
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium ml-1 text-zinc-400">Title</label>
                                            <input
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
                                                placeholder="e.g. New Update"
                                                value={notificationTitle}
                                                onChange={(e) => setNotificationTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium ml-1 text-zinc-400">Action Link (Optional)</label>
                                            <input
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
                                                placeholder="e.g. /video-call"
                                                value={notificationLink}
                                                onChange={(e) => setNotificationLink(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1 text-zinc-400">Messages</label>
                                        <textarea
                                            className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none resize-none text-base"
                                            placeholder="Enter the message to show in the popup..."
                                            value={notificationMsg}
                                            onChange={(e) => setNotificationMsg(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1 text-zinc-400">Button Text</label>
                                        <input
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
                                            placeholder="e.g. Check it out"
                                            value={notificationBtnText}
                                            onChange={(e) => setNotificationBtnText(e.target.value)}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" variant="gradient">
                                        {currentNotification?.active ? 'Update Notification' : 'Set Notification'}
                                    </Button>
                                </form>
                            </div>

                            {/* Current Status */}
                            <div>
                                <h4 className="font-bold text-white mb-4">Preview Status</h4>
                                <div className="p-6 rounded-2xl border border-zinc-700 bg-zinc-800/50 h-full flex flex-col justify-center items-center text-center">
                                    {currentNotification && currentNotification.active ? (
                                        <div className="w-full">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse ${currentNotification.type === 'alert' ? 'bg-red-500/20 text-red-500' :
                                                    currentNotification.type === 'success' ? 'bg-green-500/20 text-green-500' :
                                                        currentNotification.type === 'promo' ? 'bg-yellow-500/20 text-yellow-500' :
                                                            'bg-primary/20 text-primary'
                                                }`}>
                                                <Bell className="w-6 h-6" />
                                            </div>
                                            <div className="font-bold mb-2 uppercase tracking-wider text-sm" style={{
                                                color: currentNotification.type === 'alert' ? '#ef4444' :
                                                    currentNotification.type === 'success' ? '#22c55e' :
                                                        currentNotification.type === 'promo' ? '#eab308' : '#ea384c'
                                            }}>ACTIVE: {currentNotification.type}</div>

                                            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl mb-6 text-zinc-200 shadow-inner">
                                                <h5 className="font-bold text-white mb-2">{currentNotification.title || "No Title"}</h5>
                                                <p className="text-sm text-zinc-400 mb-4">"{currentNotification.message}"</p>
                                                <span className="inline-block px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold border border-zinc-700">
                                                    Btn: {currentNotification.buttonText || "Default"}
                                                </span>
                                            </div>

                                            <Button
                                                onClick={handleDeleteNotification}
                                                variant="outline"
                                                className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300 gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete Notification
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-zinc-500">
                                            <Bell className="w-16 h-16 mx-auto mb-6 opacity-10" />
                                            <p className="text-lg font-medium">No active notification.</p>
                                            <p className="text-sm opacity-50">Set one to show the popup on the website.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Section */}
                <div id="settings" className="glass-card rounded-3xl border border-zinc-800 p-8 bg-zinc-900 mb-10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><Settings className="text-zinc-400" /> Platform Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-white mb-4">Data Management</h4>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-800 flex justify-between items-center">
                                    <div>
                                        <div className="font-medium text-white">Reset Analytics</div>
                                        <div className="text-xs text-zinc-400">Clear visitor and revenue stats</div>
                                    </div>
                                    <Button variant="outline" className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">Reset</Button>
                                </div>
                                <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-800 flex justify-between items-center">
                                    <div>
                                        <div className="font-medium text-white">Export All Data</div>
                                        <div className="text-xs text-zinc-400">Download full CSV report</div>
                                    </div>
                                    <Button variant="outline" className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-300">Export</Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Security</h4>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">New Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-primary"
                                    />
                                </div>
                                <Button className="w-full font-bold" variant="secondary">Update Password</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
