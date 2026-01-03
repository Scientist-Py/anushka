import { useEffect, useState } from "react";
import { X, Bell, Info, AlertTriangle, CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNotification, Notification } from "@/lib/notificationUtils";
import { useNavigate } from "react-router-dom";

const NotificationModal = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkNotification = () => {
            const current = getNotification();
            if (current && current.active) {
                setNotification(current);
                setIsOpen(true);
            }
        };

        checkNotification();

        const handleStorageChange = () => {
            checkNotification();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (!isOpen || !notification) return null;

    const handleAction = () => {
        setIsOpen(false);
        if (notification.link && notification.link !== '#') {
            navigate(notification.link);
        }
    };

    // Dynamic styles based on type
    const getStyles = () => {
        switch (notification.type) {
            case 'alert':
                return {
                    icon: <AlertTriangle className="w-10 h-10 text-red-500" />,
                    bg: 'bg-red-500/20',
                    border: 'border-red-500/30',
                    shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
                    buttonVariant: 'destructive' as const,
                    gradientTitle: 'from-white to-red-200'
                };
            case 'success':
                return {
                    icon: <CheckCircle2 className="w-10 h-10 text-green-500" />,
                    bg: 'bg-green-500/20',
                    border: 'border-green-500/30',
                    shadow: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]',
                    buttonVariant: 'secondary' as const, // We'll custom style this to look green if needed or use default secondary
                    gradientTitle: 'from-white to-green-200'
                };
            case 'promo':
                return {
                    icon: <PartyPopper className="w-10 h-10 text-yellow-500" />,
                    bg: 'bg-yellow-500/20',
                    border: 'border-yellow-500/30',
                    shadow: 'shadow-[0_0_30px_rgba(234,179,8,0.3)]',
                    buttonVariant: 'gradient' as const, // Assuming 'gradient' is valid from previous usage or we use default
                    gradientTitle: 'from-yellow-200 to-yellow-500'
                };
            case 'info':
            default:
                return {
                    icon: <Bell className="w-10 h-10 text-primary" />,
                    bg: 'bg-primary/20',
                    border: 'border-primary/30',
                    shadow: 'shadow-[0_0_30px_rgba(234,56,76,0.3)]',
                    buttonVariant: 'gradient' as const,
                    gradientTitle: 'from-white to-zinc-400'
                };
        }
    };

    const styles = getStyles();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-lg bg-zinc-900 border ${notification.type === 'alert' ? 'border-red-500/50' : 'border-primary/50'} text-white rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-scale-in`}>

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-full hover:bg-zinc-700"
                >
                    <X size={20} />
                </button>

                {/* Decoration */}
                <div className="flex justify-center mb-6">
                    <div className={`${styles.bg} p-4 rounded-full border ${styles.border} ${styles.shadow} animate-pulse`}>
                        {styles.icon}
                    </div>
                </div>

                {/* Text */}
                <div className="text-center space-y-4">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${styles.gradientTitle} bg-clip-text text-transparent uppercase tracking-wide`}>
                        {notification.title || "New Update"}
                    </h3>
                    <p className="text-lg text-zinc-200 leading-relaxed font-medium">
                        {notification.message}
                    </p>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                    <Button
                        onClick={handleAction}
                        className={`w-full h-12 text-lg font-bold shadow-lg ${notification.type === 'alert' ? 'shadow-red-500/20' : 'shadow-primary/25'}`}
                        variant={notification.type === 'alert' ? 'destructive' : 'gradient'}
                    >
                        {notification.buttonText || "Check it out"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
