import { LucideIcon } from "lucide-react";
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

export interface ComponentData {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  color: 'blue' | 'cyan' | 'purple' | 'green' | 'orange';
  detailedDescription: string;
  useCases: string[];
  codeExample: string;
  architecture: {
    input: string;
    processing: string;
    output: string;
  };
  integrations: string[];
  benefits: string[];
  gettingStarted: {
    step: string;
    description: string;
  }[];
}

export const componentsData: ComponentData[] = [
  {
    id: 'agentic-frameworks',
    title: "Agentic Frameworks",
    description: "Foundational frameworks for building and orchestrating intelligent AI agents with specialized roles and capabilities.",
    features: ["LangGraph", "CrewAI", "Autogen", "MetaGPT", "LlamaIndex"],
    icon: Network,
    color: "blue",
    detailedDescription: "Agentic frameworks provide the foundational infrastructure for building, coordinating, and managing multiple AI agents. These frameworks enable complex task decomposition, role assignment, and collaborative problem-solving across distributed agent networks.",
    useCases: [
      "Multi-agent customer service systems",
      "Collaborative research and analysis",
      "Distributed content creation",
      "Complex workflow automation",
      "Enterprise decision support systems"
    ],
    codeExample: `# LangGraph Example
from langgraph import StateGraph, END

def research_agent(state):
    # Research task implementation
    return {"research_data": "findings"}

def analysis_agent(state):
    # Analysis task implementation 
    return {"analysis": "insights"}

workflow = StateGraph()
workflow.add_node("researcher", research_agent)
workflow.add_node("analyzer", analysis_agent)
workflow.add_edge("researcher", "analyzer")
workflow.add_edge("analyzer", END)`,
    architecture: {
      input: "Task requirements and specifications",
      processing: "Agent coordination, task distribution, and result aggregation",
      output: "Completed tasks and collaborative insights"
    },
    integrations: ["OpenAI GPT", "Anthropic Claude", "Google Gemini", "Custom LLMs"],
    benefits: [
      "Scalable agent coordination",
      "Specialized role assignments", 
      "Parallel task processing",
      "Fault-tolerant execution",
      "Dynamic workflow adaptation"
    ],
    gettingStarted: [
      {
        step: "Install Framework",
        description: "Choose and install your preferred agentic framework (LangGraph, CrewAI, etc.)"
      },
      {
        step: "Define Agent Roles",
        description: "Create specialized agents with specific roles and capabilities"
      },
      {
        step: "Set Up Coordination",
        description: "Configure agent communication and task distribution mechanisms"
      },
      {
        step: "Implement Workflows",
        description: "Design and implement collaborative workflows for your use case"
      }
    ]
  },
  {
    id: 'tool-integration',
    title: "Tool Integration",
    description: "Seamless connection with external APIs, databases, and services through structured function calling and tool chaining.",
    features: ["Third-party APIs", "OpenAI Functions", "MCP", "Tool Calling"],
    icon: Wrench,
    color: "cyan",
    detailedDescription: "Tool integration enables AI agents to interact with external systems, APIs, and services. This component provides structured interfaces for function calling, API integration, and tool chaining to extend agent capabilities beyond their base models.",
    useCases: [
      "Database query automation",
      "API-driven data collection",
      "External service integration",
      "Real-time data processing",
      "Third-party platform connectivity"
    ],
    codeExample: `# OpenAI Function Calling Example
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get weather information",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"}
                },
                "required": ["location"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)`,
    architecture: {
      input: "Function schemas and API specifications",
      processing: "Function calling, parameter validation, and response handling",
      output: "Structured data and API responses"
    },
    integrations: ["REST APIs", "GraphQL", "Databases", "Web Services", "Cloud Platforms"],
    benefits: [
      "Extended functionality",
      "Real-world data access",
      "Structured tool usage",
      "Error handling",
      "Performance optimization"
    ],
    gettingStarted: [
      {
        step: "Define Tools",
        description: "Create function schemas for your APIs and tools"
      },
      {
        step: "Implement Handlers",
        description: "Build handlers for processing tool calls and responses"
      },
      {
        step: "Configure Authentication",
        description: "Set up secure authentication for external services"
      },
      {
        step: "Test Integration",
        description: "Validate tool functionality with comprehensive testing"
      }
    ]
  },
  {
    id: 'memory-system',
    title: "Memory System",
    description: "Advanced memory architecture combining short-term, long-term, and contextual memory for persistent learning.",
    features: ["Short-Term", "Long-Term", "Hybrid Memory", "Context Recall"],
    icon: Brain,
    color: "purple",
    detailedDescription: "The memory system provides persistent storage and retrieval capabilities for AI agents. It combines multiple memory types including episodic, semantic, and working memory to enable continuous learning and context retention across sessions.",
    useCases: [
      "Personalized user interactions",
      "Learning from conversations",
      "Context-aware responses",
      "Knowledge accumulation",
      "Experience-based decisions"
    ],
    codeExample: `# MemGPT Memory Example
from memgpt import MemGPT

agent = MemGPT(
    memory_config={
        "core_memory_limit": 2048,
        "recall_memory_limit": 8192,
        "archival_memory": True
    }
)

# Store important information
agent.core_memory.edit(
    "user_preferences", 
    "User prefers technical explanations"
)

# Retrieve relevant memories
memories = agent.recall_memory.search(
    "previous discussions about AI"
)`,
    architecture: {
      input: "Conversation data and contextual information",
      processing: "Memory encoding, storage, and retrieval mechanisms",
      output: "Relevant context and learned patterns"
    },
    integrations: ["Vector Databases", "Graph Databases", "Embeddings", "Knowledge Graphs"],
    benefits: [
      "Persistent learning",
      "Context retention",
      "Personalized responses",
      "Knowledge accumulation",
      "Improved reasoning"
    ],
    gettingStarted: [
      {
        step: "Choose Memory Backend",
        description: "Select appropriate storage solutions (vector DB, graph DB, etc.)"
      },
      {
        step: "Configure Memory Types",
        description: "Set up short-term, long-term, and working memory systems"
      },
      {
        step: "Implement Encoding",
        description: "Create mechanisms for encoding and storing information"
      },
      {
        step: "Build Retrieval",
        description: "Develop efficient retrieval and ranking algorithms"
      }
    ]
  },
  {
    id: 'reasoning-frameworks',
    title: "Reasoning Frameworks",
    description: "Sophisticated reasoning approaches for structured problem-solving and decision-making capabilities.",
    features: ["ReAct", "Reflexion", "Plan-and-Solve", "Tree of Thought"],
    icon: Lightbulb,
    color: "green",
    detailedDescription: "Reasoning frameworks provide structured approaches to problem-solving and decision-making. These frameworks enable agents to think step-by-step, reflect on their actions, and explore multiple solution paths for complex tasks.",
    useCases: [
      "Complex problem solving",
      "Strategic planning",
      "Decision optimization",
      "Multi-step reasoning",
      "Error correction and learning"
    ],
    codeExample: `# ReAct Framework Example
def react_agent(question):
    thought = f"I need to solve: {question}"
    
    # Reasoning step
    action = "search"
    observation = search_tool(question)
    
    # Reflection step  
    thought = f"Based on {observation}, I should..."
    action = "calculate"
    result = calculate_tool(observation)
    
    return {
        "thought": thought,
        "action": action, 
        "result": result
    }`,
    architecture: {
      input: "Problems and decision scenarios",
      processing: "Structured reasoning, reflection, and planning",
      output: "Reasoned solutions and decision paths"
    },
    integrations: ["LLMs", "Knowledge Bases", "Planning Algorithms", "Validation Systems"],
    benefits: [
      "Structured thinking",
      "Self-improvement",
      "Strategic planning",
      "Error correction",
      "Transparent reasoning"
    ],
    gettingStarted: [
      {
        step: "Select Framework",
        description: "Choose the appropriate reasoning framework for your use case"
      },
      {
        step: "Define Problem Types",
        description: "Categorize the types of problems your agents will solve"
      },
      {
        step: "Implement Reasoning Loop",
        description: "Create the think-act-observe cycle for your agents"
      },
      {
        step: "Add Reflection",
        description: "Implement self-reflection and improvement mechanisms"
      }
    ]
  },
  {
    id: 'knowledge-base',
    title: "Knowledge Base",
    description: "Scalable knowledge storage and retrieval using vector databases and knowledge graphs for intelligent information access.",
    features: ["Vector DBs", "Knowledge Graphs", "Hybrid Search", "Pinecone", "Neo4j"],
    icon: Database,
    color: "orange",
    detailedDescription: "The knowledge base component provides intelligent storage and retrieval of information using advanced techniques like vector embeddings and graph relationships. It enables semantic search, relationship discovery, and contextual information access.",
    useCases: [
      "Semantic search systems",
      "Knowledge discovery",
      "Document intelligence",
      "Relationship mapping",
      "Information synthesis"
    ],
    codeExample: `# Vector Database Example
import pinecone
from sentence_transformers import SentenceTransformer

# Initialize embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Create embeddings
text = "AI agent systems architecture"
embedding = model.encode([text])

# Store in vector database
index.upsert([
    ("doc_1", embedding[0].tolist(), {"text": text})
])

# Semantic search
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)`,
    architecture: {
      input: "Documents, data, and knowledge sources",
      processing: "Embedding generation, indexing, and semantic search",
      output: "Relevant information and relationships"
    },
    integrations: ["Pinecone", "Weaviate", "Chroma", "Neo4j", "Azure Cognitive Search"],
    benefits: [
      "Semantic search",
      "Scalable storage",
      "Fast retrieval",
      "Relationship discovery",
      "Context awareness"
    ],
    gettingStarted: [
      {
        step: "Choose Storage Solution",
        description: "Select vector database and/or graph database for your needs"
      },
      {
        step: "Design Schema",
        description: "Define data structure and relationship models"
      },
      {
        step: "Implement Indexing",
        description: "Set up embedding generation and indexing pipeline"
      },
      {
        step: "Build Search Interface",
        description: "Create search and retrieval functionality"
      }
    ]
  },
  {
    id: 'execution-engine',
    title: "Execution Engine",
    description: "Robust task execution with error handling, retries, and performance optimization for reliable agent operations.",
    features: ["Task Control", "Retries", "Async Ops", "Optimization"],
    icon: Zap,
    color: "blue",
    detailedDescription: "The execution engine manages task execution, error handling, and performance optimization. It provides reliable execution guarantees, automatic retries, parallel processing, and resource optimization for agent operations.",
    useCases: [
      "Workflow automation",
      "Batch processing",
      "Real-time task execution",
      "Error recovery",
      "Performance optimization"
    ],
    codeExample: `# Execution Engine Example
import asyncio
from tenacity import retry, stop_after_attempt

class ExecutionEngine:
    @retry(stop=stop_after_attempt(3))
    async def execute_task(self, task):
        try:
            result = await self.process_task(task)
            return result
        except Exception as e:
            self.log_error(e)
            raise
    
    async def execute_parallel(self, tasks):
        results = await asyncio.gather(
            *[self.execute_task(task) for task in tasks],
            return_exceptions=True
        )
        return results`,
    architecture: {
      input: "Task queues and execution requests",
      processing: "Task scheduling, execution, and error handling",
      output: "Completed tasks and execution results"
    },
    integrations: ["Celery", "Redis", "RabbitMQ", "Kubernetes", "Docker"],
    benefits: [
      "Reliable execution",
      "Error resilience",
      "Performance optimization",
      "Scalable processing",
      "Resource management"
    ],
    gettingStarted: [
      {
        step: "Design Task Model",
        description: "Define task structure and execution requirements"
      },
      {
        step: "Implement Scheduler",
        description: "Build task scheduling and queuing mechanisms"
      },
      {
        step: "Add Error Handling",
        description: "Implement retry logic and error recovery"
      },
      {
        step: "Optimize Performance",
        description: "Add performance monitoring and optimization"
      }
    ]
  },
  {
    id: 'monitoring-governance',
    title: "Monitoring & Governance",
    description: "Complete observability with token tracking, behavior monitoring, and compliance controls for enterprise deployment.",
    features: ["Token Tracking", "Behavior Monitoring", "Compliance", "Helicone"],
    icon: Shield,
    color: "cyan",
    detailedDescription: "Monitoring and governance provides comprehensive oversight of AI agent operations. It includes usage tracking, behavior analysis, compliance monitoring, and security controls for enterprise-grade deployments.",
    useCases: [
      "Usage analytics",
      "Compliance monitoring",
      "Performance tracking",
      "Security auditing",
      "Cost optimization"
    ],
    codeExample: `# Monitoring Example
from helicone import Helicone

# Initialize monitoring
helicone = Helicone(api_key="your_key")

@helicone.monitor
def ai_agent_call(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        metadata={
            "user_id": "user123",
            "session_id": "session456"
        }
    )
    return response

# Track metrics
helicone.log_metrics({
    "tokens_used": 150,
    "response_time": 2.3,
    "cost": 0.003
})`,
    architecture: {
      input: "Agent operations and system events",
      processing: "Metrics collection, analysis, and alerting",
      output: "Dashboards, reports, and compliance data"
    },
    integrations: ["Helicone", "LangFuse", "Datadog", "Prometheus", "Grafana"],
    benefits: [
      "Complete visibility",
      "Compliance assurance",
      "Performance insights",
      "Cost control",
      "Security monitoring"
    ],
    gettingStarted: [
      {
        step: "Set Up Monitoring",
        description: "Configure monitoring tools and data collection"
      },
      {
        step: "Define Metrics",
        description: "Establish key performance indicators and compliance metrics"
      },
      {
        step: "Create Dashboards",
        description: "Build visualization and reporting dashboards"
      },
      {
        step: "Configure Alerts",
        description: "Set up alerting for critical events and thresholds"
      }
    ]
  },
  {
    id: 'deployment',
    title: "Deployment",
    description: "Flexible deployment options with containerization, orchestration, and automated CI/CD for scalable operations.",
    features: ["Docker", "Kubernetes", "CI/CD", "Edge Deployment"],
    icon: Cloud,
    color: "purple",
    detailedDescription: "The deployment component provides comprehensive infrastructure management for AI agent systems. It includes containerization, orchestration, automated deployments, and scalable infrastructure for production environments.",
    useCases: [
      "Production deployments",
      "Auto-scaling systems",
      "Multi-environment management",
      "Edge computing",
      "Global distribution"
    ],
    codeExample: `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-agent-system
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-agent
  template:
    metadata:
      labels:
        app: ai-agent
    spec:
      containers:
      - name: agent
        image: ai-agent:latest
        ports:
        - containerPort: 8080
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: openai-key`,
    architecture: {
      input: "Application code and deployment configurations",
      processing: "Build, test, and deployment automation",
      output: "Running applications and infrastructure"
    },
    integrations: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "GitHub Actions"],
    benefits: [
      "Scalable infrastructure",
      "Automated deployments",
      "Environment consistency",
      "High availability",
      "Global reach"
    ],
    gettingStarted: [
      {
        step: "Containerize Applications",
        description: "Create Docker containers for your AI agent components"
      },
      {
        step: "Set Up Orchestration",
        description: "Configure Kubernetes or container orchestration"
      },
      {
        step: "Implement CI/CD",
        description: "Build automated deployment pipelines"
      },
      {
        step: "Configure Monitoring",
        description: "Set up production monitoring and alerting"
      }
    ]
  },
  {
    id: 'user-interface',
    title: "User Interface",
    description: "Multi-modal user interaction through chat interfaces, integrations, and management dashboards.",
    features: ["Chat UI", "Slack", "Dashboards", "Multi-Modal"],
    icon: MessageSquare,
    color: "green",
    detailedDescription: "The user interface component provides multiple ways for users to interact with AI agent systems. It includes chat interfaces, platform integrations, administrative dashboards, and multi-modal interaction capabilities.",
    useCases: [
      "Customer service chat",
      "Team collaboration tools",
      "Administrative dashboards",
      "Mobile applications",
      "Voice interfaces"
    ],
    codeExample: `# React Chat Interface
import { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    
    const result = await response.json();
    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'assistant', content: result.response }
    ]);
    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Chat implementation */}
    </div>
  );
};`,
    architecture: {
      input: "User interactions and interface events",
      processing: "Input processing and response formatting",
      output: "User interfaces and interaction feedback"
    },
    integrations: ["React", "Vue", "Slack API", "Discord", "WhatsApp", "Mobile SDKs"],
    benefits: [
      "User-friendly interaction",
      "Multi-platform support",
      "Real-time communication",
      "Customizable interfaces",
      "Accessibility features"
    ],
    gettingStarted: [
      {
        step: "Choose Interface Type",
        description: "Select the appropriate interface for your users"
      },
      {
        step: "Design User Experience",
        description: "Create intuitive and accessible user interfaces"
      },
      {
        step: "Implement Communication",
        description: "Build real-time communication with agent systems"
      },
      {
        step: "Add Integrations",
        description: "Connect with popular platforms and tools"
      }
    ]
  },
  {
    id: 'flow-builders',
    title: "Flow Builders",
    description: "Visual workflow design tools enabling rapid agent development through no-code and low-code platforms.",
    features: ["LangFlow", "Flowise", "Visual Design", "No-Code"],
    icon: Workflow,
    color: "orange",
    detailedDescription: "Flow builders provide visual, drag-and-drop interfaces for creating AI agent workflows. These tools enable both technical and non-technical users to design, test, and deploy agent systems without extensive coding.",
    useCases: [
      "Rapid prototyping",
      "Non-technical development",
      "Workflow visualization",
      "Template creation",
      "Collaborative design"
    ],
    codeExample: `# LangFlow Configuration
{
  "nodes": [
    {
      "id": "input",
      "type": "TextInput",
      "data": { "label": "User Query" }
    },
    {
      "id": "llm",
      "type": "OpenAI",
      "data": { 
        "model": "gpt-4",
        "temperature": 0.7
      }
    },
    {
      "id": "output",
      "type": "TextOutput",
      "data": { "label": "Response" }
    }
  ],
  "edges": [
    { "source": "input", "target": "llm" },
    { "source": "llm", "target": "output" }
  ]
}`,
    architecture: {
      input: "Visual components and workflow designs",
      processing: "Flow compilation and execution",
      output: "Deployable agent workflows"
    },
    integrations: ["LangFlow", "Flowise", "Node-RED", "Zapier", "Power Automate"],
    benefits: [
      "Visual development",
      "Rapid prototyping",
      "Non-technical access",
      "Template reuse",
      "Collaborative design"
    ],
    gettingStarted: [
      {
        step: "Choose Platform",
        description: "Select a visual flow builder that fits your needs"
      },
      {
        step: "Learn Components",
        description: "Understand available nodes and connectors"
      },
      {
        step: "Design Workflows",
        description: "Create and test your agent workflows visually"
      },
      {
        step: "Deploy and Monitor",
        description: "Deploy workflows and monitor their performance"
      }
    ]
  }
];