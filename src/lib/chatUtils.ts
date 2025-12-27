
export interface ChatMessage {
    id: string;
    user: string;
    message: string;
    timestamp: number; // Unix timestamp
    avatar?: string; // Optional avatar initialization
}

const STORAGE_KEY = "anushka_live_chats_v2";
// Chat utility functions - managing persistent chat storage


export const getChats = (): ChatMessage[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
        return JSON.parse(saved);
    } catch (e) {
        return [];
    }
};

export const saveChats = (chats: ChatMessage[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

export const addChat = (user: string, message: string, isAdmin: boolean = false) => {
    const chats = getChats();
    const newChat: ChatMessage = {
        id: Date.now().toString(),
        user: isAdmin ? "Admin" : user,
        message: message,
        timestamp: Date.now()
    };

    // Add to top
    chats.unshift(newChat);
    saveChats(chats);
    return chats;
};

// Returns a human-readable "time ago" string
export const formatTimeAgo = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
};

export const initializeChats = (): ChatMessage[] => {
    // Only return chats that actually exist in storage (user/admin conversations)
    // No auto-seeding or random generation
    return getChats();
};
