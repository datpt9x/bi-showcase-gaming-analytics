import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  Cloud, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Layers,
  Settings,
  BookOpen,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const DevelopmentGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('architecture');
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const sections = [
    { id: 'architecture', name: 'Architecture Overview', icon: <Layers className="h-4 w-4" /> },
    { id: 'technology', name: 'Technology Stack', icon: <Code className="h-4 w-4" /> },
    { id: 'roadmap', name: 'Implementation Roadmap', icon: <Calendar className="h-4 w-4" /> },
    { id: 'team', name: 'Team Structure', icon: <Users className="h-4 w-4" /> },
    { id: 'costs', name: 'Cost Analysis', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'best-practices', name: 'Best Practices', icon: <BookOpen className="h-4 w-4" /> },
  ];

  const architectureComponents = [
    {
      name: 'Data Sources',
      description: 'Mobile apps, web analytics, ad networks, app stores',
      technologies: ['Firebase', 'AppsFlyer', 'Adjust', 'App Store Connect'],
      color: 'bg-blue-500'
    },
    {
      name: 'Data Ingestion',
      description: 'Real-time and batch data collection pipelines',
      technologies: ['Apache Kafka', 'AWS Kinesis', 'Google Pub/Sub'],
      color: 'bg-green-500'
    },
    {
      name: 'Data Storage',
      description: 'Data lake and warehouse for raw and processed data',
      technologies: ['Snowflake', 'BigQuery', 'AWS S3', 'Redshift'],
      color: 'bg-purple-500'
    },
    {
      name: 'Data Processing',
      description: 'ETL/ELT pipelines for data transformation',
      technologies: ['dbt', 'Apache Airflow', 'Spark', 'Dataflow'],
      color: 'bg-yellow-500'
    },
    {
      name: 'Analytics Layer',
      description: 'Business logic and metric calculations',
      technologies: ['dbt', 'Looker', 'Custom APIs'],
      color: 'bg-red-500'
    },
    {
      name: 'Visualization',
      description: 'Dashboards and reporting interfaces',
      technologies: ['Looker', 'Tableau', 'Power BI', 'Custom React'],
      color: 'bg-indigo-500'
    }
  ];

  const technologyStack = {
    'Cloud Platforms': {
      'AWS': { cost: '$2,000-5,000/month', pros: ['Comprehensive ecosystem', 'Gaming-specific services'], cons: ['Complex pricing', 'Learning curve'] },
      'Google Cloud': { cost: '$1,500-4,000/month', pros: ['Best analytics tools', 'BigQuery performance'], cons: ['Limited gaming tools', 'Data egress costs'] },
      'Snowflake': { cost: '$1,500-2,500/month', pros: ['Separation of compute/storage', 'Auto-scaling'], cons: ['Can be expensive', 'Vendor lock-in'] }
    },
    'BI Tools': {
      'Looker Studio': { cost: 'Free-$15/user', pros: ['Free tier', 'Google integration'], cons: ['Limited features', 'Performance issues'] },
      'Power BI': { cost: '$10/user', pros: ['Great value', 'Microsoft ecosystem'], cons: ['Less real-time', 'Limited customization'] },
      'Tableau': { cost: '$70/user', pros: ['Superior visualization', 'Advanced analytics'], cons: ['Expensive', 'Steep learning curve'] },
      'Custom React': { cost: 'Development time', pros: ['Full control', 'Perfect fit'], cons: ['High development cost', 'Maintenance overhead'] }
    },
    'Data Processing': {
      'dbt': { cost: '$100-500/month', pros: ['SQL-based', 'Version control', 'Testing'], cons: ['Learning curve', 'Limited real-time'] },
      'Apache Airflow': { cost: 'Infrastructure only', pros: ['Flexible', 'Open source'], cons: ['Complex setup', 'Maintenance overhead'] },
      'Fivetran': { cost: '$1,000-5,000/month', pros: ['Managed connectors', 'Reliable'], cons: ['Expensive', 'Limited customization'] }
    }
  };

  const implementationPhases = [
    {
      id: 'phase1',
      title: 'Phase 1: Foundation (Months 1-3)',
      cost: '$50k-80k',
      description: 'Establish core infrastructure and basic reporting',
      tasks: [
        'Hire Analytics Manager + Senior BI Analyst',
        'Setup basic infrastructure (Snowflake + S3/GCS)',
        'Implement core dashboards (DAU, retention, revenue)',
        'Establish data governance framework',
        'Setup basic ETL pipelines'
      ],
      deliverables: [
        'Executive dashboard with key KPIs',
        'Basic retention and revenue reporting',
        'Data pipeline for core metrics',
        'Team structure and processes'
      ],
      risks: [
        'Data quality issues',
        'Scope creep',
        'Team ramping time'
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Expansion (Months 4-6)',
      cost: '$60k-90k',
      description: 'Add advanced analytics and self-service capabilities',
      tasks: [
        'Add Data Engineer to team',
        'Implement advanced analytics (cohorts, funnels)',
        'Build self-service tools for product teams',
        'Add real-time data processing',
        'Integrate additional data sources'
      ],
      deliverables: [
        'Product analytics dashboards',
        'Cohort analysis tools',
        'Self-service reporting platform',
        'Real-time alerting system'
      ],
      risks: [
        'Technical complexity',
        'User adoption challenges',
        'Performance issues'
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Optimization (Months 7-12)',
      cost: '$70k-100k',
      description: 'Advanced features and full democratization',
      tasks: [
        'Add specialized roles (Data Scientist, Marketing Analyst)',
        'Implement ML models for prediction',
        'Build advanced visualization capabilities',
        'Full democratization across organization',
        'Performance optimization and scaling'
      ],
      deliverables: [
        'Predictive analytics models',
        'Advanced custom dashboards',
        'Organization-wide BI adoption',
        'Automated insights and recommendations'
      ],
      risks: [
        'Model accuracy issues',
        'Scaling challenges',
        'Change management'
      ]
    }
  ];

  const teamStructure = [
    {
      role: 'Analytics Manager',
      salary: '$130k-180k',
      description: 'Strategy, coordination, stakeholder management',
      skills: ['Business strategy', 'Team leadership', 'Gaming industry knowledge'],
      responsibilities: ['Define analytics strategy', 'Manage stakeholder relationships', 'Team coordination']
    },
    {
      role: 'Senior BI Analyst',
      salary: '$90k-120k',
      description: 'Core analytics, insights generation, dashboard development',
      skills: ['SQL', 'BI tools', 'Statistical analysis', 'Gaming metrics'],
      responsibilities: ['Build dashboards', 'Generate insights', 'Support business decisions']
    },
    {
      role: 'Data Engineer',
      salary: '$125k-177k',
      description: 'Pipeline development, infrastructure management',
      skills: ['Python/Scala', 'ETL/ELT', 'Cloud platforms', 'Data modeling'],
      responsibilities: ['Build data pipelines', 'Manage infrastructure', 'Ensure data quality']
    },
    {
      role: 'BI Analyst',
      salary: '$70k-90k',
      description: 'Reporting, analysis, ad-hoc requests',
      skills: ['SQL', 'Excel/Sheets', 'Basic statistics', 'Domain knowledge'],
      responsibilities: ['Create reports', 'Support analysis requests', 'Data validation']
    }
  ];

  const bestPractices = [
    {
      category: 'Data Architecture',
      practices: [
        'Implement star schema for dimensional modeling',
        'Use ELT pattern instead of ETL for flexibility',
        'Separate raw, staging, and mart layers',
        'Implement proper data lineage tracking'
      ]
    },
    {
      category: 'Performance',
      practices: [
        'Use columnar storage for analytics workloads',
        'Implement proper partitioning strategies',
        'Cache frequently accessed data',
        'Optimize query performance with indexes'
      ]
    },
    {
      category: 'Governance',
      practices: [
        'Establish clear data ownership',
        'Implement role-based access control',
        'Document all metrics and calculations',
        'Regular data quality monitoring'
      ]
    },
    {
      category: 'Gaming-Specific',
      practices: [
        'Track player lifecycle from install to churn',
        'Implement cohort-based analysis',
        'Monitor real-time metrics for live ops',
        'Integrate with attribution platforms'
      ]
    }
  ];

  const renderArchitecture = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Hybrid Lakehouse Architecture</h3>
        <p className="text-gray-400">Recommended architecture for gaming and mobile app analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {architectureComponents.map((component, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className={`w-12 h-12 ${component.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h4 className="text-white font-semibold mb-2">{component.name}</h4>
            <p className="text-gray-400 text-sm mb-4">{component.description}</p>
            <div className="flex flex-wrap gap-1">
              {component.technologies.map((tech, idx) => (
                <span key={idx} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnology = () => (
    <div className="space-y-8">
      {Object.entries(technologyStack).map(([category, tools]) => (
        <div key={category} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(tools).map(([tool, details]) => (
              <div key={tool} className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{tool}</h4>
                  <span className="text-green-400 text-sm">{details.cost}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-green-400 text-xs">Pros:</span>
                    <ul className="text-gray-400 text-xs ml-2">
                      {details.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-400 text-xs">Cons:</span>
                    <ul className="text-gray-400 text-xs ml-2">
                      {details.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderRoadmap = () => (
    <div className="space-y-6">
      {implementationPhases.map((phase) => (
        <div key={phase.id} className="bg-gray-800 rounded-lg border border-gray-700">
          <div 
            className="p-6 cursor-pointer"
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                <p className="text-gray-400">{phase.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-400 font-semibold">{phase.cost}</span>
                {expandedPhase === phase.id ? 
                  <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                }
              </div>
            </div>
          </div>
          
          {expandedPhase === phase.id && (
            <div className="px-6 pb-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Tasks</h4>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Deliverables</h4>
                  <ul className="space-y-2">
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <TrendingUp className="h-3 w-3 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Risks</h4>
                  <ul className="space-y-2">
                    {phase.risks.map((risk, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <AlertTriangle className="h-3 w-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTeam = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {teamStructure.map((member, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white">{member.role}</h3>
            <span className="text-green-400 font-semibold">{member.salary}</span>
          </div>
          <p className="text-gray-400 mb-4">{member.description}</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-medium mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Responsibilities:</h4>
              <ul className="space-y-1">
                {member.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBestPractices = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bestPractices.map((category, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
          <ul className="space-y-3">
            {category.practices.map((practice, idx) => (
              <li key={idx} className="text-gray-400 text-sm flex items-start">
                <CheckCircle className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                {practice}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'architecture': return renderArchitecture();
      case 'technology': return renderTechnology();
      case 'roadmap': return renderRoadmap();
      case 'team': return renderTeam();
      case 'best-practices': return renderBestPractices();
      default: return renderArchitecture();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Development
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Guide
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive guide for building a world-class BI system for gaming and mobile apps.
            From architecture to implementation, team structure to best practices.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {section.icon}
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-16">
          {renderContent()}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your BI System?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Get started with our comprehensive implementation guide, templates, and best practices 
              from successful gaming companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Implementation Guide</span>
              </button>
              <button className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <ExternalLink className="h-4 w-4" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentGuide;
