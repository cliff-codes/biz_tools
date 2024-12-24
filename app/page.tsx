import GenerateButton from '@/components/custom/GenerateButton';
import SearchBox from '@/components/custom/SearchBox';
import InvoicesPreviewTable from '@/components/tables/InvoicesPreviewTable';
import prisma from '@/lib/db';

export default async function Home() {
    const invoices = await prisma.invoice.findMany();
    console.log(invoices);
    const totalInvoices = invoices.length;

    return (
        <main className="w-full flex flex-col px-10 gap-4 pt-3">
            <div className="flex w-full place-items-center justify-between pt-8 font-medium">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 ">
                    Activities Preview
                </h1>

                <SearchBox />
            </div>
            <div className="flex flex-col gap-6">
                <div className="h-[300px] bg-white rounded-xl p-4">
                    <h1 className="text-sm sm:text-base font-semibold w-full border-b  pb-2">
                        Invoice(s)
                    </h1>

                    {/* empty invoices if there are none generated */}
                    {(totalInvoices === 0 || !invoices) && (
                        <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center">
                            <p className="text-sm sm:text-base text-gray-400 text-pretty">
                                No invoices generated yet.
                            </p>
                            <GenerateButton route="/invoice" />
                        </div>
                    )}
                    {/* store invoices preview Table */}
                    {totalInvoices > 0 && <InvoicesPreviewTable invoices={invoices} />}
                </div>

                <div className="h-[300px] bg-white rounded-xl p-4">
                    <h1 className="text-sm sm:text-base font-semibold w-full border-b  pb-2">
                        Mail(s)
                    </h1>
                    {/* empty invoices if there are none generated */}
                    <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center">
                        <p className="text:sm sm:text-base text-gray-400 text-pretty">
                            No invoices generated yet.
                        </p>
                        <GenerateButton route="/mail" />
                    </div>
                </div>
            </div>
        </main>
    );
}
