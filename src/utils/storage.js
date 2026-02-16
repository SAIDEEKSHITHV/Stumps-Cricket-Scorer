// LocalStorage wrapper for match state persistence

const STORAGE_KEY = 'cricket_match_state';

export const saveMatch = (matchState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matchState));
    } catch (error) {
        console.error('Failed to save match:', error);
    }
};

export const loadMatch = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Failed to load match:', error);
        return null;
    }
};

export const clearMatch = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear match:', error);
    }
};
