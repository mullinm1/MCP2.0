// Complete constants for Military Capability Assessment Tool

// State Department Regional Bureaus and Countries
export const REGIONAL_BUREAUS = {
  'eur': {
    name: 'Europe and Eurasia (EUR)',
    strategicPriority: 'critical',
    primaryThreats: ['state-aggression', 'hybrid-warfare', 'cyber-attacks'],
    countries: [
      "Albania", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", 
      "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", 
      "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", 
      "Kazakhstan", "Kosovo", "Kyrgyzstan", "Latvia", "Lithuania", "Luxembourg", "Malta", 
      "Moldova", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", 
      "Romania", "Russia", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", 
      "Tajikistan", "Turkey", "Turkmenistan", "Ukraine", "United Kingdom", "Uzbekistan"
    ]
  },
  'eap': {
    name: 'East Asia and Pacific (EAP)',
    strategicPriority: 'critical',
    primaryThreats: ['state-aggression', 'maritime-disputes', 'cyber-attacks'],
    countries: [
      "Australia", "Brunei", "Cambodia", "China", "Fiji", "Indonesia", "Japan", "Kiribati", 
      "Laos", "Malaysia", "Marshall Islands", "Micronesia", "Mongolia", "Myanmar", "Nauru", 
      "New Zealand", "North Korea", "Palau", "Papua New Guinea", "Philippines", "Samoa", 
      "Singapore", "Solomon Islands", "South Korea", "Taiwan", "Thailand", "Timor-Leste", 
      "Tonga", "Tuvalu", "Vanuatu", "Vietnam"
    ]
  },
  'nea': {
    name: 'Near East Affairs (NEA)',
    strategicPriority: 'high',
    primaryThreats: ['terrorism', 'state-aggression', 'instability'],
    countries: [
      "Algeria", "Bahrain", "Egypt", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", 
      "Libya", "Morocco", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria", "Tunisia", 
      "United Arab Emirates", "Yemen"
    ]
  },
  'sca': {
    name: 'South and Central Asia (SCA)',
    strategicPriority: 'high',
    primaryThreats: ['terrorism', 'state-aggression', 'instability'],
    countries: [
      "Afghanistan", "Bangladesh", "Bhutan", "India", "Maldives", "Nepal", "Pakistan", "Sri Lanka"
    ]
  },
  'af': {
    name: 'African Affairs (AF)',
    strategicPriority: 'medium-high',
    primaryThreats: ['terrorism', 'instability', 'transnational-crime'],
    countries: [
      "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", 
      "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of the Congo", 
      "Djibouti", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", 
      "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", 
      "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Mozambique", "Namibia", 
      "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", 
      "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", 
      "Uganda", "Zambia", "Zimbabwe"
    ]
  },
  'wha': {
    name: 'Western Hemisphere Affairs (WHA)',
    strategicPriority: 'medium',
    primaryThreats: ['transnational-crime', 'instability', 'cyber-attacks'],
    countries: [
      "Antigua and Barbuda", "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil", 
      "Canada", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", 
      "Ecuador", "El Salvador", "Grenada", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica", 
      "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "Saint Kitts and Nevis", "Saint Lucia", 
      "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "Uruguay", "Venezuela"
    ]
  }
};

// Partner Relationship Types
export const PARTNER_TYPES = [
  { value: 'nato-ally', label: 'NATO Article 5 Ally', weight: 1.0 },
  { value: 'treaty-ally', label: 'Bilateral Treaty Ally', weight: 0.95 },
  { value: 'major-non-nato-ally', label: 'Major Non-NATO Ally (MNNA)', weight: 0.9 },
  { value: 'strategic-defense-partner', label: 'Strategic Defense Partner', weight: 0.85 },
  { value: 'close-security-partner', label: 'Close Security Partner', weight: 0.8 },
  { value: 'intel-sharing-partner', label: 'Intelligence Sharing Partner', weight: 0.75 },
  { value: 'regional-security-partner', label: 'Regional Security Partner', weight: 0.7 },
  { value: 'capacity-building-partner', label: 'Capacity Building Partner', weight: 0.65 },
  { value: 'coalition-partner', label: 'Coalition/Contingency Partner', weight: 0.6 },
  { value: 'emerging-partner', label: 'Emerging Security Partner', weight: 0.55 },
  { value: 'transitional-partner', label: 'Transitional Relationship', weight: 0.5 },
  { value: 'limited-cooperation', label: 'Limited Security Cooperation', weight: 0.45 },
  { value: 'humanitarian-partner', label: 'Humanitarian/Disaster Response Partner', weight: 0.4 },
  { value: 'conditional-engagement', label: 'Conditional Engagement', weight: 0.35 },
  { value: 'minimal-engagement', label: 'Minimal Engagement', weight: 0.3 }
];

// Political Relationship Spectrum
export const POLITICAL_RELATIONSHIPS = [
  { value: 'strategic-alliance', label: 'Strategic Alliance - Comprehensive Partnership', weight: 1.0, stability: 'very-high' },
  { value: 'close-partnership', label: 'Close Partnership - Strong Bilateral Ties', weight: 0.95, stability: 'high' },
  { value: 'cooperative-partnership', label: 'Cooperative Partnership - Regular Engagement', weight: 0.85, stability: 'high' },
  { value: 'functional-cooperation', label: 'Functional Cooperation - Issue-Based', weight: 0.75, stability: 'moderate' },
  { value: 'constructive-engagement', label: 'Constructive Engagement - Building Relations', weight: 0.7, stability: 'moderate' },
  { value: 'normalized-relations', label: 'Normalized Relations - Standard Diplomacy', weight: 0.65, stability: 'moderate' },
  { value: 'cautious-engagement', label: 'Cautious Engagement - Limited Trust', weight: 0.55, stability: 'moderate-low' },
  { value: 'transactional', label: 'Transactional - Specific Issue Focus', weight: 0.5, stability: 'variable' },
  { value: 'strained-relations', label: 'Strained Relations - Political Tensions', weight: 0.4, stability: 'low' },
  { value: 'minimal-contact', label: 'Minimal Contact - Very Limited Engagement', weight: 0.3, stability: 'low' },
  { value: 'adversarial', label: 'Adversarial - Competing Interests', weight: 0.2, stability: 'very-low' }
];

// Diplomatic Objectives Framework
export const DIPLOMATIC_OBJECTIVES = [
  {
    id: 'democratic-governance',
    name: 'Democratic Governance & Rule of Law',
    category: 'governance',
    priority: 'high'
  },
  {
    id: 'human-rights',
    name: 'Human Rights & Civil Liberties',
    category: 'values',
    priority: 'high'
  },
  {
    id: 'regional-stability',
    name: 'Regional Stability & Conflict Prevention',
    category: 'security',
    priority: 'critical'
  },
  {
    id: 'counter-influence',
    name: 'Counter Malign External Influence',
    category: 'strategic-competition',
    priority: 'high'
  },
  {
    id: 'economic-integration',
    name: 'Economic Integration & Trade Relations',
    category: 'economic',
    priority: 'medium'
  },
  {
    id: 'energy-cooperation',
    name: 'Energy Security & Cooperation',
    category: 'economic',
    priority: 'medium'
  },
  {
    id: 'multilateral-engagement',
    name: 'Multilateral Institution Participation',
    category: 'institutional',
    priority: 'medium'
  },
  {
    id: 'crisis-management',
    name: 'Crisis Management & Response Capacity',
    category: 'security',
    priority: 'high'
  },
  {
    id: 'migration-cooperation',
    name: 'Migration & Border Management',
    category: 'transnational',
    priority: 'medium'
  },
  {
    id: 'nuclear-nonproliferation',
    name: 'Nuclear Nonproliferation & Disarmament',
    category: 'security',
    priority: 'critical'
  },
  {
    id: 'climate-cooperation',
    name: 'Climate Change & Environmental Security',
    category: 'global-challenges',
    priority: 'medium'
  },
  {
    id: 'technology-standards',
    name: 'Technology Standards & Digital Governance',
    category: 'technological',
    priority: 'high'
  }
];

// Political Constraints Framework
export const POLITICAL_CONSTRAINTS = [
  { value: 'none', label: 'No Significant Political Constraints', weight: 1.0 },
  { value: 'domestic-opposition', label: 'Domestic Political Opposition', weight: 0.85 },
  { value: 'legislative-restrictions', label: 'Legislative/Congressional Restrictions', weight: 0.7 },
  { value: 'human-rights-concerns', label: 'Human Rights & Governance Concerns', weight: 0.65 },
  { value: 'corruption-issues', label: 'Corruption & Transparency Issues', weight: 0.75 },
  { value: 'regional-sensitivities', label: 'Regional Political Sensitivities', weight: 0.8 },
  { value: 'alliance-concerns', label: 'Alliance Partner Concerns', weight: 0.7 },
  { value: 'public-opinion', label: 'U.S. Public Opinion Constraints', weight: 0.8 },
  { value: 'legal-sanctions', label: 'Legal Sanctions & Restrictions', weight: 0.5 },
  { value: 'election-cycle', label: 'Election Cycle Considerations', weight: 0.9 }
];

// Threat Intensity Assessment
export const THREAT_INTENSITY = [
  { value: 'existential', label: 'Existential - Threatens State Survival', multiplier: 2.0 },
  { value: 'critical-imminent', label: 'Critical & Imminent - Active Military Operations', multiplier: 1.8 },
  { value: 'critical-persistent', label: 'Critical & Persistent - Sustained High-Level Threat', multiplier: 1.6 },
  { value: 'severe', label: 'Severe - Major Security Challenge', multiplier: 1.4 },
  { value: 'substantial', label: 'Substantial - Significant Ongoing Threat', multiplier: 1.2 },
  { value: 'moderate-active', label: 'Moderate-Active - Regular Security Incidents', multiplier: 1.0 },
  { value: 'moderate-latent', label: 'Moderate-Latent - Potential for Escalation', multiplier: 0.9 },
  { value: 'low-persistent', label: 'Low-Persistent - Manageable Ongoing Concern', multiplier: 0.8 },
  { value: 'minimal', label: 'Minimal - Limited Security Impact', multiplier: 0.6 },
  { value: 'negligible', label: 'Negligible - Very Low Current Risk', multiplier: 0.4 }
];

// Response Urgency Levels
export const URGENCY_LEVELS = [
  { value: 'immediate', label: 'Immediate (0-6 months)', multiplier: 2.0 },
  { value: 'short-term', label: 'Short Term (6-18 months)', multiplier: 1.5 },
  { value: 'medium-term', label: 'Medium Term (1.5-3 years)', multiplier: 1.0 },
  { value: 'long-term', label: 'Long Term (3+ years)', multiplier: 0.8 }
];

// Capability Assessment Levels
export const CAPABILITY_LEVELS = [
  { value: 5, label: 'Advanced - Regional Leader', score: 5 },
  { value: 4, label: 'Proficient - Above Average', score: 4 },
  { value: 3, label: 'Developing - Average', score: 3 },
  { value: 2, label: 'Basic - Below Average', score: 2 },
  { value: 1, label: 'Minimal - Significant Gaps', score: 1 }
];

// Military Equipment Database
export const EQUIPMENT_CATEGORIES = {
  'c4isr': {
    name: 'Command, Control, Communications, ISR',
    items: [
      {
        id: 'secure-radios',
        name: 'Secure Communications Systems',
        description: 'Encrypted tactical radio systems for secure communications',
        effectiveAgainst: ['state-aggression', 'terrorism', 'hybrid-warfare'],
        techLevel: 'controlled',
        cost: 'medium',
        training: 'moderate',
        maintenance: 'moderate',
        regionalSuitability: { 'eur': 1.0, 'eap': 1.0, 'nea': 0.9, 'sca': 0.8, 'af': 0.7, 'wha': 0.9 }
      },
      {
        id: 'surveillance-drones',
        name: 'ISR Unmanned Systems',
        description: 'Small tactical UAVs for intelligence and surveillance',
        effectiveAgainst: ['terrorism', 'organized-crime', 'maritime-disputes'],
        techLevel: 'restricted',
        cost: 'high',
        training: 'high',
        maintenance: 'high',
        regionalSuitability: { 'eur': 1.0, 'eap': 0.9, 'nea': 0.8, 'sca': 0.7, 'af': 0.6, 'wha': 0.8 }
      }
    ]
  },
  'individual': {
    name: 'Individual Equipment',
    items: [
      {
        id: 'night-vision',
        name: 'Night Vision Systems',
        description: 'Individual and crew-served night vision devices',
        effectiveAgainst: ['terrorism', 'organized-crime', 'state-aggression'],
        techLevel: 'controlled',
        cost: 'medium',
        training: 'low',
        maintenance: 'low',
        regionalSuitability: { 'eur': 1.0, 'eap': 0.9, 'nea': 0.9, 'sca': 0.8, 'af': 0.7, 'wha': 0.8 }
      }
    ]
  }
};

// Technology Transfer Requirements
export const TECH_TRANSFER_REQUIREMENTS = {
  'unclassified': { minPartnerLevel: 'minimal-engagement', approvalTime: '30 days' },
  'sensitive': { minPartnerLevel: 'limited-cooperation', approvalTime: '90 days' },
  'controlled': { minPartnerLevel: 'capacity-building-partner', approvalTime: '180 days' },
  'restricted': { minPartnerLevel: 'intel-sharing-partner', approvalTime: '365 days' },
  'classified': { minPartnerLevel: 'treaty-ally', approvalTime: '540 days' }
};

// Regional Threat Assessment Function
export const getRegionalThreats = (bureau) => {
  const regionalThreats = {
    'eur': [
      { value: 'state-aggression', label: 'State-Level Aggression (Primary)', weight: 5, primary: true },
      { value: 'hybrid-warfare', label: 'Hybrid Warfare Operations', weight: 4.5 },
      { value: 'cyber-attacks', label: 'Cyber Warfare & Infrastructure Attacks', weight: 4.5 },
      { value: 'terrorism', label: 'Terrorist Organizations', weight: 3.5 },
      { value: 'organized-crime', label: 'Transnational Organized Crime', weight: 3 }
    ],
    'eap': [
      { value: 'state-aggression', label: 'State-Level Aggression (Primary)', weight: 5, primary: true },
      { value: 'maritime-disputes', label: 'Maritime Territorial Disputes (Primary)', weight: 4.5, primary: true },
      { value: 'cyber-attacks', label: 'Cyber Warfare & Critical Infrastructure', weight: 4.5 },
      { value: 'terrorism', label: 'Terrorist Organizations & Extremism', weight: 3.5 }
    ],
    'nea': [
      { value: 'terrorism', label: 'Terrorist Organizations (Primary)', weight: 5, primary: true },
      { value: 'sectarian-conflict', label: 'Sectarian Violence & Proxy Conflicts', weight: 4.5, primary: true },
      { value: 'state-aggression', label: 'State-Level Aggression', weight: 4.5 },
      { value: 'instability', label: 'Regional Instability & State Collapse', weight: 4 }
    ],
    'sca': [
      { value: 'terrorism', label: 'Terrorist Organizations (Primary)', weight: 5, primary: true },
      { value: 'insurgency', label: 'Insurgency & Militant Groups', weight: 4.5, primary: true },
      { value: 'state-aggression', label: 'State-Level Aggression', weight: 4 },
      { value: 'instability', label: 'Regional Instability', weight: 3.5 }
    ],
    'af': [
      { value: 'terrorism', label: 'Terrorist Organizations (Primary)', weight: 5, primary: true },
      { value: 'instability', label: 'Political Instability & Governance Failure', weight: 4.5, primary: true },
      { value: 'organized-crime', label: 'Transnational Criminal Networks', weight: 4 },
      { value: 'ethnic-conflict', label: 'Ethnic & Tribal Conflicts', weight: 3 }
    ],
    'wha': [
      { value: 'drug-cartels', label: 'Drug Cartels & Trafficking Organizations (Primary)', weight: 5, primary: true },
      { value: 'organized-crime', label: 'Transnational Organized Crime', weight: 4.5, primary: true },
      { value: 'corruption', label: 'Institutional Corruption & Governance', weight: 4 },
      { value: 'terrorism', label: 'Terrorist Organizations', weight: 2.5 }
    ]
  };
  
  return regionalThreats[bureau] || [];
};
