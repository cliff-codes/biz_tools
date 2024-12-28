import { Loader } from 'lucide-react';
import React from 'react';

type Props = {
    showLoader: boolean;
};

const CreatingInvoiceLoader = ({ showLoader }: Props) => {
    if (!showLoader) {
        return null;
    }
    return (
        <div>
            {/* transparent modal with transparent background */}
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-50"></div>
            <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center place-items-center">
                <div className="max-w-52 w-full bg-white flex justify-center place-items-center px-8 py-4 rounded-xl">
                    <div className="flex gap-4 place-items-center">
                        <div className="animate-spin rounded-full border-4">
                            <Loader />
                        </div>
                        <p className="text-slate-600 text-sm sm:text-base">Creating invoice...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatingInvoiceLoader;
