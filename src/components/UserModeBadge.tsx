'use client';

import React from 'react';
import { useCart } from '@/context//DataContext'

const UserModeBadge = () => {
  const { isWholesale } = useCart();

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        isWholesale ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {isWholesale ? 'Wholesale Mode' : 'Retail Mode'}
    </span>
  );
};

export default UserModeBadge;
