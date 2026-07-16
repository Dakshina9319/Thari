import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building2,
  Users,
  Crown,
  Shield,
  UserCheck,
  Eye,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Organizational hierarchy data
const hierarchy = {
  name: 'Ministry of Textiles',
  position: 'Ministry Level',
  level: 0,
  person: {
    name: 'Dr. Piyush Goyal',
    avatar: '/placeholder.svg',
    contact: 'minister@textiles.gov.in',
    phone: '+91 11 2306 3435'
  },
  children: [
    {
      name: 'Department of Textiles',
      position: 'Department Level',
      level: 1,
      person: {
        name: 'Shri U.P. Singh',
        avatar: '/placeholder.svg',
        contact: 'secretary@textiles.gov.in',
        phone: '+91 11 2306 3000'
      },
      children: [
        {
          name: 'Textile Commissioner Office',
          position: 'Commissioner Level',
          level: 2,
          person: {
            name: 'Smt. Roop Rashi',
            avatar: '/placeholder.svg',
            contact: 'commissioner@textiles.gov.in',
            phone: '+91 11 2306 2800'
          },
          children: [
            {
              name: 'Additional Director (South)',
              position: 'Additional Director',
              level: 3,
              person: {
                name: 'Shri K. Ramesh',
                avatar: '/placeholder.svg',
                contact: 'addl.south@textiles.gov.in',
                phone: '+91 44 2827 5000'
              },
              children: [
                {
                  name: 'Joint Director (Tamil Nadu)',
                  position: 'Joint Director',
                  level: 4,
                  person: {
                    name: 'Smt. Priya Lakshmi',
                    avatar: '/placeholder.svg',
                    contact: 'jd.tn@textiles.gov.in',
                    phone: '+91 44 2827 5100'
                  },
                  children: [
                    {
                      name: 'Deputy Director (Kanchipuram)',
                      position: 'Deputy Director',
                      level: 5,
                      person: {
                        name: 'Shri M. Venkatesh',
                        avatar: '/placeholder.svg',
                        contact: 'dd.kanchi@textiles.gov.in',
                        phone: '+91 44 2722 3000'
                      },
                      children: [
                        {
                          name: 'Assistant Director (Production)',
                          position: 'Assistant Director',
                          level: 6,
                          person: {
                            name: 'Ms. Anjali Sharma',
                            avatar: '/placeholder.svg',
                            contact: 'ad.prod@textiles.gov.in',
                            phone: '+91 44 2722 3100'
                          },
                          subordinates: 45,
                          children: []
                        },
                        {
                          name: 'Assistant Director (Quality)',
                          position: 'Assistant Director',
                          level: 6,
                          person: {
                            name: 'Shri Raj Kumar',
                            avatar: '/placeholder.svg',
                            contact: 'ad.quality@textiles.gov.in',
                            phone: '+91 44 2722 3200'
                          },
                          subordinates: 38,
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'Additional Director (North)',
              position: 'Additional Director',
              level: 3,
              person: {
                name: 'Shri Amit Verma',
                avatar: '/placeholder.svg',
                contact: 'addl.north@textiles.gov.in',
                phone: '+91 11 2306 2900'
              },
              children: [
                {
                  name: 'Joint Director (Uttar Pradesh)',
                  position: 'Joint Director',
                  level: 4,
                  person: {
                    name: 'Smt. Kavita Singh',
                    avatar: '/placeholder.svg',
                    contact: 'jd.up@textiles.gov.in',
                    phone: '+91 512 2367 8000'
                  },
                  children: [
                    {
                      name: 'Deputy Director (Varanasi)',
                      position: 'Deputy Director',
                      level: 5,
                      person: {
                        name: 'Shri Deepak Gupta',
                        avatar: '/placeholder.svg',
                        contact: 'dd.varanasi@textiles.gov.in',
                        phone: '+91 542 2508 000'
                      },
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const getLevelColor = (level: number) => {
  const colors = [
    'bg-indigo-dye',      // Ministry
    'bg-temple-maroon',   // Department
    'bg-palm-leaf',       // Commissioner
    'bg-clay-brown',      // Additional Director
    'bg-terracotta',      // Joint Director
    'bg-silk-gold',       // Deputy Director
    'bg-gray-600',        // Assistant Director
  ];
  return colors[level] || 'bg-gray-500';
};

const getLevelIcon = (level: number) => {
  switch (level) {
    case 0: return Crown;
    case 1: return Building2;
    case 2: return Shield;
    case 3:
    case 4:
    case 5:
    case 6: return UserCheck;
    default: return Users;
  }
};

const HierarchyNode = ({ node, onViewProfile }: { node: any; onViewProfile: (person: any) => void }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = getLevelIcon(node.level);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="space-y-4">
      <Card className={cn(
        'hover:shadow-lg transition-all duration-200',
        node.level === 0 && 'border-2 border-purple-200'
      )}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              getLevelColor(node.level)
            )}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{node.name}</h3>
              <p className="text-sm text-muted-foreground">{node.position}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={node.person.avatar} alt={node.person.name} />
                    <AvatarFallback className="text-xs">
                      {node.person.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{node.person.name}</span>
                </div>
                {node.subordinates && (
                  <Badge variant="outline" className="text-xs">
                    {node.subordinates} subordinates
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(node)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {hasChildren && isExpanded && (
        <div className="ml-8 space-y-4 border-l-2 border-muted pl-6">
          {node.children.map((child: any, index: number) => (
            <HierarchyNode key={index} node={child} onViewProfile={onViewProfile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function SocietyHierarchy() {
  const { userRole } = useUser();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const handleViewProfile = (node: any) => {
    setSelectedProfile(node);
  };

  const totalOfficials = (() => {
    const count = (node: any): number => {
      let total = 1;
      if (node.children) {
        total += node.children.reduce((sum: number, child: any) => sum + count(child), 0);
      }
      return total;
    };
    return count(hierarchy);
  })();

  const totalSubordinates = (() => {
    const count = (node: any): number => {
      let total = node.subordinates || 0;
      if (node.children) {
        total += node.children.reduce((sum: number, child: any) => sum + count(child), 0);
      }
      return total;
    };
    return count(hierarchy);
  })();

  return (
    <Layout userRole={userRole || 'society'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Organizational Hierarchy</h1>
          <p className="text-muted-foreground">
            Complete organizational structure from Ministry to field-level operations
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Hierarchy Levels</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-emerald mr-3" />
                <div>
                  <p className="text-2xl font-bold">{totalOfficials}</p>
                  <p className="text-sm text-muted-foreground">Officials</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{totalSubordinates}</p>
                  <p className="text-sm text-muted-foreground">Field Staff</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Crown className="h-8 w-8 text-gold mr-3" />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-muted-foreground">Active Weavers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hierarchy Tree */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Organizational Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HierarchyNode node={hierarchy} onViewProfile={handleViewProfile} />
            </CardContent>
          </Card>
        </div>

        {/* Profile Modal would go here */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto">
              <CardHeader>
                <CardTitle>{selectedProfile.person.name}</CardTitle>
                <p className="text-muted-foreground">{selectedProfile.position}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedProfile.person.avatar} alt={selectedProfile.person.name} />
                    <AvatarFallback>
                      {selectedProfile.person.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedProfile.person.name}</h3>
                    <p className="text-muted-foreground">{selectedProfile.name}</p>
                    <Badge className={cn('mt-2', getLevelColor(selectedProfile.level).replace('from-', 'bg-').replace(' to-purple-600', ''))}>
                      Level {selectedProfile.level + 1}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <p>Email: {selectedProfile.person.contact}</p>
                      <p>Phone: {selectedProfile.person.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Department</h4>
                    <div className="space-y-1 text-sm">
                      <p>Position: {selectedProfile.position}</p>
                      <p>Level: {selectedProfile.level + 1}</p>
                      {selectedProfile.subordinates && (
                        <p>Subordinates: {selectedProfile.subordinates}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedProfile(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
