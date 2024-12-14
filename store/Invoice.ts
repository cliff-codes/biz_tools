import { InvoiceProduct } from '@/types';
import { create } from 'zustand';

interface InvoiceStore {
    products: InvoiceProduct[] | [];
    totalProducts: number;
    addProduct: (product: InvoiceProduct) => void;
    removeProduct: (index: number) => void;
    updateProduct: (id: number, product: InvoiceProduct) => void;
    findProductById: (id: number | null) => InvoiceProduct | null;
    clearProducts: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
    products: [],
    get totalProducts() {
        return this.products.length;
    },
    addProduct: (product) =>
        set((state) => ({
            ...state,
            products: [...(state.products || []), { ...product, id: state.products.length + 1 }],
        })),
    removeProduct: (index) =>
        set((state) => ({
            ...state,
            products: [...state.products.slice(0, index), ...state.products.slice(index + 1)],
        })),
    updateProduct: (id, product) =>
        set((state) => {
            return {
                ...state,
                products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
            };
        }),
    findProductById: (id) => {
        if (!id) return null;
        const product = get().products.find((product: InvoiceProduct) => product.id === id);
        if (!product) return null;
        return product;
    },
    clearProducts: () => set((state) => ({ ...state, products: [] })),
}));
