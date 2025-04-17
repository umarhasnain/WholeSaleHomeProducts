'use client'
import { DataContext } from '@/context/DataContext';
import React, { useContext } from 'react';

const Page = () => {
    const context = useContext(DataContext);
    const dataSet = context?.products;
    console.log('data===>', dataSet);

    return (
        <div>
            {/* Render your product details here */}
        </div>
    )
}

export default Page;
