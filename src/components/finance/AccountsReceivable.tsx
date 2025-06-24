
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AccountsReceivable = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Accounts Receivable</h2>
        <p className="text-gray-600">Manage customer invoices, receipts, and collections</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>AR Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Customer master data</li>
            <li>Invoice generation and tracking</li>
            <li>Payment receipts</li>
            <li>Dunning processes</li>
            <li>Customer statements</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsReceivable;
