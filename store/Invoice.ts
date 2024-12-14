import { InvoiceProduct } from '@/types';
import { create } from 'zustand';

interface InvoiceStore {
    products: InvoiceProduct[] | [];
    addProduct: (product: InvoiceProduct) => void;
    removeProduct: (index: number) => void;
    updateProduct: (index: number, product: InvoiceProduct) => void;
    clearProducts: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
    products: [],
    addProduct: (product) =>
        set((state) => ({ ...state, products: [...(state.products || []), product] })),
    removeProduct: (index) =>
        set((state) => ({
            ...state,
            products: [...state.products.slice(0, index), ...state.products.slice(index + 1)],
        })),
    updateProduct: (index, product) =>
        set((state) => ({
            ...state,
            products: [
                ...state.products.slice(0, index),
                product,
                ...state.products.slice(index + 1),
            ],
        })),
    clearProducts: () => set((state) => ({ ...state, products: [] })),
}));
