
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaxManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Tax Management</h2>
        <p className="text-gray-600">Handle tax calculations and compliance</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tax Management Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Sales tax, VAT, GST calculations</li>
            <li>Tax report generation</li>
            <li>Tax filing support</li>
            <li>Tax adjustments</li>
            <li>Exemption management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxManagement;
