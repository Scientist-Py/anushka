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
    Send
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

    useEffect(() => {
        // Read real stats from localStorage
        const savedLeads = JSON.parse(localStorage.getItem("anushka_leads") || "[]");
        const savedVisitors = parseInt(localStorage.getItem("anushka_visitors") || "0");
        const savedRevenue = parseInt(localStorage.getItem("anushka_revenue") || "0");

        setLeads(savedLeads);
        setVisitors(savedVisitors);
        setRevenue(savedRevenue);
        setChats(getChats());
    }, []);

    const handlePostChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMsg) return;

        const updated = addChat(isPostAsAdmin ? "Admin" : chatUser, chatMsg, isPostAsAdmin);
        setChats(updated);
        setChatMsg("");
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
                <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-primary/20 bg-black/40 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Admin Panel</h1>
                        <p className="text-muted-foreground">Secure Access for Anushka Midnight</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Username</label>
                            <Input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white/5 border-primary/20 h-12 rounded-xl focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border-primary/20 h-12 rounded-xl focus:border-primary"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
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
            <div className="w-64 border-r border-white/5 bg-[#0a0a0a] p-6 hidden md:flex flex-col gap-8 fixed h-full z-10">
                <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ANUSHKA ADMIN
                </div>
                <nav className="space-y-2 flex-grow">
                    <Button onClick={() => scrollToSection('dashboard')} variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </Button>
                    <Button onClick={() => scrollToSection('users')} variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white hover:bg-white/5">
                        <Users className="w-5 h-5" /> All Users
                    </Button>
                    <Button onClick={() => scrollToSection('payments')} variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white hover:bg-white/5">
                        <DollarSign className="w-5 h-5" /> Payments
                    </Button>
                    <Button onClick={() => scrollToSection('chat-control')} variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white hover:bg-white/5">
                        <MessageSquare className="w-5 h-5" /> Live Chat
                    </Button>
                    <Button onClick={() => scrollToSection('settings')} variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white hover:bg-white/5">
                        <Settings className="w-5 h-5" /> Settings
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
                        <h1 className="text-3xl font-bold">Business Overview 👑</h1>
                        <p className="text-muted-foreground">Monitoring real-time user activity and revenue.</p>
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
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group bg-zinc-900/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/20 p-3 rounded-xl"><Users className="text-primary" /></div>
                            <div className="text-green-500 text-xs flex items-center gap-1"><TrendingUp size={14} /> Live</div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">{visitors.toLocaleString()}</div>
                        <p className="text-muted-foreground text-sm">Real Total Visits</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group bg-zinc-900/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-500/20 p-3 rounded-xl"><UserIcon className="text-blue-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">{leads.length}</div>
                        <p className="text-muted-foreground text-sm">Leads Captured</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group bg-zinc-900/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-500/20 p-3 rounded-xl"><DollarSign className="text-green-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">₹{revenue.toLocaleString()}</div>
                        <p className="text-muted-foreground text-sm">Recorded Revenue</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group bg-zinc-900/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-xl"><Phone className="text-purple-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1 text-white">Active</div>
                        <p className="text-muted-foreground text-sm">Tracking On</p>
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
                <div id="users" className="glass-card rounded-3xl border border-white/5 overflow-hidden bg-zinc-900/50 mb-10">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">User Access Logs & Leads 📧</h3>
                            <p className="text-muted-foreground text-sm">List of all users who have entered their details.</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10 text-xs">
                            Export CSV
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.05] border-b border-white/10">
                                    <th className="text-left p-4 pl-8 text-sm font-bold text-gray-300">USER NAME</th>
                                    <th className="text-left p-4 text-sm font-bold text-gray-300">PHONE NUMBER</th>
                                    <th className="text-left p-4 text-sm font-bold text-gray-300">ACCESS TIME</th>
                                    <th className="text-right p-4 pr-8 text-sm font-bold text-gray-300">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length > 0 ? leads.map((lead, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.05] transition-colors">
                                        <td className="p-4 pl-8 font-bold text-white max-w-[200px] truncate">{lead.name}</td>
                                        <td className="p-4 font-mono text-blue-400">{lead.phone}</td>
                                        <td className="p-4 text-sm text-gray-400">{lead.time}</td>
                                        <td className="p-4 pr-8 text-right">
                                            <span className="bg-green-500/20 text-green-400 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-green-500/20">
                                                Verified Lead
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-muted-foreground">
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
                    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[600px] bg-zinc-900/50">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="text-primary" /> Live Chat Feed</h3>
                                <p className="text-muted-foreground text-xs">Real-time public messages.</p>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">{chats.length} messages</span>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-black/20">
                            {chats.map((chat) => (
                                <div key={chat.id} className={`flex gap-3 text-sm p-3 rounded-xl border ${chat.user === 'Admin' ? 'bg-primary/5 border-primary/20' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`font-bold ${chat.user === 'Admin' ? 'text-primary' : 'text-zinc-300'}`}>
                                                {chat.user}
                                                {chat.user === 'Admin' && <span className="ml-2 text-[10px] bg-primary text-white px-1 rounded">MOD</span>}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">{formatTimeAgo(chat.timestamp)}</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{chat.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Control */}
                    <div className="glass-card rounded-3xl border border-white/5 p-8 h-fit">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Send className="text-green-500" /> Post Message</h3>

                        <form onSubmit={handlePostChat} className="space-y-6">
                            {/* Identity Selector */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsPostAsAdmin(true)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${isPostAsAdmin ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${isPostAsAdmin ? 'border-primary bg-primary' : 'border-muted-foreground'}`}></div>
                                    <span className="font-bold text-sm">Post as Admin</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPostAsAdmin(false)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${!isPostAsAdmin ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${!isPostAsAdmin ? 'border-blue-500 bg-blue-500' : 'border-muted-foreground'}`}></div>
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
                                        className="bg-black/60 border-blue-500/30 h-14 rounded-xl focus:border-blue-500 text-lg font-bold text-white placeholder:text-white/20"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-muted-foreground">Message Content</label>
                                <textarea
                                    className="w-full h-32 bg-black/60 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none resize-none text-lg"
                                    placeholder="Type your message here..."
                                    value={chatMsg}
                                    onChange={(e) => setChatMsg(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" variant="gradient">
                                <Send className="w-5 h-5 mr-2" /> Send Message
                            </Button>
                        </form>

                        <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-xs text-yellow-500/80 leading-relaxed">
                            <strong>System Note:</strong> 1-2 automated messages are added every 4 hours to keep the chat looking active.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
