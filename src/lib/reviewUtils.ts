
export interface Review {
    id: string;
    name: string;
    rating: number;
    text: string;
    timestamp: number;
}

const STORAGE_KEY = "anushka_reviews";

const INITIAL_REVIEWS: Review[] = [
    { id: "1", name: "Rahul K.", rating: 5, text: "sexy ekdum pura maal nikal diya", timestamp: Date.now() },
    { id: "2", name: "Suresh P.", rating: 5, text: "Video quality ekdum top notch hai. Sab kuch ekdum private aur secure rehta hai.", timestamp: Date.now() },
    { id: "3", name: "Vikram M.", rating: 5, text: "Recorded videos ki quality real 4K hai. Paisa vasool!", timestamp: Date.now() },
    { id: "4", name: "Ankit S.", rating: 5, text: "Bhai log, Anushka real hai aur bahut hi acchha cum karati hai", timestamp: Date.now() },
    { id: "5", name: "Deepak J.", rating: 5, text: "Payment smoothly ho gaya aur 5 min ke andar call connect ho gayi.", timestamp: Date.now() },
    { id: "6", name: "Sameer T.", rating: 5, text: "Anushka ne bahut maza dilaya. one day i will fuck you", timestamp: Date.now() }
];

export const getReviews = (): Review[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        // Initialize with default reviews if nothing saved
        const initialWithIds = INITIAL_REVIEWS.map((r, index) => ({
            ...r,
            // Stagger timestamps slightly if needed, though mostly irrelevant now
            timestamp: Date.now() - (index * 1000000)
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialWithIds));
        return initialWithIds;
    }

    try {
        return JSON.parse(saved);
    } catch (e) {
        return [];
    }
};

export const addReview = (name: string, rating: number, text: string) => {
    const reviews = getReviews();
    const newReview: Review = {
        id: Date.now().toString(),
        name,
        rating,
        text,
        timestamp: Date.now()
    };

    // Add to top
    reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    return reviews;
};
