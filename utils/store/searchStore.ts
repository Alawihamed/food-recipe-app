import { create } from 'zustand';

interface SearchState {
    query: string;
    handleSearch: (query: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    query: '',
    handleSearch: (query: string) => set({ query: query }),
}));

export default useSearchStore;
