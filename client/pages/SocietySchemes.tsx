import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter,
  Calendar, User, IndianRupee, Eye, Download, QrCode
} from 'lucide-react';
import QRScanner from '@/components/QRScanner';

const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const schemeRequests = [
  {
    id: 1,
    applicationId: 'THR-SCH-001-2024',
    weaver: { name: 'Lakshmi Devi', location: 'Kanchipuram, TN', avatar: '' },
    scheme: 'Handloom Weaver Comprehensive Welfare Scheme',
    ministry: 'Ministry of Textiles',
    amount: 50000,
    appliedDate: getRelativeDate(-10),
    status: 'under_review',
    priority: 'high',
    inspector: 'Shri R. Krishnan',
    documents: [
      { name: 'Aadhaar Card', status: 'verified' },
      { name: 'Weaver Identity Card', status: 'verified' },
      { name: 'Income Certificate', status: 'pending' },
    ],
    timeline: [
      { stage: 'Application Submitted', date: getRelativeDate(-10), status: 'completed' },
      { stage: 'Document Verification', date: getRelativeDate(-5), status: 'in_progress' },
      { stage: 'Inspector Approval', date: null, status: 'pending' },
    ],
    reason: 'Applying for health insurance coverage for family.',
  },
  {
    id: 2,
    applicationId: 'THR-SCH-002-2024',
    weaver: { name: 'Rajesh Kumar', location: 'Negamam, TN', avatar: '' },
    scheme: 'National Handloom Development Programme',
    ministry: 'Ministry of Textiles',
    amount: 200000,
    appliedDate: getRelativeDate(-15),
    status: 'approved',
    priority: 'medium',
    inspector: 'Smt. Kavita Singh',
    documents: [
      { name: 'Weaver Registration', status: 'verified' },
      { name: 'Project Proposal', status: 'verified' }
    ],
    timeline: [
      { stage: 'Application Submitted', date: getRelativeDate(-15), status: 'completed' },
      { stage: 'Inspector Approval', date: getRelativeDate(-7), status: 'completed' },
      { stage: 'Final Approval', date: getRelativeDate(-5), status: 'completed' }
    ],
    reason: 'Seeking skill development training and design support.',
  },
];

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  approved:      { background: 'hsl(74,35%,40%)', color: '#fff' }, // Palm Leaf
  under_review:  { background: 'hsl(195,41%,30%)', color: '#fff' }, // Indigo
  rejected:      { background: 'hsl(16,54%,49%)', color: '#fff' }, // Terracotta
  pending:       { background: 'hsl(27,40%,45%)', color: '#fff' }, // Clay
};

const SchemeRequestCard = ({ request, onViewDetails, onProcess }: any) => (
  <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm card-lift">
    <div className="h-1.5 rounded-t-xl" style={STATUS_STYLES[request.status]} />
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-lg font-bold" style={{ color: 'hsl(350,60%,24%)' }}>{request.applicationId}</CardTitle>
          <p className="text-xs mt-1" style={{ color: 'hsl(195,41%,40%)' }}>{request.scheme}</p>
        </div>
        <Badge style={STATUS_STYLES[request.status]}>
          {request.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 border" style={{ borderColor: 'hsl(41,55%,60%)' }}>
          <AvatarFallback style={{ background: 'hsl(43,47%,90%)', color: 'hsl(350,60%,29%)' }}>
            {request.weaver.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-sm" style={{ color: 'hsl(195,41%,20%)' }}>{request.weaver.name}</p>
          <p className="text-xs" style={{ color: 'hsl(195,41%,40%)' }}>{request.weaver.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs" style={{ color: 'hsl(195,41%,35%)' }}>
        <div className="flex items-center p-2 rounded-lg" style={{ background: 'hsl(43,47%,94%)' }}>
          <IndianRupee className="h-3 w-3 mr-1.5 opacity-70" />
          <span className="font-semibold text-sm">₹{request.amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center p-2 rounded-lg" style={{ background: 'hsl(43,47%,94%)' }}>
          <Calendar className="h-3 w-3 mr-1.5 opacity-70" />
          <span>{new Date(request.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={() => onViewDetails(request)}>
          <Eye className="h-3 w-3 mr-1" /> View Details
        </Button>
        {request.status === 'under_review' && (
          <Button size="sm" className="flex-1 text-xs h-8 text-white" style={{ background: 'hsl(74,35%,35%)' }} onClick={() => onProcess(request)}>
            Process
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function SocietySchemes() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [processRequest, setProcessRequest] = useState<any>(null);
  const [decision, setDecision] = useState('');

  const filteredRequests = schemeRequests.filter(req => req.applicationId.toLowerCase().includes(searchTerm.toLowerCase()));

  const exportData = () => {
    alert("Exporting scheme applications as CSV...");
  };

  return (
    <Layout userRole={userRole || 'society'}>
      <div className="p-6 space-y-6">
        
        {/* Header Section */}
        <div className="rounded-2xl overflow-hidden bg-primary text-primary-foreground">
          <div className="px-6 py-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-1 opacity-80">
              சங்க திட்டங்கள்
            </p>
            <h1 className="text-3xl font-extrabold mb-2">Scheme Requests</h1>
            <p className="text-sm opacity-90 max-w-xl">
              Process government scheme applications, conduct document verifications, and scan QR codes for fast approval.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm card-lift">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'hsl(195,41%,90%)' }}>
                <FileText className="h-6 w-6" style={{ color: 'hsl(195,41%,30%)' }} />
              </div>
              <div><p className="text-2xl font-bold">{schemeRequests.length}</p><p className="text-xs text-gray-500">Total Requests</p></div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm card-lift">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'hsl(74,35%,90%)' }}>
                <CheckCircle className="h-6 w-6" style={{ color: 'hsl(74,35%,35%)' }} />
              </div>
              <div><p className="text-2xl font-bold">{schemeRequests.filter(r => r.status === 'approved').length}</p><p className="text-xs text-gray-500">Approved</p></div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm card-lift">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'hsl(27,40%,90%)' }}>
                <Clock className="h-6 w-6" style={{ color: 'hsl(27,40%,45%)' }} />
              </div>
              <div><p className="text-2xl font-bold">{schemeRequests.filter(r => r.status === 'under_review').length}</p><p className="text-xs text-gray-500">Pending</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Application ID..." className="pl-9 h-11 bg-gray-50" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button className="h-11 text-white" style={{ background: 'hsl(74,35%,35%)' }} onClick={() => setQrOpen(true)}>
              <QrCode className="h-4 w-4 mr-2" /> Scan QR
            </Button>
            <Button variant="outline" className="h-11" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="grid lg:grid-cols-2 gap-5">
          {filteredRequests.map(req => (
            <SchemeRequestCard key={req.id} request={req} onViewDetails={setSelectedRequest} onProcess={setProcessRequest} />
          ))}
        </div>

        {/* QR Scanner Dialog */}
        <Dialog open={qrOpen} onOpenChange={setQrOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: 'hsl(195,41%,20%)' }}>Scan Weaver Application QR</DialogTitle>
              <DialogDescription>Place the QR code within the camera frame.</DialogDescription>
            </DialogHeader>
            <div className="bg-black/5 rounded-xl overflow-hidden">
              <QRScanner
                onScan={(code) => {
                  alert(`Scanned Application: ${code}`);
                  setQrOpen(false);
                }}
                onClose={() => setQrOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Details Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle style={{ color: 'hsl(350,60%,24%)' }}>{selectedRequest?.applicationId}</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <p className="text-sm"><strong>Weaver:</strong> {selectedRequest.weaver.name}</p>
                <p className="text-sm"><strong>Scheme:</strong> {selectedRequest.scheme}</p>
                <p className="text-sm"><strong>Amount:</strong> ₹{selectedRequest.amount.toLocaleString('en-IN')}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2 mt-4" style={{ color: 'hsl(350,60%,29%)' }}>Documents Status</h4>
                  {selectedRequest.documents.map((doc: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2">
                      <span className="text-xs">{doc.name}</span>
                      <Badge variant="outline" className={doc.status === 'verified' ? 'border-emerald-600 text-emerald-600' : 'border-amber-600 text-amber-600'}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Process Dialog */}
        <Dialog open={!!processRequest} onOpenChange={() => setProcessRequest(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: 'hsl(350,60%,24%)' }}>Process {processRequest?.applicationId}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={decision} onValueChange={setDecision}>
                <SelectTrigger><SelectValue placeholder="Select Decision" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="request_more">Request Documents</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Inspector remarks..." />
              <Button className="w-full text-white" style={{ background: 'hsl(74,35%,35%)' }} onClick={() => {
                alert('Decision saved.');
                setProcessRequest(null);
              }}>Submit Decision</Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
}
