import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Star,
  MapPin,
  Award,
  Scissors,
  Heart,
  MessageCircle,
  Phone,
  Search,
  TrendingUp,
  Calendar,
  Package,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample weavers data
const weavers = [
  {
    id: 1,
    name: 'Lakshmi Devi',
    location: 'Kanchipuram, Tamil Nadu',
    speciality: 'Kanjivaram Silk',
    experience: '25 years',
    rating: 4.9,
    reviews: 128,
    totalSarees: 340,
    monthlyEarnings: 245000,
    avatar: '/placeholder.svg',
    isTopPerformer: true,
    isFeatured: true,
    certifications: ['Master Weaver', 'Quality Certified', 'Heritage Artisan'],
    recentWorks: [
      { name: 'Royal Wedding Saree', price: 75000, image: '/placeholder.svg' },
      { name: 'Traditional Temple Border', price: 45000, image: '/placeholder.svg' },
      { name: 'Contemporary Silk', price: 35000, image: '/placeholder.svg' },
    ],
    portfolio: {
      totalOrders: 340,
      completedOnTime: 325,
      averageRating: 4.9,
      repeatCustomers: 85,
    },
    bio: 'Master weaver with 25 years of experience in traditional Kanjivaram silk sarees. Known for intricate temple motifs and vibrant color combinations.',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Varanasi, Uttar Pradesh',
    speciality: 'Banarasi Silk',
    experience: '20 years',
    rating: 4.8,
    reviews: 95,
    totalSarees: 280,
    monthlyEarnings: 185000,
    avatar: '/placeholder.svg',
    isTopPerformer: true,
    isFeatured: false,
    certifications: ['Master Weaver', 'Zari Specialist'],
    recentWorks: [
      { name: 'Gold Zari Masterpiece', price: 55000, image: '/placeholder.svg' },
      { name: 'Silver Border Banarasi', price: 32000, image: '/placeholder.svg' },
      { name: 'Contemporary Banarasi', price: 28000, image: '/placeholder.svg' },
    ],
    portfolio: {
      totalOrders: 280,
      completedOnTime: 265,
      averageRating: 4.8,
      repeatCustomers: 78,
    },
    bio: 'Specialist in traditional Banarasi silk weaving with expertise in gold and silver zari work. Family tradition of weaving for four generations.',
  },
  {
    id: 3,
    name: 'Meera Sharma',
    location: 'Chanderi, Madhya Pradesh',
    speciality: 'Chanderi Cotton',
    experience: '15 years',
    rating: 4.7,
    reviews: 67,
    totalSarees: 195,
    monthlyEarnings: 125000,
    avatar: '/placeholder.svg',
    isTopPerformer: false,
    isFeatured: true,
    certifications: ['Quality Certified', 'Eco-friendly Weaver'],
    recentWorks: [
      { name: 'Handloom Cotton Delight', price: 12000, image: '/placeholder.svg' },
      { name: 'Floral Chanderi', price: 8500, image: '/placeholder.svg' },
      { name: 'Contemporary Cotton', price: 6500, image: '/placeholder.svg' },
    ],
    portfolio: {
      totalOrders: 195,
      completedOnTime: 185,
      averageRating: 4.7,
      repeatCustomers: 72,
    },
    bio: 'Young and innovative weaver specializing in contemporary Chanderi designs while preserving traditional techniques.',
  },
  {
    id: 4,
    name: 'Priya Patil',
    location: 'Bhagalpur, Bihar',
    speciality: 'Tussar Silk',
    experience: '18 years',
    rating: 4.6,
    reviews: 54,
    totalSarees: 165,
    monthlyEarnings: 95000,
    avatar: '/placeholder.svg',
    isTopPerformer: false,
    isFeatured: false,
    certifications: ['Traditional Weaver', 'Tussar Specialist'],
    recentWorks: [
      { name: 'Natural Tussar Beauty', price: 18000, image: '/placeholder.svg' },
      { name: 'Hand-painted Tussar', price: 15000, image: '/placeholder.svg' },
      { name: 'Geometric Tussar', price: 12000, image: '/placeholder.svg' },
    ],
    portfolio: {
      totalOrders: 165,
      completedOnTime: 155,
      averageRating: 4.6,
      repeatCustomers: 65,
    },
    bio: 'Dedicated to preserving the art of Tussar silk weaving with natural and sustainable practices.',
  },
];

const WeaverCard = ({ weaver }: { weaver: typeof weavers[0] }) => {
  const onTimePercentage = Math.round((weaver.portfolio.completedOnTime / weaver.portfolio.totalOrders) * 100);

  return (
    <Card className={cn(
      'hover:shadow-lg transition-shadow',
      weaver.isFeatured && 'ring-2 ring-primary/20'
    )}>
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={weaver.avatar} alt={weaver.name} />
            <AvatarFallback>{weaver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{weaver.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {weaver.location}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {weaver.isTopPerformer && (
                  <Badge className="bg-gold text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Top Performer
                  </Badge>
                )}
                {weaver.isFeatured && (
                  <Badge variant="outline" className="border-primary text-primary">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            <Scissors className="h-3 w-3 mr-1" />
            {weaver.speciality}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{weaver.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({weaver.reviews} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <p className="font-medium">{weaver.experience}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total Sarees:</span>
            <p className="font-medium">{weaver.totalSarees}</p>
          </div>
          <div>
            <span className="text-muted-foreground">On-time Delivery:</span>
            <p className="font-medium">{onTimePercentage}%</p>
          </div>
          <div>
            <span className="text-muted-foreground">Monthly Earnings:</span>
            <p className="font-medium text-primary">₹{weaver.monthlyEarnings.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Certifications</h4>
          <div className="flex flex-wrap gap-1">
            {weaver.certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Works</h4>
          <div className="grid grid-cols-3 gap-2">
            {weaver.recentWorks.slice(0, 3).map((work, index) => (
              <div key={index} className="text-center">
                <div className="w-full aspect-square bg-silk rounded-lg overflow-hidden mb-1">
                  <img src={work.image} alt={work.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium truncate">{work.name}</p>
                <p className="text-xs text-primary">₹{work.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                View Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>{weaver.name}</DialogTitle>
                <DialogDescription>Master weaver profile and portfolio</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={weaver.avatar} alt={weaver.name} />
                    <AvatarFallback>{weaver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{weaver.name}</h3>
                    <p className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {weaver.location}
                    </p>
                    <p className="text-sm mt-2">{weaver.bio}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{weaver.rating}</span>
                      </div>
                      <Badge variant="secondary">{weaver.speciality}</Badge>
                      <span className="text-sm text-muted-foreground">{weaver.experience} experience</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold">{weaver.portfolio.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-6 w-6 text-emerald mx-auto mb-2" />
                      <p className="text-lg font-bold">{onTimePercentage}%</p>
                      <p className="text-xs text-muted-foreground">On-time Delivery</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-lg font-bold">{weaver.portfolio.averageRating}</p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold">{weaver.portfolio.repeatCustomers}%</p>
                      <p className="text-xs text-muted-foreground">Repeat Customers</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Portfolio Gallery</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {weaver.recentWorks.map((work, index) => (
                      <Card key={index}>
                        <div className="aspect-square bg-silk overflow-hidden">
                          <img src={work.image} alt={work.name} className="w-full h-full object-cover" />
                        </div>
                        <CardContent className="p-3">
                          <h5 className="font-medium text-sm">{work.name}</h5>
                          <p className="text-primary font-bold">₹{work.price.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Weaver
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function BuyerWeavers() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredWeavers = weavers.filter(weaver => {
    const matchesSearch = weaver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         weaver.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         weaver.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = specialityFilter === 'all' || weaver.speciality.toLowerCase().includes(specialityFilter);
    return matchesSearch && matchesSpeciality;
  });

  const sortedWeavers = [...filteredWeavers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'earnings':
        return b.monthlyEarnings - a.monthlyEarnings;
      case 'orders':
        return b.totalSarees - a.totalSarees;
      default:
        return 0;
    }
  });

  const topPerformers = weavers.filter(w => w.isTopPerformer).length;
  const featuredWeavers = weavers.filter(w => w.isFeatured).length;

  return (
    <Layout userRole={userRole || 'buyer'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Featured Weavers</h1>
          <p className="text-muted-foreground">
            Discover master weavers and their exceptional craftsmanship
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Scissors className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">{weavers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Weavers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-gold mr-3" />
                <div>
                  <p className="text-2xl font-bold">{topPerformers}</p>
                  <p className="text-sm text-muted-foreground">Top Performers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{featuredWeavers}</p>
                  <p className="text-sm text-muted-foreground">Featured</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-emerald mr-3" />
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
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
                <Select value={specialityFilter} onValueChange={setSpecialityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="kanjivaram">Kanjivaram</SelectItem>
                    <SelectItem value="banarasi">Banarasi</SelectItem>
                    <SelectItem value="chanderi">Chanderi</SelectItem>
                    <SelectItem value="tussar">Tussar</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="earnings">Earnings</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weavers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sortedWeavers.map(weaver => (
            <WeaverCard key={weaver.id} weaver={weaver} />
          ))}
        </div>

        {sortedWeavers.length === 0 && (
          <Card className="p-12 text-center">
            <Scissors className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg mb-2">No weavers found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </Layout>
  );
}
