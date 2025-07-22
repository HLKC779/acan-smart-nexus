import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, Users, Zap, Shield, Monitor, MessageSquare, 
  Code, Database, Search, Lightbulb, Settings, Bot,
  Play, Pause, RotateCcw, Trash2, Plus, Edit3,
  TrendingUp, Activity, AlertTriangle, CheckCircle,
  Clock, Target, Star, Globe, Cpu
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'technical-support' | 'task-automation' | 'research' | 'creative' | 'monitoring';
  specialization: string[];
  status: 'active' | 'idle' | 'training' | 'error';
  performance: {
    accuracy: number;
    responseTime: number;
    tasksCompleted: number;
    userSatisfaction: number;
  };
  capabilities: string[];
  currentTask?: string;
  lastUpdate: Date;
  config: {
    priority: 'low' | 'medium' | 'high' | 'critical';
    autoLearn: boolean;
    maxConcurrentTasks: number;
    specializationLevel: number;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'support' | 'automation' | 'analysis' | 'research' | 'creative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'failed';
  assignedAgent?: string;
  createdAt: Date;
  completedAt?: Date;
  result?: string;
  userFeedback?: number;
}

const IntelligentAgentManager = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState<Task['type']>('support');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [systemStats, setSystemStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeAgents: 0,
    averageResponseTime: 0,
    systemEfficiency: 0
  });

  // Initialize sample agents
  useEffect(() => {
    const sampleAgents: Agent[] = [
      {
        id: 'tech-support-1',
        name: 'TechMaster Pro',
        type: 'technical-support',
        specialization: ['debugging', 'troubleshooting', 'system-diagnosis', 'performance-optimization'],
        status: 'active',
        performance: {
          accuracy: 94.2,
          responseTime: 2.1,
          tasksCompleted: 847,
          userSatisfaction: 4.7
        },
        capabilities: [
          'Code debugging and error resolution',
          'System performance analysis',
          'Database optimization',
          'API troubleshooting',
          'Security vulnerability detection'
        ],
        currentTask: 'Analyzing database performance issues',
        lastUpdate: new Date(),
        config: {
          priority: 'high',
          autoLearn: true,
          maxConcurrentTasks: 5,
          specializationLevel: 9
        }
      },
      {
        id: 'automation-1',
        name: 'TaskFlow AI',
        type: 'task-automation',
        specialization: ['workflow-automation', 'data-processing', 'integration', 'scheduling'],
        status: 'active',
        performance: {
          accuracy: 98.1,
          responseTime: 0.8,
          tasksCompleted: 1203,
          userSatisfaction: 4.9
        },
        capabilities: [
          'Automated workflow creation',
          'Data processing and transformation',
          'API integration and orchestration',
          'Scheduled task management',
          'Process optimization'
        ],
        lastUpdate: new Date(),
        config: {
          priority: 'high',
          autoLearn: true,
          maxConcurrentTasks: 10,
          specializationLevel: 8
        }
      },
      {
        id: 'research-1',
        name: 'InfoSeeker Beta',
        type: 'research',
        specialization: ['web-research', 'data-analysis', 'trend-analysis', 'competitive-intelligence'],
        status: 'active',
        performance: {
          accuracy: 91.5,
          responseTime: 3.2,
          tasksCompleted: 456,
          userSatisfaction: 4.5
        },
        capabilities: [
          'Comprehensive web research',
          'Market analysis and trends',
          'Competitive intelligence gathering',
          'Technical documentation research',
          'Data synthesis and reporting'
        ],
        currentTask: 'Researching AI framework comparisons',
        lastUpdate: new Date(),
        config: {
          priority: 'medium',
          autoLearn: true,
          maxConcurrentTasks: 3,
          specializationLevel: 7
        }
      },
      {
        id: 'creative-1',
        name: 'CreativeGenius',
        type: 'creative',
        specialization: ['content-creation', 'design-assistance', 'writing', 'brainstorming'],
        status: 'idle',
        performance: {
          accuracy: 89.3,
          responseTime: 1.9,
          tasksCompleted: 324,
          userSatisfaction: 4.6
        },
        capabilities: [
          'Creative content generation',
          'Design concept development',
          'Technical writing assistance',
          'Brainstorming and ideation',
          'Visual content planning'
        ],
        lastUpdate: new Date(),
        config: {
          priority: 'medium',
          autoLearn: true,
          maxConcurrentTasks: 4,
          specializationLevel: 8
        }
      },
      {
        id: 'monitor-1',
        name: 'SystemGuard',
        type: 'monitoring',
        specialization: ['system-monitoring', 'alert-management', 'health-checks', 'performance-tracking'],
        status: 'active',
        performance: {
          accuracy: 99.2,
          responseTime: 0.3,
          tasksCompleted: 2150,
          userSatisfaction: 4.8
        },
        capabilities: [
          'Real-time system monitoring',
          'Automated alert management',
          'Health check automation',
          'Performance metrics tracking',
          'Predictive maintenance'
        ],
        currentTask: 'Monitoring system health metrics',
        lastUpdate: new Date(),
        config: {
          priority: 'critical',
          autoLearn: true,
          maxConcurrentTasks: 15,
          specializationLevel: 9
        }
      }
    ];

    setAgents(sampleAgents);
    
    // Initialize sample tasks
    const sampleTasks: Task[] = [
      {
        id: 'task-1',
        title: 'Debug React Component Performance',
        description: 'Investigate slow rendering in UserProfile component',
        type: 'support',
        priority: 'high',
        status: 'in-progress',
        assignedAgent: 'tech-support-1',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: 'task-2',
        title: 'Automate Deployment Pipeline',
        description: 'Create automated CI/CD pipeline for production deployments',
        type: 'automation',
        priority: 'medium',
        status: 'assigned',
        assignedAgent: 'automation-1',
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: 'task-3',
        title: 'Research AI Framework Options',
        description: 'Compare TensorFlow, PyTorch, and JAX for new ML project',
        type: 'research',
        priority: 'medium',
        status: 'completed',
        assignedAgent: 'research-1',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        completedAt: new Date(Date.now() - 1000 * 60 * 30),
        result: 'Comprehensive analysis completed with recommendations',
        userFeedback: 5
      }
    ];

    setTasks(sampleTasks);
  }, []);

  // Update system stats
  useEffect(() => {
    const updateStats = () => {
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const activeAgents = agents.filter(a => a.status === 'active').length;
      const avgResponseTime = agents.reduce((sum, agent) => sum + agent.performance.responseTime, 0) / agents.length;
      const efficiency = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

      setSystemStats({
        totalTasks: tasks.length,
        completedTasks,
        activeAgents,
        averageResponseTime: avgResponseTime,
        systemEfficiency: efficiency
      });
    };

    updateStats();
  }, [agents, tasks]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        performance: {
          ...agent.performance,
          responseTime: Math.max(0.1, agent.performance.responseTime + (Math.random() - 0.5) * 0.2),
          accuracy: Math.min(100, Math.max(70, agent.performance.accuracy + (Math.random() - 0.5) * 2))
        },
        lastUpdate: new Date()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const createNewTask = () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription,
      type: newTaskType,
      priority: newTaskPriority,
      status: 'pending',
      createdAt: new Date()
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    
    // Auto-assign to best available agent
    assignTaskToAgent(newTask.id);

    toast({
      title: "Task Created",
      description: `New ${newTaskType} task created and queued for assignment`,
    });
  };

  const assignTaskToAgent = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Find best agent for task type
    const availableAgents = agents.filter(agent => 
      agent.status === 'active' || agent.status === 'idle'
    );

    // Score agents based on specialization and current load
    const agentScores = availableAgents.map(agent => {
      let score = 0;
      
      // Type matching bonus
      if (agent.type === 'technical-support' && task.type === 'support') score += 50;
      if (agent.type === 'task-automation' && task.type === 'automation') score += 50;
      if (agent.type === 'research' && task.type === 'research') score += 50;
      if (agent.type === 'creative' && task.type === 'creative') score += 50;
      
      // Performance bonus
      score += agent.performance.accuracy * 0.3;
      score += (100 - agent.performance.responseTime) * 0.2;
      
      // Current load penalty
      const currentTasks = tasks.filter(t => t.assignedAgent === agent.id && t.status === 'in-progress').length;
      score -= currentTasks * 10;

      return { agent, score };
    });

    const bestAgent = agentScores.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    if (bestAgent.agent) {
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'assigned', assignedAgent: bestAgent.agent.id }
          : t
      ));

      setAgents(prev => prev.map(agent =>
        agent.id === bestAgent.agent.id
          ? { ...agent, currentTask: task.title, status: 'active' }
          : agent
      ));

      toast({
        title: "Task Assigned",
        description: `Task assigned to ${bestAgent.agent.name}`,
      });
    }
  };

  const startTask = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId && t.status === 'assigned'
        ? { ...t, status: 'in-progress' }
        : t
    ));
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prev => prev.map(t => 
      t.id === taskId
        ? { ...t, status: 'completed', completedAt: new Date(), result: 'Task completed successfully' }
        : t
    ));

    if (task.assignedAgent) {
      setAgents(prev => prev.map(agent =>
        agent.id === task.assignedAgent
          ? { 
              ...agent, 
              currentTask: undefined, 
              status: 'idle',
              performance: {
                ...agent.performance,
                tasksCompleted: agent.performance.tasksCompleted + 1
              }
            }
          : agent
      ));
    }

    toast({
      title: "Task Completed",
      description: `${task.title} has been completed successfully`,
    });
  };

  const getStatusColor = (status: Agent['status'] | Task['status']) => {
    switch (status) {
      case 'active':
      case 'in-progress':
        return 'default';
      case 'idle':
      case 'pending':
        return 'secondary';
      case 'training':
      case 'assigned':
        return 'outline';
      case 'error':
      case 'failed':
        return 'destructive';
      case 'completed':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Active Agents</span>
            </div>
            <p className="text-2xl font-bold">{systemStats.activeAgents}</p>
            <p className="text-xs text-muted-foreground">of {agents.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Tasks Completed</span>
            </div>
            <p className="text-2xl font-bold">{systemStats.completedTasks}</p>
            <p className="text-xs text-muted-foreground">of {systemStats.totalTasks} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Avg Response</span>
            </div>
            <p className="text-2xl font-bold">{systemStats.averageResponseTime.toFixed(1)}s</p>
            <p className="text-xs text-muted-foreground">system wide</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Efficiency</span>
            </div>
            <p className="text-2xl font-bold">{systemStats.systemEfficiency.toFixed(1)}%</p>
            <Progress value={systemStats.systemEfficiency} className="h-1 mt-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">System Health</span>
            </div>
            <p className="text-2xl font-bold text-green-600">98.7%</p>
            <p className="text-xs text-muted-foreground">operational</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Agent Management</TabsTrigger>
          <TabsTrigger value="tasks">Task Queue</TabsTrigger>
          <TabsTrigger value="create">Create Task</TabsTrigger>
        </TabsList>

        {/* Agent Management */}
        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Intelligent Agent Network
              </CardTitle>
              <CardDescription>
                Manage your specialized AI agents for technical support and task automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {agent.type === 'technical-support' && <Shield className="w-4 h-4 text-blue-500" />}
                            {agent.type === 'task-automation' && <Zap className="w-4 h-4 text-green-500" />}
                            {agent.type === 'research' && <Search className="w-4 h-4 text-purple-500" />}
                            {agent.type === 'creative' && <Lightbulb className="w-4 h-4 text-yellow-500" />}
                            {agent.type === 'monitoring' && <Monitor className="w-4 h-4 text-red-500" />}
                            {agent.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                            <Badge variant={getPriorityColor(agent.config.priority)}>
                              {agent.config.priority} priority
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current Task */}
                      {agent.currentTask && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm font-medium">Current Task</p>
                          <p className="text-sm text-muted-foreground">{agent.currentTask}</p>
                        </div>
                      )}

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span>{agent.performance.accuracy.toFixed(1)}%</span>
                          </div>
                          <Progress value={agent.performance.accuracy} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Response Time</span>
                            <span>{agent.performance.responseTime.toFixed(1)}s</span>
                          </div>
                          <Progress value={(5 - agent.performance.responseTime) * 20} className="h-2" />
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Tasks Completed:</span>
                        <span className="font-medium">{agent.performance.tasksCompleted.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>User Satisfaction:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{agent.performance.userSatisfaction.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div>
                        <p className="text-sm font-medium mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialization.map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Agent Configuration Panel */}
                      {selectedAgent === agent.id && (
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`auto-learn-${agent.id}`}>Auto Learning</Label>
                            <Switch
                              id={`auto-learn-${agent.id}`}
                              checked={agent.config.autoLearn}
                              onCheckedChange={(checked) => {
                                setAgents(prev => prev.map(a => 
                                  a.id === agent.id 
                                    ? { ...a, config: { ...a.config, autoLearn: checked } }
                                    : a
                                ));
                              }}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`max-tasks-${agent.id}`}>Max Concurrent Tasks</Label>
                            <Input
                              id={`max-tasks-${agent.id}`}
                              type="number"
                              min="1"
                              max="20"
                              value={agent.config.maxConcurrentTasks}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                setAgents(prev => prev.map(a => 
                                  a.id === agent.id 
                                    ? { ...a, config: { ...a.config, maxConcurrentTasks: value } }
                                    : a
                                ));
                              }}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label>Specialization Level: {agent.config.specializationLevel}/10</Label>
                            <Progress value={agent.config.specializationLevel * 10} className="h-2 mt-1" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Task Queue */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Task Management Queue
              </CardTitle>
              <CardDescription>
                Monitor and manage tasks across all intelligent agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => {
                  const assignedAgent = agents.find(a => a.id === task.assignedAgent);
                  
                  return (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{task.title}</h3>
                              <Badge variant={getStatusColor(task.status)}>
                                {task.status.replace('-', ' ')}
                              </Badge>
                              <Badge variant={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {task.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Created {task.createdAt.toLocaleTimeString()}</span>
                              </div>
                              
                              {assignedAgent && (
                                <div className="flex items-center gap-1">
                                  <Bot className="w-3 h-3" />
                                  <span>Assigned to {assignedAgent.name}</span>
                                </div>
                              )}

                              {task.completedAt && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span>Completed {task.completedAt.toLocaleTimeString()}</span>
                                </div>
                              )}
                            </div>

                            {task.result && (
                              <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                                <strong>Result:</strong> {task.result}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {task.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => assignTaskToAgent(task.id)}
                              >
                                Assign
                              </Button>
                            )}
                            
                            {task.status === 'assigned' && (
                              <Button 
                                size="sm" 
                                onClick={() => startTask(task.id)}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            )}
                            
                            {task.status === 'in-progress' && (
                              <Button 
                                size="sm" 
                                onClick={() => completeTask(task.id)}
                                variant="default"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Complete
                              </Button>
                            )}

                            {task.userFeedback && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{task.userFeedback}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Task */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Task
              </CardTitle>
              <CardDescription>
                Create tasks for your intelligent agents to handle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Describe what needs to be done..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-type">Task Type</Label>
                  <Select value={newTaskType} onValueChange={(value: Task['type']) => setNewTaskType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="automation">Task Automation</SelectItem>
                      <SelectItem value="analysis">Data Analysis</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="creative">Creative Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="task-priority">Priority Level</Label>
                  <Select value={newTaskPriority} onValueChange={(value: Task['priority']) => setNewTaskPriority(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={createNewTask} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Task Templates</CardTitle>
              <CardDescription>
                Use predefined templates for common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Debug Performance Issue",
                    description: "Investigate and resolve application performance problems",
                    type: "support" as Task['type'],
                    priority: "high" as Task['priority']
                  },
                  {
                    title: "Automate Data Processing",
                    description: "Create automated workflow for data transformation and validation",
                    type: "automation" as Task['type'],
                    priority: "medium" as Task['priority']
                  },
                  {
                    title: "Research Competition",
                    description: "Analyze competitor products and market positioning",
                    type: "research" as Task['type'],
                    priority: "medium" as Task['priority']
                  },
                  {
                    title: "Generate Technical Content",
                    description: "Create documentation and technical content",
                    type: "creative" as Task['type'],
                    priority: "low" as Task['priority']
                  }
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left"
                    onClick={() => {
                      setNewTaskTitle(template.title);
                      setNewTaskDescription(template.description);
                      setNewTaskType(template.type);
                      setNewTaskPriority(template.priority);
                    }}
                  >
                    <div>
                      <div className="font-medium">{template.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                        <Badge variant={getPriorityColor(template.priority)} className="text-xs">
                          {template.priority}
                        </Badge>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligentAgentManager;