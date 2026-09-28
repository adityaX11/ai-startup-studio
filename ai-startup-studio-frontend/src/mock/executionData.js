export const gtmData = {
  targetMarket: 'Students, solo developers, and first-time SaaS founders',
  positioning:
    'AI Startup Studio is the structured AI co-founder workspace for turning startup ideas into validated execution plans.',
  messaging: [
    'Move from vague idea to structured startup plan.',
    'Validate assumptions before investing months in development.',
    'Combine AI guidance with startup frameworks and execution tools.'
  ],
  channels: [
    {
      id: 'channel-1',
      name: 'Founder communities',
      purpose: 'Reach early-stage founders and collect feedback.',
      effort: 'Medium',
      expectedImpact: 'High',
      status: 'Recommended'
    },
    {
      id: 'channel-2',
      name: 'Student startup programs',
      purpose: 'Partner with universities and incubators.',
      effort: 'Medium',
      expectedImpact: 'High',
      status: 'Recommended'
    },
    {
      id: 'channel-3',
      name: 'Content and SEO',
      purpose: 'Educate founders about validation and MVP planning.',
      effort: 'High',
      expectedImpact: 'Medium',
      status: 'Planned'
    }
  ],
  launchStrategy: [
    'Recruit 10–20 design partners.',
    'Measure time-to-first-useful-plan.',
    'Collect structured feedback after each workflow stage.',
    'Improve the highest-friction module before wider launch.'
  ],
  kpis: [
    { label: 'Activation rate', value: '42%' },
    { label: 'First-project completion', value: '64%' },
    { label: 'Weekly active founders', value: '128' },
    { label: 'AI recommendation usefulness', value: '78%' }
  ]
};

export const risksData = [
  {
    id: 'risk-1',
    title: 'AI-generated research may contain incorrect claims',
    category: 'AI / Data',
    probability: 'Medium',
    impact: 'High',
    severity: 'High',
    mitigation: 'Show citations, confidence, timestamps, and require founder verification.',
    status: 'Open'
  },
  {
    id: 'risk-2',
    title: 'Product scope becomes too broad',
    category: 'Product',
    probability: 'High',
    impact: 'High',
    severity: 'Critical',
    mitigation: 'Keep stage-based MVP scope and postpone continuous monitoring.',
    status: 'Open'
  },
  {
    id: 'risk-3',
    title: 'AI provider cost grows with usage',
    category: 'Financial',
    probability: 'Medium',
    impact: 'Medium',
    severity: 'Medium',
    mitigation: 'Use caching, model routing, quotas, and asynchronous jobs.',
    status: 'Monitoring'
  },
  {
    id: 'risk-4',
    title: 'Users over-trust financial estimates',
    category: 'Legal / Trust',
    probability: 'Low',
    impact: 'High',
    severity: 'High',
    mitigation: 'Clearly label estimates and display assumptions.',
    status: 'Open'
  }
];

export const pitchDeckData = [
  {
    id: 'slide-1',
    title: 'Cover',
    content: 'AI Startup Studio',
    description: 'Turn startup ideas into validated execution plans.'
  },
  {
    id: 'slide-2',
    title: 'Problem',
    content: 'Founders struggle to validate ideas, research markets, and decide what to build.',
    description: 'The early-stage startup process is fragmented and difficult to navigate.'
  },
  {
    id: 'slide-3',
    title: 'Solution',
    content: 'A guided AI co-founder workspace for validation, planning, and execution.',
    description: 'The platform connects startup frameworks with contextual AI guidance.'
  },
  {
    id: 'slide-4',
    title: 'Market',
    content: 'A growing market of students, solo builders, and first-time founders.',
    description: 'Initial focus is on users who need structure before building.'
  },
  {
    id: 'slide-5',
    title: 'Business Model',
    content: 'Freemium access with premium AI workflows and founder workspaces.',
    description: 'Revenue assumptions remain estimates until validated.'
  },
  {
    id: 'slide-6',
    title: 'Go-To-Market',
    content: 'Founder communities, startup programs, and educational content.',
    description: 'Distribution begins with focused design partners.'
  },
  {
    id: 'slide-7',
    title: 'Ask',
    content: 'Help us validate the workflow with early-stage founders.',
    description: 'The immediate goal is learning, not premature scale.'
  }
];

export const monitoringData = {
  alerts: [
    {
      id: 'alert-1',
      title: 'Competitor launched a lower-priced plan',
      source: 'Competitor monitoring',
      importance: 'High',
      date: 'September 24, 2026',
      impact: 'May increase pricing pressure in the early-stage founder segment.',
      recommendation: 'Review value-based positioning before changing prices.'
    },
    {
      id: 'alert-2',
      title: 'Interest in AI productivity tools increased',
      source: 'Market signal',
      importance: 'Medium',
      date: 'September 22, 2026',
      impact: 'Potentially favorable timing for educational content and acquisition.',
      recommendation: 'Publish a validation workflow guide and measure conversions.'
    },
    {
      id: 'alert-3',
      title: 'Financial assumptions need review',
      source: 'Startup workspace',
      importance: 'Medium',
      date: 'September 20, 2026',
      impact: 'Current CAC and churn assumptions are not evidence-backed.',
      recommendation: 'Add customer interview and pricing validation tasks.'
    }
  ]
};

export const analyticsData = {
  progress: [
    { month: 'Apr', value: 12 },
    { month: 'May', value: 24 },
    { month: 'Jun', value: 38 },
    { month: 'Jul', value: 51 },
    { month: 'Aug', value: 67 },
    { month: 'Sep', value: 78 }
  ],
  scores: [
    { name: 'Idea', value: 84 },
    { name: 'Problem', value: 68 },
    { name: 'Market', value: 81 },
    { name: 'MVP', value: 88 },
    { name: 'GTM', value: 63 },
    { name: 'Risk', value: 41 }
  ],
  aiUsage: [
    { month: 'Apr', requests: 12 },
    { month: 'May', requests: 28 },
    { month: 'Jun', requests: 46 },
    { month: 'Jul', requests: 68 },
    { month: 'Aug', requests: 92 },
    { month: 'Sep', requests: 124 }
  ]
};