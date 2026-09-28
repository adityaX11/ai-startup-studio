export const ideaAnalysis = {
  summary:
    'LaunchMate is an AI-powered startup validation workspace that helps early-stage founders move from an idea to an execution-ready plan.',
  problemStatement:
    'First-time founders struggle to validate assumptions, research markets, and convert vague ideas into structured execution plans.',
  valueProposition:
    'A guided AI co-founder workspace that combines startup frameworks, research, planning tools, and contextual recommendations.',
  scores: [
    { label: 'Problem clarity', value: 84, tone: 'good' },
    { label: 'Solution clarity', value: 78, tone: 'good' },
    { label: 'Differentiation', value: 61, tone: 'watch' },
    { label: 'Market potential', value: 81, tone: 'good' },
    { label: 'Execution risk', value: 48, tone: 'watch' }
  ],
  strengths: [
    'Clear workflow from idea validation to execution planning.',
    'Useful combination of AI guidance and structured business tools.',
    'Strong relevance for students and first-time founders.'
  ],
  weaknesses: [
    'Market research quality depends on available data sources.',
    'Users may over-trust AI-generated recommendations.',
    'The product scope can become too broad for an MVP.'
  ],
  assumptions: [
    'Founders are willing to enter structured startup information.',
    'Users value guided workflows more than open-ended chat.',
    'External market sources can provide sufficient evidence.'
  ],
  validationQuestions: [
    'Would founders pay for structured validation guidance?',
    'Which startup planning stage creates the most urgency?',
    'Do users prefer AI-generated plans or expert-reviewed templates?'
  ]
};

export const validationData = {
  score: 68,
  hypotheses: [
    {
      id: 'hypothesis-1',
      title: 'Founders need structured validation',
      status: 'Needs validation',
      confidence: 'Medium',
      description: 'First-time founders struggle to organize research and make validation decisions.'
    },
    {
      id: 'hypothesis-2',
      title: 'Users want actionable outputs',
      status: 'Partially supported',
      confidence: 'Medium',
      description: 'Users prefer recommendations that become tasks, plans, or structured artifacts.'
    },
    {
      id: 'hypothesis-3',
      title: 'AI guidance improves planning speed',
      status: 'Unverified',
      confidence: 'Low',
      description: 'AI may reduce planning time, but usefulness depends on data quality and context.'
    }
  ],
  evidence: [
    {
      id: 'evidence-1',
      source: 'Founder interviews',
      detail: 'Early interviews indicate difficulty comparing markets and competitors.',
      status: 'User provided'
    },
    {
      id: 'evidence-2',
      source: 'Product research',
      detail: 'Existing tools often focus on only one startup planning activity.',
      status: 'Research data'
    }
  ],
  checklist: [
    { label: 'Interview at least 10 target users', completed: false },
    { label: 'Document the top 3 customer pain points', completed: true },
    { label: 'Compare current alternatives', completed: true },
    { label: 'Test willingness to pay', completed: false }
  ]
};

export const marketData = {
  overview: {
    industry: 'Startup productivity software',
    tam: '$8.4B',
    sam: '$1.9B',
    som: '$85M',
    growth: '18.6%',
    updated: 'September 2026'
  },
  trends: [
    { month: 'Jan', interest: 42, growth: 8 },
    { month: 'Feb', interest: 48, growth: 10 },
    { month: 'Mar', interest: 52, growth: 12 },
    { month: 'Apr', interest: 61, growth: 15 },
    { month: 'May', interest: 67, growth: 16 },
    { month: 'Jun', interest: 74, growth: 18 }
  ],
  segments: [
    { name: 'Students', value: 34 },
    { name: 'First-time founders', value: 42 },
    { name: 'Solo developers', value: 16 },
    { name: 'Small teams', value: 8 }
  ],
  sources: [
    {
      name: 'Founder interview notes',
      date: 'September 2026',
      confidence: 'Medium',
      type: 'User provided'
    },
    {
      name: 'Industry research summary',
      date: 'September 2026',
      confidence: 'Medium',
      type: 'Research data'
    },
    {
      name: 'AI market synthesis',
      date: 'September 2026',
      confidence: 'Low',
      type: 'AI-generated'
    }
  ]
};

export const competitors = [
  {
    id: 'competitor-1',
    name: 'IdeaBuddy',
    website: 'ideabuddy.com',
    pricing: '$15/month',
    targetCustomer: 'Early-stage founders',
    positioning: 'Guided business planning',
    strengths: ['Structured planning', 'Business templates'],
    weaknesses: ['Limited AI context', 'Less execution tracking'],
    score: 76
  },
  {
    id: 'competitor-2',
    name: 'LivePlan',
    website: 'liveplan.com',
    pricing: '$20/month',
    targetCustomer: 'Small business owners',
    positioning: 'Business planning and financials',
    strengths: ['Financial planning', 'Business plan templates'],
    weaknesses: ['Less startup-specific', 'Limited AI guidance'],
    score: 69
  },
  {
    id: 'competitor-3',
    name: 'Notion Templates',
    website: 'notion.so',
    pricing: 'Free / paid templates',
    targetCustomer: 'Builders and creators',
    positioning: 'Flexible workspace',
    strengths: ['Flexible', 'Large template ecosystem'],
    weaknesses: ['No startup intelligence', 'Manual setup required'],
    score: 63
  }
];

export const personas = [
  {
    id: 'persona-1',
    name: 'The Student Founder',
    segment: 'Students',
    goals: ['Build a credible startup project', 'Learn startup fundamentals'],
    painPoints: ['Limited experience', 'Unclear next steps'],
    budget: 'Low',
    motivation: 'Learning and portfolio building',
    objections: ['Will the output be accurate?', 'Is it affordable?']
  },
  {
    id: 'persona-2',
    name: 'The Solo Developer',
    segment: 'Developers with ideas',
    goals: ['Validate before coding', 'Find a focused MVP'],
    painPoints: ['Overbuilding', 'Weak customer research'],
    budget: 'Medium',
    motivation: 'Turning technical ideas into products',
    objections: ['Can it understand technical products?', 'Will it save time?']
  },
  {
    id: 'persona-3',
    name: 'The First-time Founder',
    segment: 'Early-stage founders',
    goals: ['Reduce uncertainty', 'Prepare for investors'],
    painPoints: ['Scattered research', 'No structured execution plan'],
    budget: 'Medium',
    motivation: 'Launching a real business',
    objections: ['Can I trust the recommendations?', 'Does it support evidence?']
  }
];

export const swotData = {
  strengths: [
    'Structured startup workflow',
    'AI guidance with project context',
    'Clear outputs and reusable artifacts'
  ],
  weaknesses: [
    'Early data coverage may be limited',
    'AI output quality depends on user input',
    'Large product scope'
  ],
  opportunities: [
    'Student founder communities',
    'Incubator and accelerator programs',
    'Startup education partnerships'
  ],
  threats: [
    'Large AI platforms adding startup workflows',
    'Incorrect or outdated market information',
    'Users treating estimates as guarantees'
  ]
};