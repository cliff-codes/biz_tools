export type SideNavBtnProps = {
    btnName: string;
    btnIcon: React.ReactNode;
    route?: string;
    counter?: number;
};

export type GenereateButtonProps = {
    route: string;
};

export type InvoiceProduct = {
    id: number;
    description: string;
    rate: number;
    quantity: number;
    amount: number;
};

export type SavedInvoice = {
    id: string;
    invoiceId: string;
    businessName: string;
    businessEmail: string;
    businessAddress: string;
    businessPhone: string;
    recipientName: string;
    recipientEmail: string;
    recipientAddress: string;
    recipientPhone: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}
