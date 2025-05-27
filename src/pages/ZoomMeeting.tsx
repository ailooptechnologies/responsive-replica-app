
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Plus } from "lucide-react";

const ZoomMeeting = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Zoom Meeting</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Video Conferencing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Zoom integration ready.</p>
            <p className="text-sm">Schedule and manage video meetings here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoomMeeting;
