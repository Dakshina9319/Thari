import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scissors, ShoppingBag, Building2, Star, MapPin, TrendingUp, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';

type UserRole = 'weaver' | 'buyer' | 'society';

// ── Animated SVG Handloom ─────────────────────────────────────────────────────
const HandloomHeroSVG = () => (
  <svg viewBox="0 0 220 200" className="w-full max-w-xs mx-auto" aria-label="Traditional Handloom">
    {/* Loom frame */}
    <rect x="10"  y="15"  width="10" height="170" rx="5" fill="hsl(var(--clay-brown))" />
    <rect x="200" y="15"  width="10" height="170" rx="5" fill="hsl(var(--clay-brown))" />
    <rect x="10"  y="15"  width="200" height="10" rx="5" fill="hsl(var(--clay-brown))" />
    <rect x="10"  y="175" width="200" height="10" rx="5" fill="hsl(var(--clay-brown))" />

    {/* Warp threads */}
    {Array.from({ length: 14 }).map((_, i) => (
      <line
        key={i}
        x1={28 + i * 13} y1="25"
        x2={28 + i * 13} y2="175"
        stroke={i % 3 === 0 ? 'hsl(var(--silk-gold))' : i % 3 === 1 ? 'hsl(var(--temple-maroon) / 0.6)' : 'hsl(var(--cotton-cream) / 0.6)'}
        strokeWidth="2"
        opacity="0.85"
      />
    ))}

    {/* Weft threads (animated) */}
    {[60, 80, 100, 120, 140].map((y, i) => (
      <g key={y}>
        <line
          x1="20" y1={y} x2="200" y2={y}
          stroke={i % 2 === 0 ? 'hsl(var(--temple-maroon))' : 'hsl(var(--silk-gold))'}
          strokeWidth="3"
          opacity="0.9"
        >
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur={`${1.5 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </line>
      </g>
    ))}

    {/* Shuttle */}
    <rect x="20" y="93" width="80" height="14" rx="7" fill="hsl(var(--clay-brown))" className="loom-thread">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 100,0; 0,0"
        dur="3s"
        repeatCount="indefinite"
      />
    </rect>

    {/* Pattern blocks at base */}
    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((i) => (
      <rect
        key={i}
        x={20 + i * 13} y="155"
        width="11" height="15"
        rx="1"
        fill={i % 4 === 0 ? 'hsl(var(--temple-maroon))' : i % 4 === 1 ? 'hsl(var(--silk-gold))' : i % 4 === 2 ? 'hsl(var(--palm-leaf))' : 'hsl(var(--cotton-cream) / 0.6)'}
        opacity="0.8"
      />
    ))}
  </svg>
);

// ── Role Card ─────────────────────────────────────────────────────────────────
const RoleCard = ({
  role, icon: Icon, title, subtitle, description, color, bgClass, onSelect,
}: {
  role: UserRole; icon: any; title: string; subtitle: string; description: string;
  color: string; bgClass: string; onSelect: (r: UserRole) => void;
}) => (
  <button
    onClick={() => onSelect(role)}
    className={cn(
      "group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none woven-border card-lift text-white",
      bgClass
    )}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    />
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-xs font-tamil mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{subtitle}</p>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{description}</p>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-white/80 text-sm font-medium">
      <span>Continue as {title}</span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </button>
);

// ── Dashboard Quick Stat ──────────────────────────────────────────────────────
const Stat = ({ icon: Icon, value, label, color }: { icon: any; value: string; label: string; color: string }) => (
  <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm card-lift">
    <div className="p-2.5 rounded-xl" style={{ background: color + '20' }}>
      <Icon className="h-6 w-6" style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold" style={{ color: 'hsl(var(--indigo-dye) / 0.8)' }}>{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

export default function Index() {
  const { userRole, setUserRole } = useUser();

  /* ── Landing: role picker ── */
  if (!userRole) {
    return (
      <div
        className="min-h-screen bg-cotton-cream"
      >
        {/* Top nav bar */}
        <nav className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: 'hsl(var(--temple-maroon))' }}
            >
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl text-primary">Thari</span>
              <span className="ml-1 font-tamil text-base text-silk-gold">தறி</span>
            </div>
          </div>
          <Badge
            className="px-3 py-1 text-xs font-semibold"
            style={{ background: 'hsl(var(--silk-gold))', color: '#fff', border: 'none' }}
          >
            Handloom Heritage Platform
          </Badge>
        </nav>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-silk-gold/70">
                தறி — The Loom
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4" style={{ color: 'hsl(var(--temple-maroon) / 0.8)' }}>
                Weaving<br />
                <span className="text-silk-gold">Tradition</span><br />
                Building Future
              </h1>
              <p className="text-lg mb-8" style={{ color: 'hsl(var(--indigo-dye) / 0.7)' }}>
                A unified supply-chain platform connecting handloom weavers, conscious buyers,
                and co-operative societies — powered by intelligence, rooted in heritage.
              </p>
              {/* Stats row */}
              <div className="flex gap-8">
                {[
                  { val: '500+', label: 'Weavers' },
                  { val: '2,000+', label: 'Sarees' },
                  { val: '50+', label: 'Societies' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold text-primary">{s.val}</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--indigo-dye) / 0.6)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <HandloomHeroSVG />
            </div>
          </div>

          {/* Role cards */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'hsl(var(--indigo-dye) / 0.8)' }}>
              Choose Your Portal
            </h2>
            <p className="text-center text-sm mb-8" style={{ color: 'hsl(var(--indigo-dye) / 0.5)' }}>
              Select your role to access your personalised dashboard
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              <RoleCard
                role="weaver"
                icon={Scissors}
                title="Weaver"
                subtitle="நெசவாளர்"
                description="Track production, log weaving sessions via sound, view earnings & government schemes"
                color="hsl(var(--palm-leaf))"
                bgClass="bg-palm-leaf"
                onSelect={setUserRole}
              />
              <RoleCard
                role="buyer"
                icon={ShoppingBag}
                title="Buyer"
                subtitle="வாங்குபவர்"
                description="Discover authenticated handwoven sarees, connect with weavers, track your orders"
                color="hsl(var(--indigo-dye))"
                bgClass="bg-indigo-dye"
                onSelect={setUserRole}
              />
              <RoleCard
                role="society"
                icon={Building2}
                title="Society"
                subtitle="சங்கம்"
                description="Manage weaver networks, process scheme applications, scan QR codes & export data"
                color="hsl(var(--temple-maroon))"
                bgClass="bg-temple-maroon"
                onSelect={setUserRole}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Dashboard (role selected) ── */
  return (
    <Layout userRole={userRole}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-primary">
              {userRole === 'weaver' && 'Weaver Dashboard'}
              {userRole === 'buyer'  && 'Buyer Dashboard'}
              {userRole === 'society' && 'Society Dashboard'}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {userRole === 'weaver'  && 'Welcome back, நெசவாளர். Your loom awaits.'}
              {userRole === 'buyer'   && 'Discover authentic handwoven sarees from master weavers.'}
              {userRole === 'society' && 'Oversee your weaver network and process scheme requests.'}
            </p>
          </div>
          <Button
            onClick={() => setUserRole(null)}
            variant="outline"
            className="border-2 border-primary text-primary"
          >
            Change Role
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat icon={Star}      value="4.8"    label="Avg Rating"     color="hsl(var(--silk-gold))"  />
          <Stat icon={Users}     value="42"     label="Active Weavers" color="hsl(var(--palm-leaf))"  />
          <Stat icon={TrendingUp} value="₹8.2L" label="Monthly Sales" color="hsl(var(--temple-maroon))" />
          <Stat icon={Award}     value="156"    label="Total Products" color="hsl(var(--indigo-dye))" />
        </div>

        {/* Call-to-action cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {userRole === 'weaver' && (
            <>
              <Link to="/weaver/production" className="block rounded-2xl p-5 text-white card-lift bg-palm-leaf">
                <Scissors className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">My Production</h3>
                <p className="text-sm opacity-80 mt-1">View & update active orders</p>
              </Link>
              <Link to="/weaver/work-tracking" className="block rounded-2xl p-5 text-white card-lift bg-temple-maroon">
                <span className="block text-3xl mb-3">🎙️</span>
                <h3 className="font-bold text-lg">Work Tracking</h3>
                <p className="text-sm opacity-80 mt-1">Sound-based session logger</p>
              </Link>
              <Link to="/weaver/earnings" className="block rounded-2xl p-5 text-white card-lift bg-clay-brown">
                <span className="block text-3xl mb-3">₹</span>
                <h3 className="font-bold text-lg">Earnings</h3>
                <p className="text-sm opacity-80 mt-1">Track your income & payouts</p>
              </Link>
            </>
          )}
          {userRole === 'buyer' && (
            <>
              <Link to="/buyer/orders" className="block rounded-2xl p-5 text-white card-lift bg-indigo-dye">
                <ShoppingBag className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">My Orders</h3>
                <p className="text-sm opacity-80 mt-1">Track all your purchases</p>
              </Link>
              <Link to="/buyer/weavers" className="block rounded-2xl p-5 text-white card-lift bg-terracotta">
                <Users className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">Discover Weavers</h3>
                <p className="text-sm opacity-80 mt-1">Meet master craftspeople</p>
              </Link>
              <Link to="/products" className="block rounded-2xl p-5 text-white card-lift bg-silk-gold">
                <Star className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">Browse Sarees</h3>
                <p className="text-sm opacity-80 mt-1">Explore authenticated products</p>
              </Link>
            </>
          )}
          {userRole === 'society' && (
            <>
              <Link to="/society/weavers" className="block rounded-2xl p-5 text-white card-lift bg-palm-leaf">
                <Users className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">Manage Weavers</h3>
                <p className="text-sm opacity-80 mt-1">View and administer network</p>
              </Link>
              <Link to="/society/schemes" className="block rounded-2xl p-5 text-white card-lift bg-temple-maroon">
                <Award className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">Scheme Requests</h3>
                <p className="text-sm opacity-80 mt-1">Process govt. applications + QR</p>
              </Link>
              <Link to="/society/hierarchy" className="block rounded-2xl p-5 text-white card-lift bg-indigo-dye">
                <Building2 className="h-8 w-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg">Hierarchy</h3>
                <p className="text-sm opacity-80 mt-1">Org chart & cluster view</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}