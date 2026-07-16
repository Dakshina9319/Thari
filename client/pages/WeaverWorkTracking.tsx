import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mic,
  MicOff,
  Wifi,
  CloudUpload,
  Activity,
  AlertTriangle,
  BarChart3,
  Calendar,
  Clock,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkSession {
  id: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: number; // minutes
  productionItem: string;
  avgSoundLevel: number;
  activeTime: number; 
  pausedTime: number; 
  status: 'active' | 'completed' | 'paused';
  syncStatus: 'synced' | 'pending';
}

const recentSessions: WorkSession[] = [
  {
    id: '1',
    date: '2024-02-15',
    startTime: '09:00',
    endTime: '12:30',
    duration: 210,
    productionItem: 'THR-001-2024',
    avgSoundLevel: 65,
    activeTime: 180,
    pausedTime: 30,
    status: 'completed',
    syncStatus: 'synced',
  },
  {
    id: '2',
    date: '2024-02-14',
    startTime: '14:00',
    endTime: '17:45',
    duration: 225,
    productionItem: 'THR-002-2024',
    avgSoundLevel: 62,
    activeTime: 195,
    pausedTime: 30,
    status: 'completed',
    syncStatus: 'synced',
  },
];

export default function WeaverWorkTracking() {
  const { userRole } = useUser();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [soundLevel, setSoundLevel] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Simulate ESP Mini Connection
  const connectDevice = () => {
    setDeviceConnected(true);
  };

  // Simulate incoming sound data from ESP Mini
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && deviceConnected) {
      interval = setInterval(() => {
        // Random sound level between 30 and 85 to simulate loom strikes
        const level = Math.floor(Math.random() * 55) + 30;
        setSoundLevel(level);
        if (level > 40) {
          setActiveTime(prev => prev + 1);
        }
      }, 1000);
    } else {
      setSoundLevel(0);
    }
    return () => clearInterval(interval);
  }, [isTracking, deviceConnected]);

  const toggleTracking = () => {
    if (!selectedOrder) {
      alert("Please select a production order first.");
      return;
    }
    setIsTracking(!isTracking);
  };

  const uploadSessionData = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('Data successfully synced to Thari Cloud and sent to Society.');
      setIsTracking(false);
      setActiveTime(0);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  const getBarHeight = (index: number) => {
    if (prefersReducedMotion || !isTracking) return Math.random() * 10;
    const isRecent = index > 35;
    return isRecent ? Math.max(10, (soundLevel / 100) * 100) : Math.random() * 100;
  };

  const getBarColor = (height: number) => {
    if (height > 70) return 'hsl(var(--terracotta))';
    if (height > 40) return 'hsl(var(--silk-gold))';
    return 'hsl(var(--border))';
  };

  return (
    <Layout userRole={userRole || 'weaver'}>
      <div className="p-6 space-y-6">
        
        <div className="rounded-2xl overflow-hidden bg-primary text-primary-foreground">
          <div className="px-6 py-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-silk-gold/70">
              பணி கண்காணிப்பு
            </p>
            <h1 className="text-3xl font-extrabold text-white mb-2">Sound-Based Work Tracking</h1>
            <p className="text-sm text-cotton-cream/80">
              Connect your ESP Mini acoustic sensor to automatically log weaving hours via loom sound detection.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Tracker Card */}
          <Card className="lg:col-span-2 card-lift border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Activity className="h-5 w-5" />
                    Live Session Tracker
                  </CardTitle>
                  <CardDescription>ESP Mini Acoustic Integration</CardDescription>
                </div>
                {deviceConnected ? (
                  <Badge className="bg-palm-leaf text-white"><Wifi className="h-3 w-3 mr-1"/> Connected</Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground"><Wifi className="h-3 w-3 mr-1"/> Disconnected</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {!deviceConnected ? (
                <div className="text-center py-8 bg-muted/50 rounded-xl border border-dashed border-border">
                  <Cpu className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-foreground">ESP Mini Not Connected</h3>
                  <p className="text-sm text-muted-foreground mb-4">Please pair your hardware acoustic sensor via Bluetooth or Wi-Fi.</p>
                  <Button onClick={connectDevice} className="bg-indigo-dye text-white">
                    Connect Device
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {!isTracking && activeTime === 0 ? (
                    <div className="space-y-4">
                      <Label>Select Order to Track</Label>
                      <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose order..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="THR-001-2024">THR-001-2024 (Kanjivaram Silk)</SelectItem>
                          <SelectItem value="THR-002-2024">THR-002-2024 (Negamam Silk)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={toggleTracking} className="w-full bg-palm-leaf text-white hover:bg-palm-leaf/90">
                        Start Session
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-muted/50 p-4 rounded-xl border border-border">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Active Weaving Time</p>
                          <p className="text-3xl font-mono font-bold text-primary">{formatTime(activeTime)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Acoustic Level</p>
                          <div className="flex items-center justify-center gap-2">
                            {soundLevel > 40 ? <Mic className="h-5 w-5 text-palm-leaf" /> : <MicOff className="h-5 w-5 text-muted-foreground" />}
                            <span className="text-2xl font-bold text-foreground">{soundLevel} dB</span>
                          </div>
                        </div>
                      </div>

                      {/* Visualiser bars */}
                      <div className="flex items-end h-16 gap-1 overflow-hidden justify-center px-4" role="img" aria-label="Sound level visualization">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-2 rounded-t-sm transition-all duration-300"
                            style={{ 
                              height: `${getBarHeight(i)}%`,
                              background: getBarColor(getBarHeight(i))
                            }}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          onClick={toggleTracking} 
                          variant={isTracking ? "outline" : "default"}
                          className={cn(!isTracking ? "bg-palm-leaf text-white" : "border-primary text-primary")}
                        >
                          {isTracking ? "Pause Tracking" : "Resume Tracking"}
                        </Button>
                        <Button 
                          onClick={uploadSessionData} 
                          disabled={isUploading || activeTime === 0}
                          className="bg-indigo-dye text-white"
                        >
                          {isUploading ? "Uploading..." : "Upload & End Session"}
                          {!isUploading && <CloudUpload className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="card-lift border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-primary">
                <BarChart3 className="h-5 w-5 mr-2" />
                Session History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm text-indigo-dye">{session.productionItem}</p>
                      <Badge variant="outline" className="text-[10px] bg-palm-leaf/10 text-palm-leaf border-palm-leaf/20">
                        {session.syncStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {new Date(session.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> {session.activeTime} mins active</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </Layout>
  );
}
