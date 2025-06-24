
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FixedAssets = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Fixed Asset Management</h2>
        <p className="text-gray-600">Track asset acquisition, depreciation, and disposal</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fixed Assets Module - Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This module will include:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Asset acquisition tracking</li>
            <li>Multiple depreciation methods</li>
            <li>Asset revaluation</li>
            <li>Disposal management</li>
            <li>GL integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FixedAssets;
