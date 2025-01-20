'use client';
import { AiFillPrinter } from 'react-icons/ai';
import React from 'react';
import { IoDownload } from 'react-icons/io5';
import Logo from '@/components/custom/Logo';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { useInvoiceStore } from '@/store/Invoice';

const InvoicePreview = () => {
    const { buzinessInfo, recipientInfo, products, totalProductsCost, invoiceId } =
        useInvoiceStore();

    const formattedDate = () => {
        const date = new Date();
        return date.toLocaleDateString('en-US');
    };

    console.log(" this is recipientInfo: ", recipientInfo);
    //console.log("biz Info: ", buzinessInfo)

    console.log("recipientName: ", recipientInfo.name);

    return (
        <div className="w-full bg-white rounded-[11px] px-4 py-4 flex flex-col gap- z-50">
            <div className="w-full flex justify-between place-items-center">
                <h1 className="font-bold text-[24px] py-2">Preview</h1>
                <div className="flex place-items-center gap-2">
                    <AiFillPrinter
                        fill="#605BFF"
                        className="w-[30px] h-[30px] hover:bg-[#615bff7a] rounded-full py-1 px-1 transition-all .01 ease-linear"
                    />
                    <IoDownload
                        fill="#605BFF"
                        className="w-[30px] h-[30px] hover:bg-[#615bff7a] rounded-full py-1 px-1 transition-all .01 ease-linear"
                    />
                </div>
            </div>

            {/* invoice preview */}
            <div
                id="pdf-section"
                className="w-full bg-slate-50 rounded-md h-auto p-3 flex flex-col gap-20"
            >
                <div className="flex justify-between place-items-center">
                    {/* your logo */}
                    <div className="">
                        <Logo size={90} />
                    </div>

                    {/* your company/business credentials */}
                    <div>
                        <div>{buzinessInfo.email || 'yourbusiness@gmail.com'}</div>
                        <div>{buzinessInfo.phone || '+1 (123) 456-7890'}</div>
                    </div>
                </div>

                <div className="flex justify-between">
                    {/* recipent details*/}
                    <div>
                        <h3 className="font-semibold sm:text-xl">Recipient</h3>
                        <div>{recipientInfo.name || 'Recipient Name'}</div>
                        <div>{recipientInfo.address || 'Recipient Address'}</div>
                        <div>{recipientInfo.phone || 'Recipient Phone'}</div>
                    </div>

                    {/* invoice details */}
                    <div className="flex flex-col gap-4">
                        <h1 className="font-semibold text-5xl">Invoice</h1>
                        <div>
                            <h4 className="font-semibold">INVOICE NO.</h4>
                            <div>{invoiceId}</div>
                        </div>
                        <div>
                            <h4 className="font-semibold">INVOICE DATE</h4>
                            <div>{formattedDate()}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Description table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold">
                                Product / Service Description
                            </TableHead>
                            <TableHead className="font-semibold">Rate</TableHead>
                            <TableHead className="font-semibold">Quantity</TableHead>
                            <TableHead className="font-semibold">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* your invoice items */}
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.rate}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.amount}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>$0.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Total</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="font-semibold">{`$${totalProductsCost()}`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="py-2">
                <h3 className="font-semibold">NOTES</h3>
                <p className="text-sm">
                    Please make your payment within 30 days of this invoice. If not, we will
                    consider the invoice as unpaid.
                    <br />
                    Thank you for your business.
                </p>
            </div>

            <div className="flex justify-between border-t-2 text-sm py-2">
                <div>
                    <h3>{buzinessInfo.name || 'Your company / biz name'}</h3>
                    <p>{buzinessInfo.address || 'Your company / biz address'}</p>
                </div>

                <div>
                    <p>{buzinessInfo.email || 'company@gmail.com'}</p>
                    <p>{buzinessInfo.phone || 'contact'}</p>
                </div>

                {/* <div>
                    <p>www.yourcompany.com</p>
                </div> */}
            </div>
        </div>
    );
};

export default InvoicePreview;
