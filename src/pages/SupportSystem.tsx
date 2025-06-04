
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Headphones, Plus, Search, Eye, Edit } from "lucide-react";
import { SupportTicketModal } from "@/components/SupportTicketModal";
import { ViewSupportTicketModal } from "@/components/ViewSupportTicketModal";
import { EditSupportTicketModal } from "@/components/EditSupportTicketModal";
import { toast } from "@/hooks/use-toast";

const SupportSystem = () => {
  const [tickets, setTickets] = useState([
    { 
      id: "TICK-001", 
      subject: "Login Issue", 
      priority: "High", 
      category: "Technical", 
      status: "Open", 
      createdAt: "2025-01-27", 
      assignedTo: "John Support",
      description: "User unable to login with correct credentials. Getting error message 'Invalid login'."
    },
    { 
      id: "TICK-002", 
      subject: "Billing Question", 
      priority: "Medium", 
      category: "Billing", 
      status: "In Progress", 
      createdAt: "2025-01-26", 
      assignedTo: "Jane Support",
      description: "Customer inquiry about subscription charges appearing twice on their statement."
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveTicket = (newTicket: any) => {
    setTickets([...tickets, newTicket]);
  };

  const handleUpdateTicket = (updatedTicket: any) => {
    setTickets(tickets.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
  };

  const handleViewTicket = (ticket: any) => {
    setViewingTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleEditTicket = (ticket: any) => {
    setEditingTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    const ticket = tickets.find(t => t.id === ticketId);
    toast({
      title: "Status Updated",
      description: `Ticket ${ticket?.id} status has been changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Support System</h1>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Support Tickets</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
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
                  <th className="text-left py-3 px-4">Ticket ID</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Assigned To</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleStatusChange(ticket.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">{ticket.createdAt}</td>
                    <td className="py-3 px-4">{ticket.assignedTo}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTicket(ticket)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SupportTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicket}
      />

      <ViewSupportTicketModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={viewingTicket}
      />

      <EditSupportTicketModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        ticket={editingTicket}
        onSave={handleUpdateTicket}
      />
    </div>
  );
};

export default SupportSystem;
