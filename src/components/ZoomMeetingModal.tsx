
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ZoomMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting?: any;
  onSave: (meeting: any) => void;
}

export function ZoomMeetingModal({ isOpen, onClose, meeting, onSave }: ZoomMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "60",
    participants: "",
    agenda: ""
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        title: meeting.title || "",
        date: meeting.date || "",
        time: meeting.time || "",
        duration: meeting.duration || "60",
        participants: meeting.participants || "",
        agenda: meeting.agenda || ""
      });
    } else {
      setFormData({ title: "", date: "", time: "", duration: "60", participants: "", agenda: "" });
    }
  }, [meeting]);

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const meetingData = meeting ? {
      ...meeting,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      participants: formData.participants,
      agenda: formData.agenda
    } : {
      id: `MEET-${Date.now()}`,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      participants: formData.participants,
      agenda: formData.agenda,
      status: "Scheduled",
      meetingId: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toLocaleDateString()
    };

    onSave(meetingData);
    if (!meeting) {
      setFormData({ title: "", date: "", time: "", duration: "60", participants: "", agenda: "" });
    }
    onClose();
    
    toast({
      title: meeting ? "Meeting Updated" : "Meeting Scheduled",
      description: `Zoom meeting "${meetingData.title}" has been ${meeting ? "updated" : "scheduled"} successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {meeting ? "Edit Meeting" : "Schedule Zoom Meeting"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Meeting Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter meeting title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="60"
            />
          </div>
          <div>
            <Label htmlFor="participants">Participants (emails)</Label>
            <Input
              id="participants"
              value={formData.participants}
              onChange={(e) => setFormData({...formData, participants: e.target.value})}
              placeholder="email1@company.com, email2@company.com"
            />
          </div>
          <div>
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea
              id="agenda"
              rows={3}
              value={formData.agenda}
              onChange={(e) => setFormData({...formData, agenda: e.target.value})}
              placeholder="Meeting agenda and topics to discuss"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              {meeting ? "Update Meeting" : "Schedule Meeting"}
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
