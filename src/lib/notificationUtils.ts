
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'alert' | 'promo';
    buttonText: string;
    link: string;
    active: boolean;
    timestamp: string;
}

const STORAGE_KEY = 'anushka_notification';

export const getNotification = (): Notification | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const setNotification = (data: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'alert' | 'promo';
    buttonText: string;
    link: string;
}): Notification => {
    const notification: Notification = {
        id: Date.now().toString(),
        ...data,
        active: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notification));
    window.dispatchEvent(new Event('storage')); // Trigger update across tabs/components
    return notification;
};

export const clearNotification = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('storage'));
};
