import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Brain, TrendingUp, Settings, Activity, Users, Database, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom node components for different RL system parts
const FeedbackAggregatorNode = ({ data }: { data: any }) => (
  <div className="bg-card border-2 border-primary/20 rounded-lg p-3 min-w-[200px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Activity className="w-4 h-4 text-primary" />
      <span className="font-semibold text-sm">Feedback Aggregator</span>
    </div>
    <div className="text-xs text-muted-foreground">
      Sources: {data.sources || 4}
    </div>
    <div className="text-xs text-muted-foreground">
      Weight: {data.weight || '0.85'}
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const PolicyManagerNode = ({ data }: { data: any }) => (
  <div className="bg-card border-2 border-blue-500/20 rounded-lg p-3 min-w-[200px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Settings className="w-4 h-4 text-blue-500" />
      <span className="font-semibold text-sm">Policy Manager</span>
    </div>
    <div className="text-xs text-muted-foreground">
      Updates: {data.updates || 'Safe Mode'}
    </div>
    <div className="text-xs text-muted-foreground">
      Rate: {data.rate || '0.001'}
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const AgentNode = ({ data }: { data: any }) => (
  <div className="bg-card border-2 border-green-500/20 rounded-lg p-3 min-w-[180px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Brain className="w-4 h-4 text-green-500" />
      <span className="font-semibold text-sm">{data.name}</span>
    </div>
    <div className="text-xs text-muted-foreground">
      Performance: {data.performance || '94%'}
    </div>
    <div className="text-xs text-muted-foreground">
      Episodes: {data.episodes || '1,247'}
    </div>
  </div>
);

const DataSourceNode = ({ data }: { data: any }) => (
  <div className="bg-card border-2 border-purple-500/20 rounded-lg p-3 min-w-[160px]">
    <div className="flex items-center gap-2 mb-2">
      <Database className="w-4 h-4 text-purple-500" />
      <span className="font-semibold text-sm">{data.name}</span>
    </div>
    <div className="text-xs text-muted-foreground">
      Rate: {data.rate || '100ms'}
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const nodeTypes = {
  feedbackAggregator: FeedbackAggregatorNode,
  policyManager: PolicyManagerNode,
  agent: AgentNode,
  dataSource: DataSourceNode,
};

const initialNodes: Node[] = [
  {
    id: 'user-feedback',
    type: 'dataSource',
    position: { x: 50, y: 50 },
    data: { name: 'User Interactions', rate: '10Hz' },
  },
  {
    id: 'performance-metrics',
    type: 'dataSource',
    position: { x: 250, y: 50 },
    data: { name: 'Performance Metrics', rate: '1Hz' },
  },
  {
    id: 'external-data',
    type: 'dataSource',
    position: { x: 450, y: 50 },
    data: { name: 'External Data', rate: '0.1Hz' },
  },
  {
    id: 'peer-evals',
    type: 'dataSource',
    position: { x: 650, y: 50 },
    data: { name: 'Peer Evaluations', rate: '0.01Hz' },
  },
  {
    id: 'feedback-aggregator',
    type: 'feedbackAggregator',
    position: { x: 300, y: 200 },
    data: { sources: 4, weight: '0.85' },
  },
  {
    id: 'policy-manager',
    type: 'policyManager',
    position: { x: 300, y: 350 },
    data: { updates: 'Safe Mode', rate: '0.001' },
  },
  {
    id: 'agent-1',
    type: 'agent',
    position: { x: 100, y: 500 },
    data: { name: 'Navigation Agent', performance: '94%', episodes: '1,247' },
  },
  {
    id: 'agent-2',
    type: 'agent',
    position: { x: 300, y: 500 },
    data: { name: 'Recommendation Agent', performance: '89%', episodes: '2,156' },
  },
  {
    id: 'agent-3',
    type: 'agent',
    position: { x: 500, y: 500 },
    data: { name: 'Optimization Agent', performance: '91%', episodes: '987' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'user-feedback',
    target: 'feedback-aggregator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2',
    source: 'performance-metrics',
    target: 'feedback-aggregator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e3',
    source: 'external-data',
    target: 'feedback-aggregator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e4',
    source: 'peer-evals',
    target: 'feedback-aggregator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e5',
    source: 'feedback-aggregator',
    target: 'policy-manager',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e6',
    source: 'policy-manager',
    target: 'agent-1',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e7',
    source: 'policy-manager',
    target: 'agent-2',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e8',
    source: 'policy-manager',
    target: 'agent-3',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const RLAgentManagement = () => {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  // Real-time metrics simulation
  const [metrics, setMetrics] = useState({
    totalReward: 1247.5,
    episodeCount: 5643,
    learningRate: 0.001,
    explorationRate: 0.15,
    convergenceScore: 0.87,
  });

  const [feedbackSources, setFeedbackSources] = useState([
    { name: 'User Clicks', value: 89, trend: 'up' },
    { name: 'Task Completion', value: 94, trend: 'up' },
    { name: 'Response Time', value: 76, trend: 'down' },
    { name: 'Resource Usage', value: 82, trend: 'stable' },
  ]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalReward: prev.totalReward + Math.random() * 10 - 5,
        episodeCount: prev.episodeCount + Math.floor(Math.random() * 3),
        convergenceScore: Math.min(0.99, prev.convergenceScore + Math.random() * 0.01 - 0.005),
      }));

      setFeedbackSources(prev => 
        prev.map(source => ({
          ...source,
          value: Math.max(0, Math.min(100, source.value + Math.random() * 6 - 3)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartTraining = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  RL Agent Management
                </h1>
                <p className="text-muted-foreground">Multi-Source Feedback & Self-Improving Systems</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isTraining ? "default" : "secondary"}>
                {isTraining ? "Training Active" : "Monitoring"}
              </Badge>
              <Button 
                onClick={handleStartTraining} 
                disabled={isTraining}
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                {isTraining ? "Training..." : "Start Training"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="architecture" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">System Architecture</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Sources</TabsTrigger>
            <TabsTrigger value="agents">Agent Management</TabsTrigger>
          </TabsList>

          {/* System Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Source RL Feedback Architecture</CardTitle>
                <CardDescription>
                  Interactive visualization of the reinforcement learning system with multi-source feedback loops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] border rounded-lg bg-background">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="top-right"
                  >
                    <Background color="hsl(var(--muted-foreground))" />
                    <Controls className="[&>button]:bg-card [&>button]:border-border [&>button]:text-foreground" />
                    <MiniMap 
                      className="bg-card border border-border"
                      maskColor="hsl(var(--background) / 0.6)"
                      nodeColor="hsl(var(--primary))"
                      nodeStrokeColor="hsl(var(--border))"
                      nodeBorderRadius={4}
                    />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Feedback Aggregation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{metrics.convergenceScore.toFixed(3)}</p>
                    <p className="text-xs text-muted-foreground">Convergence Score</p>
                    <Progress value={metrics.convergenceScore * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Policy Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{metrics.learningRate.toFixed(4)}</p>
                    <p className="text-xs text-muted-foreground">Learning Rate</p>
                    <Badge variant="outline" className="text-xs">Adaptive</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Experience Replay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{metrics.episodeCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Episodes</p>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Performance Monitor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{metrics.totalReward.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Cumulative Reward</p>
                    <Badge variant="default" className="text-xs">Improving</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Performance</CardTitle>
                  <CardDescription>Live metrics from active RL agents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Reward</span>
                      <span className="font-medium">{metrics.totalReward.toFixed(2)}</span>
                    </div>
                    <Progress value={(metrics.totalReward / 2000) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Exploration Rate</span>
                      <span className="font-medium">{(metrics.explorationRate * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.explorationRate * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Convergence</span>
                      <span className="font-medium">{(metrics.convergenceScore * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.convergenceScore * 100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Self-Improvement Metrics</CardTitle>
                  <CardDescription>Continuous learning indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">+12.3%</p>
                      <p className="text-xs text-muted-foreground">Performance Gain</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">247</p>
                      <p className="text-xs text-muted-foreground">Policy Updates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">94.2%</p>
                      <p className="text-xs text-muted-foreground">Task Success</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">0.8s</p>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Sources Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Source Feedback</CardTitle>
                  <CardDescription>Real-time feedback from various sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedbackSources.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{source.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{source.value.toFixed(1)}%</span>
                            <Badge 
                              variant={source.trend === 'up' ? 'default' : source.trend === 'down' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {source.trend === 'up' ? '↑' : source.trend === 'down' ? '↓' : '→'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={source.value} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Processing</CardTitle>
                  <CardDescription>How feedback sources are weighted and processed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">User Interactions</span>
                      <span className="text-sm font-medium">40% weight</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Performance Metrics</span>
                      <span className="text-sm font-medium">30% weight</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">External Data</span>
                      <span className="text-sm font-medium">20% weight</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peer Evaluations</span>
                      <span className="text-sm font-medium">10% weight</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Processing Rate</span>
                      <span className="text-sm">127 samples/sec</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agent Management Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'navigation', name: 'Navigation Agent', performance: 94, status: 'active' },
                { id: 'recommendation', name: 'Recommendation Agent', performance: 89, status: 'training' },
                { id: 'optimization', name: 'Optimization Agent', performance: 91, status: 'active' },
              ].map((agent) => (
                <Card key={agent.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Performance</span>
                          <span>{agent.performance}%</span>
                        </div>
                        <Progress value={agent.performance} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Episodes</p>
                          <p className="font-medium">1,247</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Reward</p>
                          <p className="font-medium">+24.3</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedAgent(agent.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Agent Details Modal */}
        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                {selectedAgent && [
                  { id: 'navigation', name: 'Navigation Agent', performance: 94, status: 'active' },
                  { id: 'recommendation', name: 'Recommendation Agent', performance: 89, status: 'training' },
                  { id: 'optimization', name: 'Optimization Agent', performance: 91, status: 'active' },
                ].find(agent => agent.id === selectedAgent)?.name} Details
              </DialogTitle>
              <DialogDescription>
                Detailed performance metrics and configuration for this RL agent
              </DialogDescription>
            </DialogHeader>
            
            {selectedAgent && (
              <div className="space-y-6">
                {/* Performance Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Current Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {[
                          { id: 'navigation', performance: 94 },
                          { id: 'recommendation', performance: 89 },
                          { id: 'optimization', performance: 91 },
                        ].find(agent => agent.id === selectedAgent)?.performance}%
                      </div>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Training Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <p className="text-xs text-muted-foreground">Episodes Completed</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Reward</span>
                        <span className="font-medium">+24.3</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Learning Rate</span>
                        <span className="font-medium">0.001</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exploration Rate</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Last Policy Update</span>
                        <span className="text-muted-foreground">2 minutes ago</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Last Training Session</span>
                        <span className="text-muted-foreground">15 minutes ago</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Next Scheduled Training</span>
                        <span className="text-muted-foreground">In 45 minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RLAgentManagement;