
export interface ChatMessage {
    id: string;
    user: string;
    message: string;
    timestamp: number; // Unix timestamp
    avatar?: string; // Optional avatar initialization
}

const STORAGE_KEY = "anushka_live_chats";
const LAST_UPDATE_KEY = "anushka_chat_last_update";

// Pre-defined realistic messages for auto-generation
// Pre-defined realistic messages for auto-generation
const REALISTIC_MESSAGES = [
    "payment kar diya hai verify kab hoga",
    "waiting for next session",
    "anushka you are looking too hot",
    "group link active h kya",
    "received the photos quality is amazing",
    "bhai log trust me its genuine",
    "maza aa gaya aaj ki call mein",
    "can i pay via gpay",
    "please reply fast wait nahi ho raha",
    "album unlock kiya worth every penny",
    "video call schedule kar sakte hain kya",
    "night slot available hai",
    "bhai mast maal h",
    "kya cheez h yar ye",
    "love you anushka",
    "paytm chalega kya"
];

const REALISTIC_USERS = [
    "Rahul_King", "DesiBoy99", "Vikram_S", "Arjun_K", "Cool_Sameer",
    "Rohit_007", "Manish_T", "Lucky_Star", "Vishal_R", "Deepak_J"
];

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
    let chats = getChats();
    const now = Date.now();
    const lastUpdate = parseInt(localStorage.getItem(LAST_UPDATE_KEY) || "0");

    // 1. Seed if empty
    if (chats.length === 0) {
        chats = [
            { id: "1", user: "Sunny_Boy", message: "bhai abhi call kiya tha anushka real h", timestamp: now - 120000 },
            { id: "2", user: "Lucky88", message: "payment verify hone me kitna time lagta h", timestamp: now - 300000 },
            { id: "3", user: "Admin", message: "lucky88 usually 2-3 mins lagte hain", timestamp: now - 360000 },
            { id: "4", user: "Killer_King", message: "saree wala session best h yar", timestamp: now - 600000 },
            { id: "5", user: "Vishal_99", message: "next session book kar liya anushka", timestamp: now - 720000 },
            { id: "6", user: "Rohit_J", message: "recorded videos 4k mein hain kya", timestamp: now - 1200000 },
            { id: "7", user: "Amit_Cool", message: "yes bro quality ekdum clear hai", timestamp: now - 2880000 },
            { id: "8", user: "Desi_Lover", message: "i love your voice anushka", timestamp: now - 3600000 },
            { id: "9", user: "Manish_T", message: "payment done waiting for link", timestamp: now - 14400000 }
        ];
        saveChats(chats);
        localStorage.setItem(LAST_UPDATE_KEY, now.toString());
        return chats;
    }

    // 2. Auto-add new messages if > 4 hours gap since last update
    // The user wants "automated in very 4 hours of gap ... 1 or 2 messages"
    // We check if 4 hours have passed since the LAST UPDATE check.
    const FOUR_HOURS = 4 * 60 * 60 * 1000;

    if (now - lastUpdate > FOUR_HOURS) {
        const numToAdd = Math.random() > 0.5 ? 2 : 1;

        for (let i = 0; i < numToAdd; i++) {
            const randomUser = REALISTIC_USERS[Math.floor(Math.random() * REALISTIC_USERS.length)];
            const randomMsg = REALISTIC_MESSAGES[Math.floor(Math.random() * REALISTIC_MESSAGES.length)];
            // Generate a timestamp that is "recent" relative to now (e.g., within last 30 mins)
            // so it looks like it just happened while the user was away
            const randomTime = now - Math.floor(Math.random() * 30 * 60 * 1000);

            chats.unshift({
                id: Date.now().toString() + i,
                user: randomUser,
                message: randomMsg,
                timestamp: randomTime
            });
        }

        // Sort by timestamp desc just in case
        chats.sort((a, b) => b.timestamp - a.timestamp);

        // Trim if too long (keep last 50)
        if (chats.length > 50) {
            chats = chats.slice(0, 50);
        }

        saveChats(chats);
        localStorage.setItem(LAST_UPDATE_KEY, now.toString());
    }

    return chats;
};
