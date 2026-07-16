import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  FileText,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  IndianRupee,
  Calendar,
  Users,
  Award,
  BookOpen,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample schemes data
const schemes = [
  {
    id: 1,
    name: 'Handloom Weaver Comprehensive Welfare Scheme',
    ministry: 'Ministry of Textiles',
    department: 'Development Commissioner for Handlooms',
    description: 'Comprehensive welfare scheme providing health insurance, life insurance, and accident coverage for handloom weavers.',
    benefits: [
      'Health insurance up to ₹5 lakh per family',
      'Life insurance coverage of ₹5 lakh',
      'Accident insurance of ₹5 lakh',
      'Maternity benefits for female weavers'
    ],
    eligibility: [
      'Must be a practicing handloom weaver',
      'Age between 18-60 years',
      'Annual family income below ₹3 lakh',
      'Should not be covered under any other insurance scheme'
    ],
    amount: '₹5,00,000',
    category: 'Insurance',
    status: 'active',
    applicationDeadline: '2024-03-31',
    processingTime: '30 days',
    requiredDocuments: [
      'Aadhaar Card',
      'Weaver Identity Card',
      'Income Certificate',
      'Bank Account Details'
    ],
    applicationFee: 'Free',
    isEligible: true,
  },
  {
    id: 2,
    name: 'National Handloom Development Programme',
    ministry: 'Ministry of Textiles',
    department: 'Office of Development Commissioner for Handlooms',
    description: 'Comprehensive scheme for development of handloom sector including skill development, design development, and marketing support.',
    benefits: [
      'Free skill development training',
      'Design development support',
      'Marketing assistance',
      'Technology upgradation support',
      'Working capital assistance'
    ],
    eligibility: [
      'Registered handloom weaver',
      'Member of Self Help Group or Cooperative',
      'Minimum 2 years experience in weaving',
      'Commitment to complete training program'
    ],
    amount: '₹2,00,000',
    category: 'Development',
    status: 'active',
    applicationDeadline: '2024-06-30',
    processingTime: '45 days',
    requiredDocuments: [
      'Weaver Registration Certificate',
      'SHG/Cooperative Membership',
      'Experience Certificate',
      'Project Proposal'
    ],
    applicationFee: 'Free',
    isEligible: true,
  },
  {
    id: 3,
    name: 'Pradhan Mantri Mudra Yojana (Weaver Category)',
    ministry: 'Ministry of Finance',
    department: 'Department of Financial Services',
    description: 'Micro-finance scheme providing loans up to ₹10 lakh for small businesses including handloom weaving.',
    benefits: [
      'Collateral-free loans',
      'Low interest rates (9-12%)',
      'Flexible repayment options',
      'No processing fees',
      'Quick approval process'
    ],
    eligibility: [
      'Indian citizen aged 18 years or above',
      'Engaged in income-generating activities',
      'No defaults in previous loans',
      'Valid business plan'
    ],
    amount: '₹10,00,000',
    category: 'Financial',
    status: 'active',
    applicationDeadline: 'Rolling basis',
    processingTime: '15 days',
    requiredDocuments: [
      'Business Plan',
      'Income Proof',
      'Identity Proof',
      'Address Proof',
      'Bank Statements'
    ],
    applicationFee: 'Free',
    isEligible: false,
  },
  {
    id: 4,
    name: 'Weaver Credit Card Scheme',
    ministry: 'Ministry of Textiles',
    department: 'Development Commissioner for Handlooms',
    description: 'Credit facility to provide adequate and timely credit support to the weavers for their working capital requirements.',
    benefits: [
      'Credit limit up to ₹1 lakh',
      'Interest subvention of 7%',
      'No collateral required',
      'Flexible repayment',
      'Revolving credit facility'
    ],
    eligibility: [
      'Practicing handloom weaver',
      'Member of Primary Weaver Cooperative Society',
      'Good track record in weaving',
      'No overdue in existing loans'
    ],
    amount: '₹1,00,000',
    category: 'Credit',
    status: 'active',
    applicationDeadline: 'Open',
    processingTime: '20 days',
    requiredDocuments: [
      'Weaver Identity Card',
      'PWCS Membership Certificate',
      'Bank Account Details',
      'Aadhaar Card'
    ],
    applicationFee: 'Free',
    isEligible: true,
  },
];

const applications = [
  {
    id: 1,
    schemeId: 1,
    schemeName: 'Handloom Weaver Comprehensive Welfare Scheme',
    applicationDate: '2024-01-15',
    status: 'approved',
    amount: '₹5,00,000',
    remarks: 'Application approved. Insurance coverage active.',
  },
  {
    id: 2,
    schemeId: 2,
    schemeName: 'National Handloom Development Programme',
    applicationDate: '2024-01-20',
    status: 'pending',
    amount: '₹2,00,000',
    remarks: 'Under review by district inspector.',
  },
  {
    id: 3,
    schemeId: 4,
    schemeName: 'Weaver Credit Card Scheme',
    applicationDate: '2024-01-10',
    status: 'rejected',
    amount: '₹1,00,000',
    remarks: 'Incomplete documentation. Please reapply with required documents.',
  },
];

const SchemeCard = ({ scheme, onApply }: { scheme: typeof schemes[0]; onApply: (scheme: any) => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald text-white';
      case 'expired':
        return 'bg-destructive text-white';
      default:
        return 'bg-secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Insurance':
        return 'bg-blue-100 text-blue-800';
      case 'Development':
        return 'bg-green-100 text-green-800';
      case 'Financial':
        return 'bg-purple-100 text-purple-800';
      case 'Credit':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn(
      'hover:shadow-lg transition-shadow',
      !scheme.isEligible && 'opacity-75'
    )}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
            <CardDescription className="text-sm">
              {scheme.ministry} • {scheme.department}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(scheme.status)}>
              {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={getCategoryColor(scheme.category)}>
              {scheme.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{scheme.description}</p>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-2 text-primary" />
            <span className="font-semibold">Max Amount: {scheme.amount}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Deadline: {scheme.applicationDeadline}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Processing: {scheme.processingTime}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Fee: {scheme.applicationFee}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Benefits:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {scheme.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-emerald flex-shrink-0" />
                {benefit}
              </li>
            ))}
            {scheme.benefits.length > 3 && (
              <li className="text-xs text-muted-foreground">
                +{scheme.benefits.length - 3} more benefits
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center text-sm">
            {scheme.isEligible ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-emerald" />
                <span className="text-emerald font-medium">You are eligible</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                <span className="text-orange-500 font-medium">Check eligibility</span>
              </>
            )}
          </div>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>{scheme.name}</DialogTitle>
                  <DialogDescription>
                    {scheme.ministry} • {scheme.department}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-emerald flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                    <ul className="space-y-1">
                      {scheme.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Users className="h-3 w-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Required Documents</h4>
                    <ul className="space-y-1">
                      {scheme.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <FileText className="h-3 w-3 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              onClick={() => onApply(scheme)}
              disabled={!scheme.isEligible || scheme.status !== 'active'}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationCard = ({ application }: { application: typeof applications[0] }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-emerald" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-emerald';
      case 'pending':
        return 'text-orange-500';
      case 'rejected':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-1">{application.schemeName}</h4>
            <p className="text-xs text-muted-foreground">
              Applied on {new Date(application.applicationDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              {getStatusIcon(application.status)}
              <span className={cn('text-sm font-medium capitalize', getStatusColor(application.status))}>
                {application.status}
              </span>
            </div>
            <p className="text-sm font-semibold">{application.amount}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{application.remarks}</p>
      </CardContent>
    </Card>
  );
};

export default function WeaverSchemes() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [applicationData, setApplicationData] = useState({
    reason: '',
    projectDescription: '',
    estimatedAmount: '',
  });
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (scheme: any) => {
    setSelectedScheme(scheme);
  };

  const submitApplication = () => {
    // Here you would submit the application
    console.log('Submitting application for:', selectedScheme?.name, applicationData);
    setSelectedScheme(null);
    setApplicationData({ reason: '', projectDescription: '', estimatedAmount: '' });
  };

  return (
    <Layout userRole={userRole || 'weaver'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Government Schemes</h1>
          <p className="text-muted-foreground">
            Discover and apply for government schemes designed to support handloom weavers
          </p>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">Available Schemes</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search schemes..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{schemes.length}</p>
                  <p className="text-sm text-muted-foreground">Total Schemes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-emerald mx-auto mb-2" />
                  <p className="text-2xl font-bold">{schemes.filter(s => s.isEligible).length}</p>
                  <p className="text-sm text-muted-foreground">Eligible For</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Send className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{applications.length}</p>
                  <p className="text-sm text-muted-foreground">Applied</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </CardContent>
              </Card>
            </div>

            {/* Schemes Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredSchemes.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} onApply={handleApply} />
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg mb-2">No schemes found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="space-y-4">
              {applications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Application Dialog */}
        <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Apply for {selectedScheme?.name}</DialogTitle>
              <DialogDescription>
                Fill out the application form below. Your application will be submitted to the inspector for review.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for Application</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you are applying for this scheme..."
                  value={applicationData.reason}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, reason: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="project">Project Description</Label>
                <Textarea
                  id="project"
                  placeholder="Describe your project or how you plan to use the scheme benefits..."
                  value={applicationData.projectDescription}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, projectDescription: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="amount">Estimated Amount Required</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in rupees"
                  value={applicationData.estimatedAmount}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, estimatedAmount: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setSelectedScheme(null)}>
                  Cancel
                </Button>
                <Button onClick={submitApplication}>
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
