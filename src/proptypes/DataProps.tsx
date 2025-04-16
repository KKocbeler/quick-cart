export interface DataProps {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    quantity: number;
    description: string;
    color: string[];
    selectedColor?: string
    brand?: string;
    isProductAddFav: boolean;
    star: number;
    commentCount: number;
}