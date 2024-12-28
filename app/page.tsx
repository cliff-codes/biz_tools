import { Suspense } from 'react';
import GenerateButton from '@/components/custom/GenerateButton';
import SearchBox from '@/components/custom/SearchBox';
import InvoicesPreviewTable from '@/components/tables/InvoicesPreviewTable';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

async function getInvoices() {
    try {
        // Add pagination and ordering
        const invoices = await prisma.invoice.findMany({
            take: 10, // Limit to 10 most recent invoices for preview
            orderBy: {
                createdAt: 'desc',
            },
        });

        console.log('invoices: ' + { ...invoices });

        return { invoices, error: null };
    } catch (error) {
        console.error('Failed to fetch invoices:', error);
        return { invoices: [], error: 'Failed to load invoices' };
    } finally {
        await prisma.$disconnect(); // Properly close the database connection
    }
}

export default async function Home() {
    const { invoices, error } = await getInvoices();
    const totalInvoices = invoices?.length ?? 0;

    console.log(invoices, totalInvoices, error);
    // Handle error state
    if (error) {
        return (
            <div className="w-full flex justify-center items-center p-4">
                <p className="text-red-500">Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (
        <main className="w-full flex flex-col px-10 gap-4 pt-3">
            <div className="flex w-full place-items-center justify-between pt-8 font-medium">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800">
                    Activities Preview
                </h1>
                <SearchBox />
            </div>

            <div className="flex flex-col gap-6">
                <Suspense fallback={<div>Loading invoices...</div>}>
                    <div className="min-h-[300px] bg-white rounded-xl p-4">
                        <div className=" flex place-items-center border-b py-1">
                            <h1 className="text-sm sm:text-base font-semibold w-full pb-2">
                                {totalInvoices} Invoice(s) generated
                            </h1>
                            <GenerateButton route="/invoice" icon={<Plus />} text={'Add'} />
                        </div>

                        {totalInvoices === 0 ? (
                            <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center">
                                <p className="text-sm sm:text-base text-gray-400 text-pretty">
                                    No invoices generated yet.
                                </p>
                                <GenerateButton route="/invoice" />
                            </div>
                        ) : (
                            <InvoicesPreviewTable invoices={invoices} />
                        )}
                    </div>
                </Suspense>

                <div className="h-[300px] bg-white rounded-xl p-4">
                    <h1 className="text-sm sm:text-base font-semibold w-full border-b pb-2">
                        Mail(s)
                    </h1>
                    <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center">
                        <p className="text-sm sm:text-base text-gray-400 text-pretty">
                            No invoices generated yet.
                        </p>
                        <GenerateButton route="/mail" />
                    </div>
                </div>
            </div>
        </main>
    );
}
