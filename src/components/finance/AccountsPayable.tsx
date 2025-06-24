
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AccountsPayable = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Accounts Payable</h2>
        <p className="text-gray-600">Manage vendor invoices, payments, and purchase orders</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>AP Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Vendor master data management</li>
            <li>Purchase order processing</li>
            <li>Invoice matching (3-way)</li>
            <li>Payment processing</li>
            <li>Aging reports</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPayable;
