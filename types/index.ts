export type CategoriesResponse = {
    categories: Category[];
};

export type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};