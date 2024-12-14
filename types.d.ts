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
    description: string;
    rate?: number;
    quantity?: number;
    amount: number;
};
