import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import AIChat from "./pages/AIChat";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AgenticFrameworks from "./pages/components/AgenticFrameworks";
import MemorySystem from "./pages/components/MemorySystem";
import ToolIntegration from "./pages/components/ToolIntegration";
import ReasoningFrameworks from "./pages/components/ReasoningFrameworks";
import KnowledgeBase from "./pages/components/KnowledgeBase";
import ExecutionEngine from "./pages/components/ExecutionEngine";
import MonitoringGovernance from "./pages/components/MonitoringGovernance";
import DeploymentOrchestration from "./pages/components/DeploymentOrchestration";
import TestingValidation from "./pages/components/TestingValidation";
import PerformanceOptimization from "./pages/components/PerformanceOptimization";
import RLAgentManagement from "./pages/RLAgentManagement";
import IntelligentAgents from "./pages/IntelligentAgents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/ai-chat" 
              element={
                <ProtectedRoute>
                  <AIChat />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/components/agentic-frameworks" element={<AgenticFrameworks />} />
            <Route path="/components/memory-system" element={<MemorySystem />} />
            <Route path="/components/tool-integration" element={<ToolIntegration />} />
            <Route path="/components/reasoning-frameworks" element={<ReasoningFrameworks />} />
            <Route path="/components/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/components/execution-engine" element={<ExecutionEngine />} />
            <Route path="/components/monitoring-governance" element={<MonitoringGovernance />} />
            <Route path="/components/deployment-orchestration" element={<DeploymentOrchestration />} />
            <Route path="/components/testing-validation" element={<TestingValidation />} />
            <Route path="/components/performance-optimization" element={<PerformanceOptimization />} />
            <Route path="/rl-agent-management" element={<RLAgentManagement />} />
            <Route path="/intelligent-agents" element={<IntelligentAgents />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
