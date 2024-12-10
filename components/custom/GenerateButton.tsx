import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

type Props = {
    route: string;
};
const GenerateButton = ({ route }: Props) => {
    return (
        <Link href={route}>
            <Button className="bg-[#6e69ff] font-semibold hover:bg-[#433df3]">Generate</Button>
        </Link>
    );
};

export default GenerateButton;
