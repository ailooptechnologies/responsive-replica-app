
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancialReporting = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Financial Reporting</h2>
        <p className="text-gray-600">Generate financial statements and custom reports</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Financial Reporting Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>P&L, Balance Sheet, Cash Flow</li>
            <li>Custom report builder</li>
            <li>PDF, Excel, CSV export</li>
            <li>Real-time dashboards</li>
            <li>KPI tracking</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReporting;
