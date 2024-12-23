import { InvoiceProduct } from '@/types';
import { create } from 'zustand';

interface ReceipientInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
}

interface BizInfo extends ReceipientInfo {
    logoUrl?: string;
}

interface InvoiceStore {
    products: InvoiceProduct[] | [];
    totalProducts: number;
    addProduct: (product: InvoiceProduct) => void;
    removeProduct: (index: number) => void;
    updateProduct: (id: number, product: InvoiceProduct) => void;
    findProductById: (id: number | null) => InvoiceProduct | null;
    clearProducts: () => void;
    buzinessInfo: BizInfo;
    recipientInfo: ReceipientInfo;
    setBuzinessInfo: (info: BizInfo) => void;
    setRecipientInfo: (info: ReceipientInfo) => void;
    generateInvoiceNumber: () => string;
    totalProductsCost: () => number;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
    products: [],
    get totalProducts() {
        return this.products.length;
    },
    totalProductsCost: () => {
        const products = get().products
        if (!products) return 0;
        return products.reduce((total:number, product:InvoiceProduct) => total + product.amount, 0);
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

    buzinessInfo: {
        name: 'Your Business Name',
        address: 'Your Address',
        phone: 'Your Phone Number',
        email: 'Your Email',
    },
    recipientInfo: {
        name: 'Recipient Name',
        address: 'Recipient Address',
        phone: 'Recipient Phone',
        email: 'Recipient Email',
    },
    setBuzinessInfo: (info) => set((state) => ({ ...state, buzinessInfo: { ...info } })),
    setRecipientInfo: (info) => set((state) => ({ ...state, recipientInfo: { ...info } })),
    generateInvoiceNumber: () => {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
        const prefix = 'INV';

        let newNumber = 1;

        const formattedNumber = newNumber.toString().padStart(3, '0');
        return `${prefix}-${formattedDate}-${formattedNumber}`;
    }
}));
