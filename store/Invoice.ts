
import { InvoiceProduct } from '@/types';
import { create } from 'zustand';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    invoiceId: string;
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
    setInvoiceId: (id: string) => void;
    totalProductsCost: () => number;
    generateInvoicePdf: () => Promise<Blob | undefined>;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
    products: [],
    invoiceId: "0000000",
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

    setInvoiceId: (id) => set((state) => ({...state, invoiceId: id.toString() })),
    buzinessInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
    },
    recipientInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
    },
    setBuzinessInfo: (info) => set((state) => ({ ...state, buzinessInfo: { ...info } })),
    setRecipientInfo: (info) => set((state) => ({ ...state, recipientInfo: { ...info } })),
    generateInvoicePdf: async () => {
        const section = document.getElementById("pdf-section");
        if (!section) return;

        const canvas = await html2canvas(section)
        const imgData = canvas.toDataURL("image/png");

        // Generate pdf 
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        const pdfBlob = pdf.output("blob")
        return pdfBlob
    }
}));
