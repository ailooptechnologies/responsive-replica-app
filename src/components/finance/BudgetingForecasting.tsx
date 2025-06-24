
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetingForecasting = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Budgeting & Forecasting</h2>
        <p className="text-gray-600">Create budgets and perform variance analysis</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Budgeting Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Budget creation and management</li>
            <li>Variance analysis</li>
            <li>Rolling forecasts</li>
            <li>Department/project budgets</li>
            <li>Budget approvals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetingForecasting;
