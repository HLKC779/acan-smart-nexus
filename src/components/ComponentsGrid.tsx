import ComponentCard from "./ComponentCard";
import { 
  Network, 
  Wrench, 
  Brain, 
  Lightbulb, 
  Database, 
  Zap, 
  Shield, 
  Cloud, 
  MessageSquare, 
  Workflow 
} from "lucide-react";

const componentsData = [
  {
    title: "Agentic Frameworks",
    description: "Foundational frameworks for building and orchestrating intelligent AI agents with specialized roles and capabilities.",
    features: ["LangGraph", "CrewAI", "Autogen", "MetaGPT", "LlamaIndex"],
    icon: Network,
    color: "blue" as const
  },
  {
    title: "Tool Integration",
    description: "Seamless connection with external APIs, databases, and services through structured function calling and tool chaining.",
    features: ["Third-party APIs", "OpenAI Functions", "MCP", "Tool Calling"],
    icon: Wrench,
    color: "cyan" as const
  },
  {
    title: "Memory System",
    description: "Advanced memory architecture combining short-term, long-term, and contextual memory for persistent learning.",
    features: ["Short-Term", "Long-Term", "Hybrid Memory", "Context Recall"],
    icon: Brain,
    color: "purple" as const
  },
  {
    title: "Reasoning Frameworks",
    description: "Sophisticated reasoning approaches for structured problem-solving and decision-making capabilities.",
    features: ["ReAct", "Reflexion", "Plan-and-Solve", "Tree of Thought"],
    icon: Lightbulb,
    color: "green" as const
  },
  {
    title: "Knowledge Base",
    description: "Scalable knowledge storage and retrieval using vector databases and knowledge graphs for intelligent information access.",
    features: ["Vector DBs", "Knowledge Graphs", "Hybrid Search", "Pinecone", "Neo4j"],
    icon: Database,
    color: "orange" as const
  },
  {
    title: "Execution Engine",
    description: "Robust task execution with error handling, retries, and performance optimization for reliable agent operations.",
    features: ["Task Control", "Retries", "Async Ops", "Optimization"],
    icon: Zap,
    color: "blue" as const
  },
  {
    title: "Monitoring & Governance",
    description: "Complete observability with token tracking, behavior monitoring, and compliance controls for enterprise deployment.",
    features: ["Token Tracking", "Behavior Monitoring", "Compliance", "Helicone"],
    icon: Shield,
    color: "cyan" as const
  },
  {
    title: "Deployment",
    description: "Flexible deployment options with containerization, orchestration, and automated CI/CD for scalable operations.",
    features: ["Docker", "Kubernetes", "CI/CD", "Edge Deployment"],
    icon: Cloud,
    color: "purple" as const
  },
  {
    title: "User Interface",
    description: "Multi-modal user interaction through chat interfaces, integrations, and management dashboards.",
    features: ["Chat UI", "Slack", "Dashboards", "Multi-Modal"],
    icon: MessageSquare,
    color: "green" as const
  },
  {
    title: "Flow Builders",
    description: "Visual workflow design tools enabling rapid agent development through no-code and low-code platforms.",
    features: ["LangFlow", "Flowise", "Visual Design", "No-Code"],
    icon: Workflow,
    color: "orange" as const
  }
];

const ComponentsGrid = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6">
            <span className="text-foreground">System</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Components
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Essential building blocks for creating intelligent, scalable AI agent systems 
            with enterprise-grade capabilities and performance
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {componentsData.map((component, index) => (
            <div
              key={component.title}
              className="animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <ComponentCard {...component} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentsGrid;