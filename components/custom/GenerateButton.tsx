import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { GenereateButtonProps } from '@/types';

const GenerateButton = ({ route }: GenereateButtonProps) => {
    return (
        <Link href={route}>
            <Button className="bg-[#6e69ff] font-semibold hover:bg-[#433df3]">Generate</Button>
        </Link>
    );
};

export default GenerateButton;
