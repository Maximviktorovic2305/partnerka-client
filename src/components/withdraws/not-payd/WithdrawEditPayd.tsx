'use client'

import { Check, CircleX } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    value?: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}

const WithdrawEditPayd = ({ className, value, onChange }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSetPayd = (newValue: boolean) => {
        onChange(newValue); 
        setIsEditing(false);
    };

    return (
        <div className={`flex flex-col relative gap-[2px] mb-1 text-primary ${className}`}>
            {value === true ? (
                <Check onClick={() => setIsEditing(true)} className='w-5 h-auto text-green-500 cursor-pointer' />
            ) : (
                <CircleX onClick={() => setIsEditing(true)} className='w-5 cursor-pointer h-auto text-red-500' />
            )}

            {isEditing && (
                <div className='absolute flex items-center bg-gray-500 gap-3 -top-3 -left-3 z-50 border border-white/50 p-3 rounded'>
                    <Check
                        onClick={() => handleSetPayd(true)}
                        className='w-5 h-auto cursor-pointer text-green-500'
                    />
                    <CircleX
                        onClick={() => handleSetPayd(false)}
                        className='w-5 cursor-pointer h-auto text-red-500'
                    />
                </div>
            )}
        </div>
    );
};

export default WithdrawEditPayd;
