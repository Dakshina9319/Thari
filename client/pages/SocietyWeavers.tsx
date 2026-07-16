import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Users,
  MapPin,
  Scissors,
  TrendingUp,
  Package,
  Star,
  MessageCircle,
  Phone,
  Plus,
  Edit,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';

// Sample society weavers data
const weavers = [
  {
    id: 1,
    name: 'Lakshmi Devi',
    location: 'Kanchipuram, Tamil Nadu',
    phone: '+91 98765 43210',
    email: 'lakshmi.devi@tharikai.com',
    speciality: 'Kanjivaram Silk',
    status: 'active',
    joiningDate: '2022-01-15',
    monthlyProduction: 8,
    totalEarnings: 245000,
    rating: 4.9,
    pendingOrders: 3,
    completedOrders: 42,
    qualityScore: 98,
    onTimeDelivery: 95,
    avatar: '/placeholder.svg',
    supplies: {
      silk: { allocated: 50, used: 35, remaining: 15 },
      zari: { allocated: 20, used: 18, remaining: 2 },
      dyes: { allocated: 10, used: 8, remaining: 2 }
    },
    recentCommunications: [
      { date: '2024-02-01', type: 'supply_request', message: 'Requesting additional zari for wedding orders' },
      { date: '2024-01-28', type: 'quality_update', message: 'Completed quality check for order THR-001' },
    ]
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Varanasi, Uttar Pradesh',
    phone: '+91 98765 43211',
    email: 'rajesh.kumar@tharikai.com',
    speciality: 'Banarasi Silk',
    status: 'active',
    joiningDate: '2021-08-20',
    monthlyProduction: 6,
    totalEarnings: 185000,
    rating: 4.8,
    pendingOrders: 2,
    completedOrders: 35,
    qualityScore: 96,
    onTimeDelivery: 92,
    avatar: '/placeholder.svg',
    supplies: {
      silk: { allocated: 40, used: 32, remaining: 8 },
      zari: { allocated: 30, used: 25, remaining: 5 },
      dyes: { allocated: 8, used: 7, remaining: 1 }
    },
    recentCommunications: [
      { date: '2024-01-30', type: 'production_update', message: 'Banarasi order 50% complete, expected delivery on time' },
    ]
  },
  {
    id: 3,
    name: 'Meera Sharma',
    location: 'Chanderi, Madhya Pradesh',
    phone: '+91 98765 43212',
    email: 'meera.sharma@tharikai.com',
    speciality: 'Chanderi Cotton',
    status: 'probation',
    joiningDate: '2023-03-10',
    monthlyProduction: 12,
    totalEarnings: 125000,
    rating: 4.7,
    pendingOrders: 5,
    completedOrders: 28,
    qualityScore: 89,
    onTimeDelivery: 85,
    avatar: '/placeholder.svg',
    supplies: {
      cotton: { allocated: 30, used: 28, remaining: 2 },
      silk: { allocated: 15, used: 12, remaining: 3 },
      dyes: { allocated: 12, used: 11, remaining: 1 }
    },
    recentCommunications: [
      { date: '2024-02-02', type: 'quality_issue', message: 'Quality concerns raised for order THR-025, under review' },
    ]
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald text-white';
    case 'probation':
      return 'bg-orange-500 text-white';
    case 'inactive':
      return 'bg-destructive text-white';
    default:
      return 'bg-secondary';
  }
};

const WeaverCard = ({ weaver, onViewDetails, onContact }: { 
  weaver: typeof weavers[0]; 
  onViewDetails: (weaver: any) => void;
  onContact: (weaver: any) => void;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={weaver.avatar} alt={weaver.name} />
          <AvatarFallback>{weaver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{weaver.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {weaver.location}
              </p>
              <Badge variant="secondary" className="mt-1 text-xs">
                <Scissors className="h-3 w-3 mr-1" />
                {weaver.speciality}
              </Badge>
            </div>
            <Badge className={getStatusColor(weaver.status)}>
              {weaver.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Monthly Production:</span>
          <p className="font-medium">{weaver.monthlyProduction} sarees</p>
        </div>
        <div>
          <span className="text-muted-foreground">Rating:</span>
          <p className="font-medium flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            {weaver.rating}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Pending Orders:</span>
          <p className="font-medium">{weaver.pendingOrders}</p>
        </div>
        <div>
          <span className="text-muted-foreground">On-time Delivery:</span>
          <p className="font-medium">{weaver.onTimeDelivery}%</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Supply Status</h4>
        <div className="space-y-1">
          {Object.entries(weaver.supplies).map(([material, data]) => (
            <div key={material} className="flex items-center justify-between text-xs">
              <span className="capitalize">{material}:</span>
              <span className={data.remaining < data.allocated * 0.2 ? 'text-destructive font-medium' : ''}>
                {data.remaining}kg remaining
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewDetails(weaver)}>
          View Details
        </Button>
        <Button size="sm" onClick={() => onContact(weaver)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function SocietyWeavers() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWeaver, setSelectedWeaver] = useState<any>(null);
  const [contactWeaver, setContactWeaver] = useState<any>(null);
  const [message, setMessage] = useState('');

  const filteredWeavers = weavers.filter(weaver => {
    const matchesSearch = weaver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         weaver.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         weaver.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || weaver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeWeavers = weavers.filter(w => w.status === 'active').length;
  const totalProduction = weavers.reduce((sum, w) => sum + w.monthlyProduction, 0);
  const avgRating = weavers.reduce((sum, w) => sum + w.rating, 0) / weavers.length;
  const totalEarnings = weavers.reduce((sum, w) => sum + w.totalEarnings, 0);

  const handleContact = (weaver: any) => {
    setContactWeaver(weaver);
  };

  const sendMessage = () => {
    console.log('Sending message to:', contactWeaver?.name, message);
    setContactWeaver(null);
    setMessage('');
  };

  return (
    <Layout userRole={userRole || 'society'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Weaver Management</h1>
          <p className="text-muted-foreground">
            Manage weaver network, coordinate supplies, and oversee production
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">{activeWeavers}</p>
                  <p className="text-sm text-muted-foreground">Active Weavers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-emerald mr-3" />
                <div>
                  <p className="text-2xl font-bold">{totalProduction}</p>
                  <p className="text-sm text-muted-foreground">Monthly Production</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-gold mr-3" />
                <div>
                  <p className="text-2xl font-bold">₹{(totalEarnings / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search weavers by name, location, or specialty..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="probation">Probation</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Weaver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="supplies">Supply Management</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredWeavers.map(weaver => (
                <WeaverCard 
                  key={weaver.id} 
                  weaver={weaver} 
                  onViewDetails={setSelectedWeaver}
                  onContact={handleContact}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="supplies" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {weavers.map(weaver => (
                <Card key={weaver.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{weaver.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{weaver.speciality}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(weaver.supplies).map(([material, data]) => (
                      <div key={material} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{material}</span>
                          <span>{data.remaining}kg / {data.allocated}kg</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              data.remaining < data.allocated * 0.2 ? 'bg-destructive' : 'bg-primary'
                            }`}
                            style={{ width: `${(data.remaining / data.allocated) * 100}%` }}
                          />
                        </div>
                        {data.remaining < data.allocated * 0.2 && (
                          <p className="text-xs text-destructive">Low stock - reorder needed</p>
                        )}
                      </div>
                    ))}
                    <Button size="sm" className="w-full mt-3">
                      Allocate Supplies
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="space-y-4">
              {weavers.flatMap(weaver => 
                weaver.recentCommunications.map((comm, index) => (
                  <Card key={`${weaver.id}-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={weaver.avatar} />
                          <AvatarFallback>{weaver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{weaver.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {comm.type.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comm.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">{comm.message}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Weaver Details Dialog */}
        <Dialog open={!!selectedWeaver} onOpenChange={() => setSelectedWeaver(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{selectedWeaver?.name} - Detailed Profile</DialogTitle>
              <DialogDescription>Complete weaver information and performance metrics</DialogDescription>
            </DialogHeader>
            {selectedWeaver && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>Phone: {selectedWeaver.phone}</p>
                      <p>Email: {selectedWeaver.email}</p>
                      <p>Location: {selectedWeaver.location}</p>
                      <p>Joined: {new Date(selectedWeaver.joiningDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Quality Score:</span>
                        <span className="font-medium">{selectedWeaver.qualityScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>On-time Delivery:</span>
                        <span className="font-medium">{selectedWeaver.onTimeDelivery}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed Orders:</span>
                        <span className="font-medium">{selectedWeaver.completedOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Earnings:</span>
                        <span className="font-medium">₹{selectedWeaver.totalEarnings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleContact(selectedWeaver)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Weaver
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Contact Dialog */}
        <Dialog open={!!contactWeaver} onOpenChange={() => setContactWeaver(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to {contactWeaver?.name}</DialogTitle>
              <DialogDescription>
                Send updates, supply notifications, or general communications
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setContactWeaver(null)}>
                  Cancel
                </Button>
                <Button onClick={sendMessage}>
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
