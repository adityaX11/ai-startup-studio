export const startupProjects = [
  {
    id: 'launchmate',
    name: 'LaunchMate',
    tagline: 'AI-powered validation workspace for early-stage founders.',
    description:
      'LaunchMate helps founders validate startup ideas, understand markets, and create execution-ready plans.',
    industry: 'SaaS / Productivity',
    stage: 'Validation',
    status: 'Active',
    progress: 68,
    healthScore: 78,
    lastUpdated: '2 hours ago',
    color: 'from-indigo-500 to-cyan-500',
    modules: [
      { id: 'idea', label: 'Idea Analysis', status: 'completed', progress: 100 },
      { id: 'validation', label: 'Problem Validation', status: 'in-progress', progress: 68 },
      { id: 'market', label: 'Market Research', status: 'in-progress', progress: 82 },
      { id: 'competitors', label: 'Competitor Analysis', status: 'completed', progress: 100 },
      { id: 'customers', label: 'Customer Analysis', status: 'not-started', progress: 0 },
      { id: 'swot', label: 'SWOT Analysis', status: 'not-started', progress: 0 },
      { id: 'business-model', label: 'Business Model', status: 'in-progress', progress: 58 },
      { id: 'revenue', label: 'Revenue Model', status: 'in-progress', progress: 45 },
      { id: 'finance', label: 'Financial Estimation', status: 'not-started', progress: 0 },
      { id: 'mvp', label: 'MVP Planning', status: 'in-progress', progress: 68 },
      { id: 'technology', label: 'Technology Recommendation', status: 'not-started', progress: 0 },
      { id: 'roadmap', label: 'Development Roadmap', status: 'in-progress', progress: 40 },
      { id: 'gtm', label: 'Go-To-Market Strategy', status: 'not-started', progress: 0 },
      { id: 'risks', label: 'Risk Analysis', status: 'in-progress', progress: 35 },
      { id: 'pitch-deck', label: 'Pitch Deck', status: 'not-started', progress: 0 }
    ],
    healthScores: [
      { label: 'Idea Clarity', value: 84, tone: 'good' },
      { label: 'Problem Validation', value: 68, tone: 'watch' },
      { label: 'Market Opportunity', value: 81, tone: 'good' },
      { label: 'Competition', value: 72, tone: 'watch' },
      { label: 'Business Model', value: 76, tone: 'good' },
      { label: 'MVP Readiness', value: 88, tone: 'good' },
      { label: 'GTM Readiness', value: 63, tone: 'watch' },
      { label: 'Risk Level', value: 41, tone: 'low' }
    ],
    nextActions: [
      'Interview at least 10 potential customers.',
      'Define the first paid pricing hypothesis.',
      'Complete financial assumptions before building the MVP.'
    ],
    recentActivity: [
      {
        id: 'activity-1',
        title: 'Market research updated',
        detail: 'Two research sources were added.',
        time: '2 hours ago'
      },
      {
        id: 'activity-2',
        title: 'Competitor analysis completed',
        detail: 'Three competitor profiles were compared.',
        time: 'Yesterday'
      },
      {
        id: 'activity-3',
        title: 'MVP feature updated',
        detail: 'The onboarding flow was added to the MVP scope.',
        time: '2 days ago'
      }
    ]
  },
  {
    id: 'founderflow',
    name: 'FounderFlow',
    tagline: 'A guided execution platform for student founders.',
    description:
      'FounderFlow helps college founders organize validation, MVP development, and launch activities.',
    industry: 'EdTech / Community',
    stage: 'Idea',
    status: 'Draft',
    progress: 31,
    healthScore: 61,
    lastUpdated: 'Yesterday',
    color: 'from-violet-500 to-fuchsia-500',
    modules: [
      { id: 'idea', label: 'Idea Analysis', status: 'completed', progress: 100 },
      { id: 'validation', label: 'Problem Validation', status: 'in-progress', progress: 40 },
      { id: 'market', label: 'Market Research', status: 'not-started', progress: 0 },
      { id: 'mvp', label: 'MVP Planning', status: 'in-progress', progress: 25 },
      { id: 'roadmap', label: 'Development Roadmap', status: 'not-started', progress: 0 }
    ],
    healthScores: [
      { label: 'Idea Clarity', value: 72, tone: 'watch' },
      { label: 'Problem Validation', value: 38, tone: 'low' },
      { label: 'Market Opportunity', value: 55, tone: 'watch' },
      { label: 'Competition', value: 61, tone: 'watch' },
      { label: 'Business Model', value: 44, tone: 'low' },
      { label: 'MVP Readiness', value: 48, tone: 'low' },
      { label: 'GTM Readiness', value: 20, tone: 'low' },
      { label: 'Risk Level', value: 67, tone: 'high' }
    ],
    nextActions: [
      'Clarify the first target customer segment.',
      'Write three problem hypotheses.',
      'Research existing student founder communities.'
    ],
    recentActivity: [
      {
        id: 'activity-4',
        title: 'Startup project created',
        detail: 'FounderFlow workspace was created.',
        time: 'Yesterday'
      }
    ]
  }
];

export const dashboardData = {
  recommendedActions: [
    {
      id: 'action-1',
      title: 'Validate your customer segment',
      description: 'Interview potential customers before finalizing your pricing model.',
      priority: 'High',
      href: '/startups/launchmate/validation'
    },
    {
      id: 'action-2',
      title: 'Complete financial assumptions',
      description: 'Add price, acquisition cost, churn, and operating cost assumptions.',
      priority: 'Medium',
      href: '/startups/launchmate/finance'
    },
    {
      id: 'action-3',
      title: 'Build your first MVP scope',
      description: 'Turn your validated problem into a focused feature set.',
      priority: 'Medium',
      href: '/startups/launchmate/mvp'
    }
  ],
  recentInsights: [
    {
      id: 'insight-1',
      title: 'Customer segment needs more focus',
      description:
        'Your current target market contains multiple user groups with different buying motivations.',
      confidence: 'Medium',
      label: 'AI-generated'
    },
    {
      id: 'insight-2',
      title: 'Market opportunity looks promising',
      description:
        'The current market hypothesis has strong relevance, but source verification is still required.',
      confidence: 'High',
      label: 'AI-generated'
    }
  ]
};