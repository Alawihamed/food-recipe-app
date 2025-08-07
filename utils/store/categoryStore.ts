import { create } from 'zustand';

interface CategoryState {
    category: string;
    handleCategory: (category: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
    category: '',
    handleCategory: (category: string) => set({ category: category }),
}));

export default useCategoryStore;
