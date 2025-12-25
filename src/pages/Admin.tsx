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
    TrendingUp
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

    useEffect(() => {
        // Read real stats from localStorage
        const savedLeads = JSON.parse(localStorage.getItem("anushka_leads") || "[]");
        const savedVisitors = parseInt(localStorage.getItem("anushka_visitors") || "0");
        const savedRevenue = parseInt(localStorage.getItem("anushka_revenue") || "0");

        setLeads(savedLeads);
        setVisitors(savedVisitors);
        setRevenue(savedRevenue);
    }, []);

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
            <div className="w-64 border-r border-white/5 bg-[#0a0a0a] p-6 hidden md:flex flex-col gap-8">
                <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ANUSHKA ADMIN
                </div>
                <nav className="space-y-2 flex-grow">
                    <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground opacity-60">
                        <Users className="w-5 h-5" /> All Users
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground opacity-60">
                        <DollarSign className="w-5 h-5" /> Payments
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground opacity-60">
                        <Settings className="w-5 h-5" /> Settings
                    </Button>
                </nav>
                <Button onClick={handleLogout} variant="ghost" className="justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 mb-4">
                    <LogOut className="w-5 h-5" /> Logout
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/20 p-3 rounded-xl"><Users className="text-primary" /></div>
                            <div className="text-green-500 text-xs flex items-center gap-1"><TrendingUp size={14} /> Live</div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{visitors.toLocaleString()}</div>
                        <p className="text-muted-foreground text-sm">Real Total Visits</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-500/20 p-3 rounded-xl"><UserIcon className="text-blue-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{leads.length}</div>
                        <p className="text-muted-foreground text-sm">Leads Captured</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-500/20 p-3 rounded-xl"><DollarSign className="text-green-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1">₹{revenue.toLocaleString()}</div>
                        <p className="text-muted-foreground text-sm">Recorded Revenue</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-xl"><Phone className="text-purple-500" /></div>
                        </div>
                        <div className="text-3xl font-bold mb-1">Active</div>
                        <p className="text-muted-foreground text-sm">Tracking On</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="glass-card p-6 rounded-3xl border border-white/5">
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

                    <div className="glass-card p-6 rounded-3xl border border-white/5">
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
                <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5">
                        <h3 className="text-xl font-bold">Real-Time Leads 📧</h3>
                        <p className="text-muted-foreground text-sm">Direct data captured from user entry.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="text-left p-4 pl-8 text-sm font-semibold text-muted-foreground">USER</th>
                                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">PHONE</th>
                                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ACCESSED AT</th>
                                    <th className="text-right p-4 pr-8 text-sm font-semibold text-muted-foreground">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length > 0 ? leads.map((lead, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors font-medium">
                                        <td className="p-4 pl-8">{lead.name}</td>
                                        <td className="p-4 text-muted-foreground">{lead.phone}</td>
                                        <td className="p-4 text-xs opacity-60">{lead.time}</td>
                                        <td className="p-4 pr-8 text-right">
                                            <span className="bg-green-500/10 text-green-500 text-[10px] uppercase font-bold px-2 py-1 rounded-full">Lead Captured</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center text-muted-foreground">No real leads yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
