import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package, CheckCircle, Clock, AlertCircle, Star, Search, Calendar,
  MapPin, Scissors, Eye, MessageCircle, BarChart, TrendingUp, Filter, Users,
  Filter as FilterIcon
} from 'lucide-react';

const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const orders = [
  {
    id: 1,
    orderNumber: 'THR-B001-2024',
    sareeType: 'Kanjivaram Silk',
    weaver: 'Lakshmi Devi',
    weaverLocation: 'Kanchipuram, TN',
    orderDate: getRelativeDate(-15),
    expectedDelivery: getRelativeDate(-2),
    status: 'delivered',
    amount: 45000,
    progress: 100,
    trackingUpdates: [
      { stage: 'Order Placed', date: getRelativeDate(-15), status: 'completed' },
      { stage: 'Weaving Started', date: getRelativeDate(-12), status: 'completed' },
      { stage: 'Shipped', date: getRelativeDate(-3), status: 'completed' },
      { stage: 'Delivered', date: getRelativeDate(-2), status: 'completed' },
    ],
    rating: 5,
    isBulk: false,
  },
  {
    id: 2,
    orderNumber: 'THR-B002-2024',
    sareeType: 'Negamam Soft Silk',
    weaver: 'Rajesh Kumar',
    weaverLocation: 'Negamam, TN',
    orderDate: getRelativeDate(-10),
    expectedDelivery: getRelativeDate(5),
    status: 'in-transit',
    amount: 32000,
    progress: 85,
    trackingUpdates: [
      { stage: 'Order Placed', date: getRelativeDate(-10), status: 'completed' },
      { stage: 'Weaving Completed', date: getRelativeDate(-2), status: 'completed' },
      { stage: 'Shipped', date: getRelativeDate(-1), status: 'in-progress' },
      { stage: 'Delivered', date: null, status: 'pending' },
    ],
    isBulk: false,
  },
  {
    id: 3,
    orderNumber: 'BLK-C001-2024',
    sareeType: 'Bhavani Cotton (Bulk: 50x)',
    weaver: 'Cooperative Society',
    weaverLocation: 'Bhavani, TN',
    orderDate: getRelativeDate(-8),
    expectedDelivery: getRelativeDate(20),
    status: 'weaving',
    amount: 425000,
    progress: 40,
    trackingUpdates: [
      { stage: 'Order Placed', date: getRelativeDate(-8), status: 'completed' },
      { stage: 'Weaving Started', date: getRelativeDate(-5), status: 'completed' },
      { stage: 'Weaving Completed', date: null, status: 'in-progress' },
      { stage: 'Delivered', date: null, status: 'pending' },
    ],
    isBulk: true,
  },
];

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  delivered:   { background: 'hsl(var(--palm-leaf))',  color: '#fff' },
  'in-transit': { background: 'hsl(var(--silk-gold))', color: 'hsl(var(--indigo-dye) / 0.4)' },
  weaving:     { background: 'hsl(var(--indigo-dye))', color: '#fff' },
  preparing:   { background: 'hsl(var(--clay-brown))',  color: '#fff' },
};

const OrderCard = ({ order, isBusiness }: { order: typeof orders[0], isBusiness: boolean }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm card-lift">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg text-indigo-dye/80">
                {order.orderNumber}
              </CardTitle>
              {isBusiness && order.isBulk && <Badge variant="outline" className="text-xs border-indigo-dye text-indigo-dye">B2B Wholesale</Badge>}
            </div>
            <CardDescription className="text-muted-foreground">{order.sareeType}</CardDescription>
          </div>
          <Badge style={STATUS_STYLES[order.status]}>
            {order.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-2 text-sm text-indigo-dye/80">
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 opacity-70" />
              <span>{order.weaver}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 opacity-70" />
              <span>{order.weaverLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 opacity-70" />
              <span>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs mb-1 text-muted-foreground">Order Value</p>
            <p className="text-2xl font-bold text-primary">
              ₹{order.amount.toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Production Progress</span>
            <span className="font-semibold">{order.progress}%</span>
          </div>
          <Progress value={order.progress} className="h-2 bg-secondary" />
        </div>

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" /> Track Status
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-indigo-dye/80">Tracking {order.orderNumber}</DialogTitle>
                <DialogDescription>Live status of your {order.isBulk ? 'bulk order' : 'saree'}.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {order.trackingUpdates.map((up, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {up.status === 'completed' ? <CheckCircle className="h-5 w-5 text-palm-leaf"/> : 
                     up.status === 'in-progress' ? <Clock className="h-5 w-5 text-silk-gold" /> :
                     <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{up.stage}</p>
                      {up.date && <p className="text-xs text-muted-foreground">{new Date(up.date).toLocaleDateString()}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          {!isBusiness && (
            <Button size="sm" className="bg-indigo-dye text-white hover:bg-indigo-dye/90">
              <MessageCircle className="h-4 w-4 mr-2" /> Message Weaver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function BuyerOrders() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isBusinessBuyer, setIsBusinessBuyer] = useState(false);

  // Filter based on buyer type
  let displayOrders = orders;
  if (!isBusinessBuyer) {
    displayOrders = orders.filter(o => !o.isBulk); // Normal buyer sees personal
  }

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    displayOrders = displayOrders.filter(o => 
      o.orderNumber.toLowerCase().includes(term) ||
      o.sareeType.toLowerCase().includes(term) ||
      o.weaver.toLowerCase().includes(term)
    );
  }

  const activeOrders = displayOrders.filter(o => o.status !== 'delivered');
  const deliveredOrders = displayOrders.filter(o => o.status === 'delivered');
  const totalSpent = displayOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <Layout userRole={userRole || 'buyer'}>
      <div className="p-6 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-3xl font-extrabold mb-1 text-indigo-dye/80">
              My Orders
            </h1>
            <p className="text-sm text-indigo-dye/50">
              Track your authentic handwoven sarees from loom to wardrobe.
            </p>
          </div>
          
          {/* Buyer Type Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border">
            <span className={`text-sm font-semibold ${!isBusinessBuyer ? 'text-indigo-dye' : 'text-muted-foreground'}`}>Normal</span>
            <Switch checked={isBusinessBuyer} onCheckedChange={setIsBusinessBuyer} />
            <span className={`text-sm font-semibold flex items-center gap-1 ${isBusinessBuyer ? 'text-indigo-dye' : 'text-muted-foreground'}`}>
              <BarChart className="h-4 w-4" /> Business B2B
            </span>
          </div>
        </div>

        {/* Business Insights (Only visible if Business toggle is on) */}
        {isBusinessBuyer && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl text-white card-lift bg-secondary">
              <TrendingUp className="h-6 w-6 mb-2 opacity-80" />
              <p className="text-xs uppercase tracking-wider opacity-80">Total B2B Spend</p>
              <h3 className="text-3xl font-bold">₹{(totalSpent/100000).toFixed(2)}L</h3>
            </div>
            <div className="p-5 rounded-2xl text-white card-lift bg-primary">
              <Package className="h-6 w-6 mb-2 opacity-80" />
              <p className="text-xs uppercase tracking-wider opacity-80">Active Wholesale Orders</p>
              <h3 className="text-3xl font-bold">{activeOrders.length}</h3>
            </div>
            <div className="p-5 rounded-2xl text-white card-lift bg-emerald">
              <Users className="h-6 w-6 mb-2 opacity-80" />
              <p className="text-xs uppercase tracking-wider opacity-80">Supply Partners</p>
              <h3 className="text-3xl font-bold">2 Active Societies</h3>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by order ID, saree type, or weaver..." 
              className="pl-10 h-11 rounded-xl bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 px-6 rounded-xl bg-white">
            <FilterIcon className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="active" className="rounded-lg px-6 py-2">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-lg px-6 py-2">Delivered ({deliveredOrders.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid lg:grid-cols-2 gap-6">
              {activeOrders.map(order => (
                <OrderCard key={order.id} order={order} isBusiness={isBusinessBuyer} />
              ))}
            </div>
            {activeOrders.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No active orders.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="delivered">
            <div className="grid lg:grid-cols-2 gap-6">
              {deliveredOrders.map(order => (
                <OrderCard key={order.id} order={order} isBusiness={isBusinessBuyer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </Layout>
  );
}
