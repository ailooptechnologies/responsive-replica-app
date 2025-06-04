
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Video, Plus, Search, Eye } from "lucide-react";
import { ZoomMeetingModal } from "@/components/ZoomMeetingModal";

const ZoomMeeting = () => {
  const [meetings, setMeetings] = useState([
    { id: "MEET-001", title: "Team Standup", date: "2025-01-28", time: "09:00", duration: "30", status: "Scheduled", meetingId: "123-456-789" },
    { id: "MEET-002", title: "Project Review", date: "2025-01-29", time: "14:00", duration: "60", status: "Scheduled", meetingId: "987-654-321" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveMeeting = (newMeeting: any) => {
    setMeetings([...meetings, newMeeting]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Zoom Meeting</h1>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Scheduled Meetings</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Meeting ID</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{meeting.meetingId}</td>
                    <td className="py-3 px-4">{meeting.title}</td>
                    <td className="py-3 px-4">{meeting.date}</td>
                    <td className="py-3 px-4">{meeting.time}</td>
                    <td className="py-3 px-4">{meeting.duration} min</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Cancel</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ZoomMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMeeting}
      />
    </div>
  );
};

export default ZoomMeeting;
