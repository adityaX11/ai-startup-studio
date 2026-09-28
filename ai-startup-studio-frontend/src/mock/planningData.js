export const businessModelData = {
  keyPartners: [
    'Startup incubators',
    'Design partners',
    'AI tooling providers',
    'Developer communities'
  ],
  keyActivities: [
    'Customer discovery',
    'Research synthesis',
    'Workflow designing',
    'MVP validation'
  ],
  keyResources: [
    'Founder expertise',
    'AI assistant',
    'Research database',
    'Product templates'
  ],
  valuePropositions: [
    'Turn startup ideas into validated plans',
    'Reduce time from idea to MVP',
    'Provide structured operating workflow'
  ],
  customerRelationships: [
    'Guided onboarding',
    'AI recommendations',
    'Weekly progress nudges'
  ],
  channels: [
    'Product UI',
    'Organic content',
    'Community referrals',
    'Partnerships'
  ],
  customerSegments: [
    'Student founders',
    'Solo builders',
    'Early-stage startups'
  ],
  costStructure: [
    'Engineering time',
    'AI inference costs',
    'Research subscriptions',
    'Hosting and analytics'
  ],
  revenueStreams: [
    'Subscription plans',
    'Premium AI workspace',
    'Enterprise onboarding'
  ]
};

export const revenueData = {
  models: [
    {
      id: 'subscription',
      name: 'Subscription',
      description: 'Monthly SaaS plan',
      pricing: '$29',
      customers: 1800,
      conversion: 12,
      revenue: 626000
    },
    {
      id: 'freemium',
      name: 'Freemium',
      description: 'Basic free plan + premium AI features',
      pricing: '$0 / $19',
      customers: 2400,
      conversion: 8,
      revenue: 456000
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      description: 'Product + enterprise package',
      pricing: '$49 / custom',
      customers: 420,
      conversion: 18,
      revenue: 320000
    }
  ],
  assumptions: [
    { label: 'MRR growth', value: '18%' },
    { label: 'Churn', value: '4.5%' },
    { label: 'CAC', value: '$180' },
    { label: 'LTV', value: '$1,320' }
  ]
};

export const financialData = {
  scenarios: {
    conservative: {
      customers: 900,
      price: 29,
      cost: 210000,
      revenue: 313200,
      profit: 103200,
      runway: 16
    },
    expected: {
      customers: 1800,
      price: 39,
      cost: 360000,
      revenue: 842400,
      profit: 482400,
      runway: 22
    },
    optimistic: {
      customers: 3000,
      price: 49,
      cost: 520000,
      revenue: 1764000,
      profit: 1244000,
      runway: 28
    }
  },
  metrics: [
    { label: 'CAC', value: '$180' },
    { label: 'LTV', value: '$1,320' },
    { label: 'Burn', value: '$22k/mo' },
    { label: 'Break-even', value: '12 mo' }
  ]
};

export const mvpData = {
  features: [
    {
      id: 'idea-analysis',
      name: 'Idea Analysis',
      description: 'Structure a founder idea and evaluate clarity',
      impact: 92,
      effort: 3,
      complexity: 'Low',
      risk: 'Low',
      priority: 'Must Have',
      status: 'Completed'
    },
    {
      id: 'market-research',
      name: 'Market Research',
      description: 'Summarize market trends and opportunity areas',
      impact: 87,
      effort: 5,
      complexity: 'Medium',
      risk: 'Medium',
      priority: 'Must Have',
      status: 'In Progress'
    },
    {
      id: 'competitor-scan',
      name: 'Competitor Scan',
      description: 'Compare direct and indirect competitors',
      impact: 81,
      effort: 4,
      complexity: 'Medium',
      risk: 'Medium',
      priority: 'Must Have',
      status: 'Planned'
    },
    {
      id: 'money-model',
      name: 'Monetization Model',
      description: 'Estimate pricing and business model viability',
      impact: 76,
      effort: 3,
      complexity: 'Low',
      risk: 'Low',
      priority: 'Should Have',
      status: 'Planned'
    },
    {
      id: 'ai-cofounder',
      name: 'AI Co-Founder',
      description: 'Provide contextual startup guidance',
      impact: 90,
      effort: 6,
      complexity: 'High',
      risk: 'Medium',
      priority: 'Should Have',
      status: 'Planned'
    }
  ]
};

export const technologyData = {
  stack: [
    {
      category: 'Frontend',
      technology: 'React + Vite + JavaScript',
      why: 'Fast UI, component reuse, product velocity',
      tradeOffs: 'Needs careful state and performance discipline',
      complexity: 'Low',
      cost: 'Low'
    },
    {
      category: 'Backend',
      technology: 'Node.js + Express',
      why: 'Good API speed and developer productivity',
      tradeOffs: 'Need strong validation and monitoring',
      complexity: 'Medium',
      cost: 'Low-Medium'
    },
    {
      category: 'Database',
      technology: 'PostgreSQL',
      why: 'Strong relational data and reporting',
      tradeOffs: 'Requires schema design discipline',
      complexity: 'Medium',
      cost: 'Low-Medium'
    },
    {
      category: 'AI / ML',
      technology: 'Python + FastAPI + vector store',
      why: 'Good for research, orchestration, and retrieval workflows',
      tradeOffs: 'Operational complexity and cost',
      complexity: 'High',
      cost: 'Medium-High'
    }
  ]
};

export const roadmapData = {
  milestones: [
    {
      id: 'm1',
      title: 'Problem validation',
      status: 'Completed',
      startDate: '2026-08-01',
      endDate: '2026-08-14',
      owner: 'Founders'
    },
    {
      id: 'm2',
      title: 'Market research sprint',
      status: 'In Progress',
      startDate: '2026-08-15',
      endDate: '2026-08-30',
      owner: 'AI workflows'
    },
    {
      id: 'm3',
      title: 'MVP alpha',
      status: 'Planned',
      startDate: '2026-09-01',
      endDate: '2026-09-20',
      owner: 'Product team'
    },
    {
      id: 'm4',
      title: 'Pilot onboarding',
      status: 'Planned',
      startDate: '2026-09-21',
      endDate: '2026-10-05',
      owner: 'Growth'
    }
  ]
};