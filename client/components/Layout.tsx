import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoomyChatbot from './Loomy';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Home,
  Users,
  Award,
  FileText,
  Settings,
  LogOut,
  Menu,
  Bell,
  Scissors,
  ShoppingBag,
  Building2,
  Clock,
  IndianRupee,
  BarChart3,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'weaver' | 'buyer' | 'society' | null;
}

const ThariLogo = () => (
  <div className="flex items-center space-x-2">
    {/* Mini SVG Loom Icon */}
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ background: 'hsl(var(--primary))', borderRadius: '8px' }}>
      {/* Loom frame */}
      <rect x="4" y="6" width="2" height="20" rx="1" fill="hsl(var(--silk-gold))" />
      <rect x="26" y="6" width="2" height="20" rx="1" fill="hsl(var(--silk-gold))" />
      <rect x="4" y="6" width="24" height="2" rx="1" fill="hsl(var(--silk-gold))" />
      <rect x="4" y="24" width="24" height="2" rx="1" fill="hsl(var(--silk-gold))" />
      {/* Warp threads */}
      <line x1="9"  y1="8"  x2="9"  y2="24" stroke="hsl(var(--cotton-cream))" strokeWidth="1" />
      <line x1="13" y1="8"  x2="13" y2="24" stroke="hsl(var(--cotton-cream))" strokeWidth="1" />
      <line x1="17" y1="8"  x2="17" y2="24" stroke="hsl(var(--cotton-cream))" strokeWidth="1" />
      <line x1="21" y1="8"  x2="21" y2="24" stroke="hsl(var(--cotton-cream))" strokeWidth="1" />
      {/* Weft shuttle */}
      <rect x="7" y="14" width="18" height="3" rx="1.5" fill="hsl(var(--silk-gold))" opacity="0.9" />
    </svg>
    <div>
      <span className="font-bold text-xl leading-none text-primary">Thari</span>
      <span className="block text-xs font-tamil leading-none text-silk-gold">தறி</span>
    </div>
  </div>
);

const Navigation = ({ userRole, className, onNavigate }: { userRole?: string; className?: string; onNavigate?: () => void }) => {
  const location = useLocation();

  const getNavigationItems = () => {
    switch (userRole) {
      case 'weaver':
        return [
          { icon: Home,        label: 'Dashboard',          href: '/' },
          { icon: Scissors,    label: 'My Production',      href: '/weaver/production' },
          { icon: Clock,       label: 'Work Tracking',      href: '/weaver/work-tracking' },
          { icon: IndianRupee, label: 'My Earnings',        href: '/weaver/earnings' },
          { icon: FileText,    label: 'Govt Schemes',       href: '/weaver/schemes' },
        ];
      case 'buyer':
        return [
          { icon: Home,        label: 'Dashboard',          href: '/' },
          { icon: ShoppingBag, label: 'My Orders',          href: '/buyer/orders' },
          { icon: Users,       label: 'Featured Weavers',   href: '/buyer/weavers' },
        ];
      case 'society':
        return [
          { icon: Home,        label: 'Dashboard',          href: '/' },
          { icon: Users,       label: 'Manage Weavers',     href: '/society/weavers' },
          { icon: Building2,   label: 'Hierarchy',          href: '/society/hierarchy' },
          { icon: FileText,    label: 'Scheme Requests',    href: '/society/schemes' },
        ];
      default:
        return [{ icon: Home, label: 'Home', href: '/' }];
    }
  };

  const items = getNavigationItems();
  const roleColors: Record<string, string> = {
    weaver:  'hsl(350,60%,29%)',
    buyer:   'hsl(195,41%,25%)',
    society: 'hsl(16,54%,49%)',
  };

  return (
    <nav className={cn('space-y-1', className)}>
      {items.map((item) => {
        const active = location.pathname === item.href;
        return (
          <Link key={item.href} to={item.href} onClick={onNavigate}>
            <button
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
              style={active ? { backgroundColor: 'hsl(41,55%,45%)' } : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          </Link>
        );
      })}
    </nav>
  );
};

export default function Layout({ children, userRole }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setUserRole } = useUser();

  const handleLogout = () => {
    setUserRole(null);
    window.location.href = '/';
  };

  const roleLabel = userRole
    ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
    : 'Guest';

  const roleBadgeStyle: Record<string, React.CSSProperties> = {
    weaver:  { background: 'hsl(var(--palm-leaf))',  color: '#fff' },
    buyer:   { background: 'hsl(var(--indigo-dye))', color: '#fff' },
    society: { background: 'hsl(var(--terracotta))',  color: '#fff' },
  };

  const sidebarBg = 'hsl(var(--sidebar-background))';

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 w-full border-b backdrop-blur"
        style={{ background: 'hsl(var(--background) / 0.8)', borderColor: 'hsl(var(--border))' }}
      >
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          {/* Mobile trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 border-0">
              <div className="flex flex-col h-full" style={{ background: sidebarBg }}>
                <div className="p-5 border-b border-white/10">
                  <ThariLogo />
                  <p className="mt-2 text-xs text-white/50">Weaving Tradition, Building Future</p>
                </div>
                <div className="flex-1 p-4">
                  <Navigation userRole={userRole} onNavigate={() => setMobileMenuOpen(false)} />
                </div>
                {userRole && (
                  <div className="p-4 border-t border-white/10">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={roleBadgeStyle[userRole]}
                    >
                      {roleLabel}
                    </span>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <ThariLogo />
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9 px-2 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className="text-white text-sm font-bold"
                      style={{ background: 'hsl(350,60%,29%)' }}
                    >
                      {roleLabel[0]}
                    </AvatarFallback>
                  </Avatar>
                  {userRole && (
                    <span
                      className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={roleBadgeStyle[userRole]}
                    >
                      {roleLabel}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer"><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ── Sidebar Desktop ── */}
        <aside
          className="hidden md:flex w-64 flex-col min-h-[calc(100vh-4rem)] sticky top-16"
          style={{ background: sidebarBg }}
        >
          {/* Role badge */}
          {userRole && (
            <div className="px-4 pt-5 pb-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={roleBadgeStyle[userRole]}
              >
                {roleLabel} Portal
              </span>
            </div>
          )}
          <div className="flex-1 p-4">
            <Navigation userRole={userRole} />
          </div>
          {/* Decorative bottom */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-white/30 font-tamil text-center">தறி · Handloom</p>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <LoomyChatbot />
    </div>
  );
}
