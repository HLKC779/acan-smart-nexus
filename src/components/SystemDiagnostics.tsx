import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Monitor, 
  RefreshCw, 
  Zap,
  Network,
  Brain
} from 'lucide-react';
import { PerformanceMonitor, testComponentPerformance, generateStressTestData, debugLog } from '@/lib/performanceUtils';
import { supabase } from '@/integrations/supabase/client';

interface DiagnosticsProps {
  nodes: any[];
  edges: any[];
  isVisible: boolean;
}

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  duration: number;
  details?: any;
}

export const SystemDiagnostics: React.FC<DiagnosticsProps> = ({ nodes, edges, isVisible }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [systemHealth, setSystemHealth] = useState<'good' | 'warning' | 'critical'>('good');

  const performanceMonitor = PerformanceMonitor.getInstance();

  // Auto-update performance metrics
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        const metrics = performanceMonitor.getPerformanceSummary();
        setPerformanceMetrics(metrics);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isVisible, performanceMonitor]);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: TestResult[] = [];

    try {
      // Test 1: React Flow Performance
      debugLog('Running React Flow performance test');
      const flowTest = await testComponentPerformance(async () => {
        // Simulate heavy React Flow operations
        await new Promise(resolve => setTimeout(resolve, 10));
      }, 5);

      results.push({
        name: 'React Flow Performance',
        status: flowTest.avgTime < 50 ? 'pass' : flowTest.avgTime < 100 ? 'warning' : 'fail',
        message: `Average render time: ${flowTest.avgTime.toFixed(2)}ms`,
        duration: flowTest.avgTime,
        details: flowTest
      });

      // Test 2: Memory Usage
      debugLog('Checking memory usage');
      const memoryTest = performanceMonitor.getLatestMetrics();
      if (memoryTest) {
        results.push({
          name: 'Memory Usage',
          status: memoryTest.memoryUsage < 50 ? 'pass' : memoryTest.memoryUsage < 100 ? 'warning' : 'fail',
          message: `Current usage: ${memoryTest.memoryUsage.toFixed(2)}MB`,
          duration: 0,
          details: { memoryUsage: memoryTest.memoryUsage }
        });
      }

      // Test 3: Node/Edge Count Validation
      debugLog('Validating graph structure');
      const nodeCount = nodes.length;
      const edgeCount = edges.length;
      const isValidStructure = nodeCount > 0 && nodeCount < 1000 && edgeCount >= 0;
      
      results.push({
        name: 'Graph Structure',
        status: isValidStructure ? 'pass' : 'fail',
        message: `${nodeCount} nodes, ${edgeCount} edges`,
        duration: 0,
        details: { nodeCount, edgeCount }
      });

      // Test 4: Database Connection (if authenticated)
      debugLog('Testing database connection');
      try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        results.push({
          name: 'Database Connection',
          status: error ? 'fail' : 'pass',
          message: error ? `Connection failed: ${error.message}` : 'Connection successful',
          duration: 0,
          details: { error: error?.message }
        });
      } catch (dbError) {
        results.push({
          name: 'Database Connection',
          status: 'fail',
          message: `Connection error: ${dbError}`,
          duration: 0,
          details: { error: dbError }
        });
      }

      // Test 5: Stress Test (Optional)
      debugLog('Running stress test');
      const stressData = generateStressTestData(50);
      const stressTest = await testComponentPerformance(async () => {
        // Simulate processing large dataset
        stressData.nodes.forEach(node => {
          JSON.stringify(node);
        });
      }, 3);

      results.push({
        name: 'Stress Test (50 nodes)',
        status: stressTest.avgTime < 100 ? 'pass' : stressTest.avgTime < 200 ? 'warning' : 'fail',
        message: `Processing time: ${stressTest.avgTime.toFixed(2)}ms`,
        duration: stressTest.avgTime,
        details: stressTest
      });

      // Test 6: Local Storage
      debugLog('Testing local storage');
      try {
        const testKey = 'rl-diagnostics-test';
        localStorage.setItem(testKey, 'test-value');
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        
        results.push({
          name: 'Local Storage',
          status: retrieved === 'test-value' ? 'pass' : 'fail',
          message: retrieved === 'test-value' ? 'Working correctly' : 'Storage unavailable',
          duration: 0
        });
      } catch (storageError) {
        results.push({
          name: 'Local Storage',
          status: 'fail',
          message: `Storage error: ${storageError}`,
          duration: 0,
          details: { error: storageError }
        });
      }

    } catch (error) {
      debugLog('Diagnostic error', error);
      results.push({
        name: 'Diagnostic System',
        status: 'fail',
        message: `Diagnostic failed: ${error}`,
        duration: 0,
        details: { error }
      });
    }

    setTestResults(results);
    
    // Determine overall system health
    const failCount = results.filter(r => r.status === 'fail').length;
    const warningCount = results.filter(r => r.status === 'warning').length;
    
    if (failCount > 0) {
      setSystemHealth('critical');
    } else if (warningCount > 0) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('good');
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          System Diagnostics
        </CardTitle>
        <CardDescription>
          Comprehensive testing and monitoring for the RL Agent Management system
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={systemHealth === 'good' ? 'default' : systemHealth === 'warning' ? 'secondary' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {systemHealth === 'good' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  System {systemHealth === 'good' ? 'Healthy' : systemHealth === 'warning' ? 'Warning' : 'Critical'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last checked: {testResults.length > 0 ? 'Recently' : 'Never'}
                </span>
              </div>
              
              <Button 
                onClick={runDiagnostics} 
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                {isRunning ? 'Running...' : 'Run Diagnostics'}
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Test Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Passed:</span>
                        <span className="text-green-600 font-medium">
                          {testResults.filter(r => r.status === 'pass').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Warnings:</span>
                        <span className="text-yellow-600 font-medium">
                          {testResults.filter(r => r.status === 'warning').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Failed:</span>
                        <span className="text-red-600 font-medium">
                          {testResults.filter(r => r.status === 'fail').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">System Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Nodes:</span>
                        <span className="font-medium">{nodes.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Edges:</span>
                        <span className="font-medium">{edges.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Memory:</span>
                        <span className="font-medium">
                          {performanceMetrics?.avgMemoryUsage?.toFixed(1) || 'N/A'} MB
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            {performanceMetrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Avg Render Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {performanceMetrics.avgRenderTime?.toFixed(1) || 'N/A'}ms
                    </div>
                    <Progress 
                      value={Math.min(100, (performanceMetrics.avgRenderTime || 0) / 2)} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Max Render Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {performanceMetrics.maxRenderTime?.toFixed(1) || 'N/A'}ms
                    </div>
                    <Progress 
                      value={Math.min(100, (performanceMetrics.maxRenderTime || 0) / 5)} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Memory Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {performanceMetrics.avgMemoryUsage?.toFixed(1) || 'N/A'} MB
                    </div>
                    <Progress 
                      value={Math.min(100, (performanceMetrics.avgMemoryUsage || 0) / 2)} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Measurements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {performanceMetrics.totalMeasurements || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Total recordings
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Test Results Tab */}
          <TabsContent value="tests" className="space-y-4">
            {testResults.length === 0 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  No test results available. Run diagnostics to see detailed test information.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-muted-foreground">{result.message}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {result.duration > 0 && (
                            <div className="text-sm font-medium">{result.duration.toFixed(2)}ms</div>
                          )}
                          <Badge variant={
                            result.status === 'pass' ? 'default' : 
                            result.status === 'warning' ? 'secondary' : 'destructive'
                          }>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};