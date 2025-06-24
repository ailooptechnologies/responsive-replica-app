
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CashBankManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Cash & Bank Management</h2>
        <p className="text-gray-600">Manage cash flows and bank reconciliations</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cash & Bank Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Cash flow management</li>
            <li>Bank reconciliation</li>
            <li>Multiple bank accounts</li>
            <li>Electronic statement imports</li>
            <li>Cash forecasting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashBankManagement;
