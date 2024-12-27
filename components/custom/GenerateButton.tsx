import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { GenereateButtonProps } from '@/types';

const GenerateButton = ({ route, text, icon }: GenereateButtonProps) => {
    return (
        <Link href={route}>
            <Button className="bg-[#6e69ff] font-semibold hover:bg-[#433df3]">
                {icon && <>{icon}</>}
                {text || 'Generate'}
            </Button>
        </Link>
    );
};

export default GenerateButton;
