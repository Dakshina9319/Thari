import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertCircle, Package, Edit, Eye, Calendar, User, MapPin, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Animated Loom SVG ─────────────────────────────────────────────────────────
const LoomAnimation = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Only render animated elements if user doesn't prefer reduced motion
  const animatedClass = prefersReducedMotion ? '' : 'loom-thread';

  return (
    <div className="relative w-full flex justify-center py-4">
      <svg viewBox="0 0 320 220" className="w-72 h-56" aria-label="Handloom at work">
        {/* Background glow */}
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--silk-gold))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--silk-gold))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--clay-brown) / 0.6)" />
            <stop offset="100%" stopColor="hsl(var(--clay-brown))" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="110" rx="130" ry="90" fill="url(#glowGrad)" />

        {/* Loom frame */}
        <rect x="20"  y="20"  width="14" height="180" rx="6" fill="url(#woodGrad)" />
        <rect x="286" y="20"  width="14" height="180" rx="6" fill="url(#woodGrad)" />
        <rect x="20"  y="20"  width="280" height="14" rx="6" fill="url(#woodGrad)" />
        <rect x="20"  y="186" width="280" height="14" rx="6" fill="url(#woodGrad)" />

        {/* Heddle bar - respects prefers-reduced-motion */}
        <rect className={animatedClass} x="30" y="70" width="260" height="8" rx="4" fill="hsl(var(--clay-brown) / 0.7)" opacity="0.7">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="1.8s" repeatCount="indefinite" />
        </rect>

        {/* Warp threads */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 38 + i * 14;
          const colors = ['hsl(var(--temple-maroon) / 0.6)', 'hsl(var(--silk-gold))', 'hsl(var(--cotton-cream) / 0.8)', 'hsl(var(--palm-leaf))'];
          return (
            <line key={i} x1={x} y1="34" x2={x} y2="186"
              stroke={colors[i % 4]} strokeWidth="2" opacity="0.8"
            />
          );
        })}

        {/* Weft rows (woven fabric) - respects prefers-reduced-motion */}
        <g className={animatedClass}>
          {[90, 105, 120, 135, 150, 165].map((y, i) => (
            <line key={y} x1="34" y1={y} x2="286" y2={y}
              stroke={i % 2 === 0 ? 'hsl(var(--temple-maroon))' : 'hsl(var(--silk-gold))'}
              strokeWidth="4" strokeLinecap="round" opacity="0.9"
            >
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
            </line>
          ))}
        </g>

        {/* Shuttle moving - respects prefers-reduced-motion */}
        <g className={animatedClass}>
          <animateTransform attributeName="transform" type="translate" values="0,0;200,0;0,0" dur="2.8s" repeatCount="indefinite" />
          <rect x="30" y="107" width="70" height="16" rx="8" fill="hsl(var(--clay-brown) / 0.8)" />
          <rect x="38" y="111" width="54" height="8" rx="4" fill="hsl(var(--silk-gold) / 0.9)" />
        </g>

        {/* Woven motif at bottom */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((i) => (
          <rect key={i} x={34 + i * 14} y="170" width="12" height="12" rx="1"
            fill={['hsl(var(--temple-maroon))', 'hsl(var(--silk-gold))', 'hsl(var(--palm-leaf))', 'hsl(var(--cotton-cream) / 0.8)'][i % 4]}
            opacity="0.85"
          />
        ))}

        {/* Active indicator pulse - respects prefers-reduced-motion */}
        <circle className={animatedClass} cx="295" cy="30" r="6" fill="hsl(var(--palm-leaf))">
          <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="283" y="52" fontSize="9" fill="hsl(var(--palm-leaf))" fontWeight="bold">LIVE</text>
      </svg>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const productions = [
  {
    id: 1,
    orderNumber: 'THR-001-2024',
    articleId: 'KNC-S-100',
    designId: 'DSN-B042',
    sareeType: 'Kanjivaram Silk',
    customer: 'Priya Sharma',
    customerLocation: 'Chennai, Tamil Nadu',
    startDate: getRelativeDate(-15),
    expectedDate: getRelativeDate(5),
    status: 'in-progress',
    progress: 65,
    epi: 100,
    processes: [
      { name: 'Yarn Preparation', status: 'completed', updatedDate: getRelativeDate(-14) },
      { name: 'Warping',          status: 'completed', updatedDate: getRelativeDate(-12) },
      { name: 'Weaving',          status: 'in-progress', updatedDate: getRelativeDate(-5) },
      { name: 'Border Work',      status: 'pending', updatedDate: null },
      { name: 'Finishing',        status: 'pending', updatedDate: null },
      { name: 'Quality Check',    status: 'pending', updatedDate: null },
    ],
    materials: { silk: '2.5 kg', zari: '500g', dyes: 'Temple Maroon, Gold' },
    price: 45000,
  },
  {
    id: 2,
    orderNumber: 'THR-002-2024',
    articleId: 'NGM-S-080',
    designId: 'DSN-A018',
    sareeType: 'Negamam Soft Silk',
    customer: 'Anjali Reddy',
    customerLocation: 'Coimbatore, Tamil Nadu',
    startDate: getRelativeDate(-30),
    expectedDate: getRelativeDate(-2),
    status: 'completed',
    progress: 100,
    epi: 80,
    processes: [
      { name: 'Yarn Preparation', status: 'completed', updatedDate: getRelativeDate(-29) },
      { name: 'Warping',          status: 'completed', updatedDate: getRelativeDate(-27) },
      { name: 'Weaving',          status: 'completed', updatedDate: getRelativeDate(-10) },
      { name: 'Border Work',      status: 'completed', updatedDate: getRelativeDate(-5) },
      { name: 'Finishing',        status: 'completed', updatedDate: getRelativeDate(-2) },
      { name: 'Quality Check',    status: 'completed', updatedDate: getRelativeDate(-2) },
    ],
    materials: { silk: '2.2 kg', zari: '400g', dyes: 'Royal Blue, Silver' },
    price: 32000,
  },
  {
    id: 3,
    orderNumber: 'THR-003-2024',
    articleId: 'BVN-C-060',
    designId: 'DSN-C010',
    sareeType: 'Bhavani Cotton',
    customer: 'Society Bulk Order',
    customerLocation: 'Bhavani, Tamil Nadu',
    startDate: getRelativeDate(-2),
    expectedDate: getRelativeDate(18),
    status: 'pending',
    progress: 15,
    epi: 60,
    processes: [
      { name: 'Yarn Preparation', status: 'in-progress', updatedDate: getRelativeDate(-1) },
      { name: 'Warping',          status: 'pending', updatedDate: null },
      { name: 'Weaving',          status: 'pending', updatedDate: null },
      { name: 'Border Work',      status: 'pending', updatedDate: null },
      { name: 'Finishing',        status: 'pending', updatedDate: null },
      { name: 'Quality Check',    status: 'pending', updatedDate: null },
    ],
    materials: { cotton: '1.8 kg', dyes: 'Palm Leaf Green, White' },
    price: 8500,
  },
];

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  completed:   { background: 'hsl(var(--palm-leaf))',  color: '#fff' },
  'in-progress': { background: 'hsl(var(--indigo-dye))', color: '#fff' },
  pending:     { background: 'hsl(var(--clay-brown))',  color: '#fff' },
  delayed:     { background: 'hsl(var(--temple-maroon))', color: '#fff' },
};

const ProcessIcon = ({ status }: { status: string }) => {
  if (status === 'completed')   return <CheckCircle className="h-4 w-4" style={{ color: 'hsl(var(--palm-leaf))' }} />;
  if (status === 'in-progress') return <Clock className="h-4 w-4"       style={{ color: 'hsl(var(--indigo-dye))' }} />;
  return <AlertCircle className="h-4 w-4" style={{ color: 'hsl(var(--clay-brown))' }} />;
};

interface Production {
  id: number;
  orderNumber: string;
  articleId: string;
  designId: string;
  sareeType: string;
  customer: string;
  customerLocation: string;
  startDate: string;
  expectedDate: string;
  status: string;
  progress: number;
  epi: number;
  processes: { name: string; status: string; updatedDate: string | null }[];
  materials: Record<string, string>;
  price: number;
}

const ProductionCard = ({ prod, onView, onUpdate }: {
  prod: Production;
  onView: (p: Production) => void;
  onUpdate: (p: Production) => void;
}) => {
  const days = Math.ceil((new Date(prod.expectedDate).getTime() - Date.now()) / 86_400_000);
  return (
    <Card className="card-lift overflow-hidden border-0 shadow-md">
      {/* Coloured top strip */}
      <div className="h-1.5" style={STATUS_STYLES[prod.status]} />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-bold text-primary">
              {prod.orderNumber}
            </CardTitle>
            <p className="text-xs mt-0.5 text-muted-foreground">
              {prod.sareeType} · {prod.articleId} · EPI {prod.epi}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={STATUS_STYLES[prod.status]}>
            {prod.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><User className="h-3 w-3" />{prod.customer}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{prod.customerLocation}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {new Date(prod.expectedDate).toLocaleDateString('en-IN')}</span>
          <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />₹{prod.price.toLocaleString('en-IN')}</span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs mb-1 text-muted-foreground">
            <span>Progress</span>
            <span className="font-semibold">{prod.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${prod.progress}%`, background: prod.progress === 100 ? 'hsl(var(--palm-leaf))' : 'hsl(var(--temple-maroon))' }}
            />
          </div>
          <p className={cn('text-xs mt-1 font-medium', days < 0 ? 'text-terracotta' : '')}
            style={{ color: days < 0 ? 'hsl(var(--terracotta))' : days < 5 ? 'hsl(var(--clay-brown))' : 'hsl(var(--palm-leaf))' }}>
            {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days remaining`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" onClick={() => onView(prod)}>
            <Eye className="h-3 w-3 mr-1" /> Details
          </Button>
          {prod.status !== 'completed' && (
            <Button size="sm" className="flex-1 h-8 text-xs text-white bg-primary" onClick={() => onUpdate(prod)}>
              <Edit className="h-3 w-3 mr-1" /> Update
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function WeaverProduction() {
  const { userRole } = useUser();
  const [viewProd, setViewProd] = useState<Production | null>(null);
  const [updateProd, setUpdateProd] = useState<Production | null>(null);
  const [updateData, setUpdateData] = useState({ processIndex: '0', status: '', notes: '' });

  const completed  = productions.filter(p => p.status === 'completed').length;
  const inProgress = productions.filter(p => p.status === 'in-progress').length;
  const pending    = productions.filter(p => p.status === 'pending').length;
  const totalValue = productions.reduce((s, p) => s + p.price, 0);

  return (
    <Layout userRole={userRole || 'weaver'}>
      <div className="p-6 space-y-6">

        {/* ── Header + Loom ── */}
        <div className="rounded-2xl overflow-hidden bg-primary">
          <div className="grid md:grid-cols-2 gap-4 items-center px-6 pt-6 pb-2">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-silk-gold/70">
                உற்பத்தி நிர்வாகம்
              </p>
              <h1 className="text-3xl font-extrabold text-white mb-2">My Production</h1>
              <p className="text-sm text-cotton-cream/80">
                Track every saree from warp to weave. Each thread tells a story.
              </p>
            </div>
            <LoomAnimation />
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Completed',   value: completed,                     color: 'hsl(var(--palm-leaf))'  },
            { label: 'In Progress', value: inProgress,                    color: 'hsl(var(--indigo-dye))' },
            { label: 'Pending',     value: pending,                       color: 'hsl(var(--clay-brown))'  },
            { label: 'Total Value', value: `₹${(totalValue/1000).toFixed(0)}K`, color: 'hsl(var(--temple-maroon))' },
          ].map((s) => (
            <Card key={s.label} className="border-0 shadow-sm card-lift">
              <CardContent className="p-4">
                <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-0.5 text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="active">
          <TabsList className="mb-4 bg-muted">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid md:grid-cols-2 gap-5">
              {productions.filter(p => p.status !== 'completed').map(p => (
                <ProductionCard key={p.id} prod={p} onView={setViewProd} onUpdate={setUpdateProd} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid md:grid-cols-2 gap-5">
              {productions.filter(p => p.status === 'completed').map(p => (
                <ProductionCard key={p.id} prod={p} onView={setViewProd} onUpdate={setUpdateProd} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 gap-5">
              {productions.map(p => (
                <ProductionCard key={p.id} prod={p} onView={setViewProd} onUpdate={setUpdateProd} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── View Details Dialog ── */}
      <Dialog open={!!viewProd} onOpenChange={() => setViewProd(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {viewProd?.orderNumber} — {viewProd?.sareeType}
            </DialogTitle>
            <DialogDescription>Article: {viewProd?.articleId} · Design: {viewProd?.designId}</DialogDescription>
          </DialogHeader>
          {viewProd && (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl p-3 bg-muted/50">
                  <h4 className="font-semibold mb-2 text-primary">Customer</h4>
                  <p>{viewProd.customer}</p>
                  <p className="text-xs mt-0.5 text-muted-foreground">{viewProd.customerLocation}</p>
                </div>
                <div className="rounded-xl p-3 bg-muted/50">
                  <h4 className="font-semibold mb-2 text-primary">Order Details</h4>
                  <p>Price: ₹{viewProd.price.toLocaleString('en-IN')}</p>
                  <p className="text-xs mt-0.5 text-muted-foreground">
                    Due: {new Date(viewProd.expectedDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-primary">Production Stages</h4>
                <div className="space-y-2">
                  {viewProd.processes.map((pr, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                      <ProcessIcon status={pr.status} />
                      <div className="flex-1 text-sm">
                        <span className="font-medium">{pr.name}</span>
                        {pr.updatedDate && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {new Date(pr.updatedDate).toLocaleDateString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                        style={STATUS_STYLES[pr.status] ?? { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
                        {pr.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-primary">Materials</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(viewProd.materials).map(([k, v]) => (
                    <div key={k} className="flex justify-between px-3 py-1.5 rounded-lg bg-muted/50">
                      <span className="capitalize text-muted-foreground">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Update Dialog ── */}
      <Dialog open={!!updateProd} onOpenChange={() => setUpdateProd(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">Update Progress</DialogTitle>
            <DialogDescription>{updateProd?.orderNumber}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Stage</Label>
              <Select value={updateData.processIndex}
                onValueChange={(v) => setUpdateData(d => ({ ...d, processIndex: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {updateProd?.processes.map((pr, i) => (
                    <SelectItem key={i} value={String(i)}>{pr.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>New Status</Label>
              <Select value={updateData.status}
                onValueChange={(v) => setUpdateData(d => ({ ...d, status: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                placeholder="Add any notes..."
                value={updateData.notes}
                onChange={(e) => setUpdateData(d => ({ ...d, notes: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setUpdateProd(null)}>Cancel</Button>
              <Button className="bg-primary text-white" onClick={() => {
                console.log('Update:', updateProd?.id, updateData);
                setUpdateProd(null);
                setUpdateData({ processIndex: '0', status: '', notes: '' });
              }}>
                Save Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}