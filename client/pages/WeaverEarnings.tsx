import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  Award,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample earnings data
const monthlyEarnings = [
  { month: 'Jan 2024', earnings: 85000, orders: 12, avgOrderValue: 7083 },
  { month: 'Feb 2024', earnings: 92000, orders: 14, avgOrderValue: 6571 },
  { month: 'Mar 2024', earnings: 78000, orders: 10, avgOrderValue: 7800 },
  { month: 'Apr 2024', earnings: 105000, orders: 16, avgOrderValue: 6563 },
  { month: 'May 2024', earnings: 125000, orders: 18, avgOrderValue: 6944 },
  { month: 'Jun 2024', earnings: 135000, orders: 20, avgOrderValue: 6750 },
];

const orderHistory = [
  {
    id: 1,
    orderNumber: 'THR-001-2024',
    customer: 'Priya Sharma',
    sareeType: 'Kanjivaram Silk',
    amount: 45000,
    completedDate: '2024-01-28',
    rating: 5,
    paymentStatus: 'paid',
    commission: 4500, // 10% to society
  },
  {
    id: 2,
    orderNumber: 'THR-002-2024',
    customer: 'Anjali Reddy',
    sareeType: 'Banarasi Silk',
    amount: 32000,
    completedDate: '2024-02-15',
    rating: 5,
    paymentStatus: 'paid',
    commission: 3200,
  },
  {
    id: 3,
    orderNumber: 'THR-005-2024',
    customer: 'Meera Patel',
    sareeType: 'Chanderi Cotton',
    amount: 8500,
    completedDate: '2024-02-28',
    rating: 4,
    paymentStatus: 'paid',
    commission: 850,
  },
  {
    id: 4,
    orderNumber: 'THR-008-2024',
    customer: 'Lakshmi Iyer',
    sareeType: 'Tussar Silk',
    amount: 15000,
    completedDate: '2024-03-10',
    rating: 5,
    paymentStatus: 'pending',
    commission: 1500,
  },
];

const productPerformance = [
  { type: 'Kanjivaram Silk', orders: 8, revenue: 360000, avgRating: 4.9 },
  { type: 'Banarasi Silk', orders: 6, revenue: 192000, avgRating: 4.8 },
  { type: 'Chanderi Cotton', orders: 12, revenue: 102000, avgRating: 4.6 },
  { type: 'Tussar Silk', orders: 4, revenue: 60000, avgRating: 4.7 },
];

const achievements = [
  {
    title: 'Top Performer',
    description: 'Highest earnings in February 2024',
    badge: 'gold',
    date: '2024-02-28',
    reward: '₹5,000 bonus'
  },
  {
    title: 'Quality Master',
    description: 'Maintained 4.8+ rating for 6 months',
    badge: 'silver',
    date: '2024-01-15',
    reward: 'Quality certification'
  },
  {
    title: 'Customer Favorite',
    description: '50+ five-star reviews',
    badge: 'bronze',
    date: '2024-03-01',
    reward: 'Recognition certificate'
  },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change?: string;
  icon: any;
  trend?: 'up' | 'down';
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <div className={cn(
              'flex items-center text-xs',
              trend === 'up' ? 'text-emerald' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
              {change}
            </div>
          )}
        </div>
        <Icon className={cn(
          'h-8 w-8',
          trend === 'up' ? 'text-emerald' : trend === 'down' ? 'text-destructive' : 'text-primary'
        )} />
      </div>
    </CardContent>
  </Card>
);

const OrderCard = ({ order }: { order: typeof orderHistory[0] }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-sm">{order.orderNumber}</h4>
          <p className="text-xs text-muted-foreground">{order.customer}</p>
          <p className="text-xs text-muted-foreground">{order.sareeType}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">₹{order.amount.toLocaleString()}</p>
          <Badge className={cn(
            'text-xs',
            order.paymentStatus === 'paid' ? 'bg-emerald text-white' : 'bg-orange-500 text-white'
          )}>
            {order.paymentStatus}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Completed: {new Date(order.completedDate).toLocaleDateString()}</span>
        <div className="flex items-center">
          <Award className="h-3 w-3 mr-1" />
          {order.rating} stars
        </div>
      </div>
      <div className="mt-2 pt-2 border-t">
        <div className="flex justify-between text-xs">
          <span>Your earning:</span>
          <span className="font-semibold">₹{(order.amount - order.commission).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Society commission:</span>
          <span>₹{order.commission.toLocaleString()}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function WeaverEarnings() {
  const { userRole } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  
  const totalEarnings = monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0);
  const totalOrders = monthlyEarnings.reduce((sum, month) => sum + month.orders, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalEarnings / totalOrders) : 0;
  
  const currentMonth = monthlyEarnings[monthlyEarnings.length - 1];
  const previousMonth = monthlyEarnings[monthlyEarnings.length - 2];
  const earningsChange = previousMonth ? 
    ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings * 100).toFixed(1) : '0';
  const ordersChange = previousMonth ? 
    ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1) : '0';

  const pendingPayments = orderHistory
    .filter(order => order.paymentStatus === 'pending')
    .reduce((sum, order) => sum + (order.amount - order.commission), 0);

  return (
    <Layout userRole={userRole || 'weaver'}>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Earnings & Analytics</h1>
              <p className="text-muted-foreground">
                Track your performance, earnings, and production metrics
              </p>
            </div>
            <div className="flex space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Earnings"
            value={`₹${totalEarnings.toLocaleString()}`}
            change={`${earningsChange}% from last month`}
            trend={parseFloat(earningsChange) > 0 ? 'up' : 'down'}
            icon={DollarSign}
          />
          <StatCard
            title="Total Orders"
            value={totalOrders.toString()}
            change={`${ordersChange}% from last month`}
            trend={parseFloat(ordersChange) > 0 ? 'up' : 'down'}
            icon={Package}
          />
          <StatCard
            title="Average Order Value"
            value={`₹${avgOrderValue.toLocaleString()}`}
            icon={BarChart3}
          />
          <StatCard
            title="Pending Payments"
            value={`₹${pendingPayments.toLocaleString()}`}
            icon={Clock}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Earnings Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Monthly Earnings Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyEarnings.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(month.earnings / 150000) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-20 text-right">
                            ₹{month.earnings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Product Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productPerformance.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{product.type}</span>
                          <Badge variant="outline">{product.avgRating} ⭐</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{product.orders} orders</span>
                          <span>₹{product.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(product.revenue / 400000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderHistory.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                    <div className="text-sm text-muted-foreground mb-4">Average Rating</div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center space-x-2">
                          <span className="text-xs w-4">{rating}★</span>
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                            />
                          </div>
                          <span className="text-xs w-8">{rating === 5 ? 80 : rating === 4 ? 15 : 5}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Production Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">On-time Delivery</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quality Pass Rate</span>
                      <span className="text-sm font-semibold">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Production Time</span>
                      <span className="text-sm font-semibold">18 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Retention</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Revenue Target</span>
                        <span className="text-sm">₹135k / ₹150k</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Orders Target</span>
                        <span className="text-sm">20 / 25</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-emerald h-2 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Quality Score</span>
                        <span className="text-sm">4.8 / 5.0</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-gold h-2 rounded-full" style={{ width: '96%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className={cn(
                      'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center',
                      achievement.badge === 'gold' ? 'bg-gold' :
                      achievement.badge === 'silver' ? 'bg-gray-400' : 'bg-orange-400'
                    )}>
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant="outline" className="mb-2">
                      {achievement.reward}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
