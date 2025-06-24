
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinanceSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Finance Settings</h2>
        <p className="text-gray-600">Configure financial module settings and currencies</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Finance Settings Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Multi-currency setup</li>
            <li>Exchange rate management</li>
            <li>Period-end processes</li>
            <li>Payment method configuration</li>
            <li>Integration settings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSettings;
