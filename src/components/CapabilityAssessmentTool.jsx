import React, { useState } from 'react';
import { ChevronRight, Flag, Shield, Target, Users, FileText } from 'lucide-react';
import { 
  REGIONAL_BUREAUS,
  PARTNER_TYPES,
  POLITICAL_RELATIONSHIPS,
  DIPLOMATIC_OBJECTIVES,
  POLITICAL_CONSTRAINTS,
  THREAT_INTENSITY,
  URGENCY_LEVELS,
  CAPABILITY_LEVELS,
  EQUIPMENT_CATEGORIES,
  TECH_TRANSFER_REQUIREMENTS,
  getRegionalThreats
} from '../constants';

function CapabilityAssessmentTool() {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessment, setAssessment] = useState({
    regionalBureau: '',
    country: '',
    partnerType: '',
    politicalRelationship: '',
    diplomaticObjectives: [],
    politicalConstraints: '',
    primaryThreat: '',
    secondaryThreat: '',
    threatIntensity: '',
    urgency: '',
    militaryCapability: '',
    institutionalStrength: '',
    resourceCapacity: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [showScoring, setShowScoring] = useState(false);

  const updateAssessment = (field, value) => {
    setAssessment(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'regionalBureau') {
        updated.country = '';
      }
      return updated;
    });
  };

  const getAvailableCountries = () => {
    if (!assessment.regionalBureau) return [];
    return REGIONAL_BUREAUS[assessment.regionalBureau]?.countries || [];
  };

  const getRegionalContext = () => {
    if (!assessment.regionalBureau) return null;
    return REGIONAL_BUREAUS[assessment.regionalBureau];
  };

  const calculateRecommendations = () => {
    const partnerWeight = PARTNER_TYPES.find(p => p.value === assessment.partnerType)?.weight || 0.5;
    const politicalWeight = POLITICAL_RELATIONSHIPS.find(p => p.value === assessment.politicalRelationship)?.weight || 0.5;
    const constraintWeight = POLITICAL_CONSTRAINTS.find(c => c.value === assessment.politicalConstraints)?.weight || 1.0;
    
    const regionalThreats = getRegionalThreats(assessment.regionalBureau);
    
    const primaryThreatData = regionalThreats.find(t => t.value === assessment.primaryThreat);
    const primaryThreatWeight = primaryThreatData?.weight || 3;
    
    const secondaryThreatData = assessment.secondaryThreat ? 
      regionalThreats.find(t => t.value === assessment.secondaryThreat) : null;
    const secondaryThreatWeight = secondaryThreatData ? (secondaryThreatData.weight * 0.6) : 0;
    
    const combinedThreatWeight = primaryThreatWeight + secondaryThreatWeight;
    const threatMultiplier = assessment.secondaryThreat ? 1.15 : 1.0;
    
    const intensityMultiplier = THREAT_INTENSITY.find(i => i.value === assessment.threatIntensity)?.multiplier || 1.0;
    const urgencyMultiplier = URGENCY_LEVELS.find(u => u.value === assessment.urgency)?.multiplier || 1.0;
    
    const militaryScore = parseInt(assessment.militaryCapability) || 3;
    const institutionalScore = parseInt(assessment.institutionalStrength) || 3;
    const resourceScore = parseInt(assessment.resourceCapacity) || 3;
    
    const capabilityGap = (15 - (militaryScore + institutionalScore + resourceScore)) / 15;
    
    const regionalContext = getRegionalContext();
    const regionalMultiplier = {
      'critical': 1.2,
      'high': 1.0,
      'medium-high': 0.9,
      'medium': 0.8
    }[regionalContext?.strategicPriority] || 1.0;
    
    const baseScore = (combinedThreatWeight * threatMultiplier * intensityMultiplier * urgencyMultiplier * capabilityGap * partnerWeight * politicalWeight * constraintWeight * regionalMultiplier);
    const priorityScore = Math.min(100, Math.max(0, baseScore * 6));

    let recommendationType = '';
    let recommendations = [];
    let strategicRationale = '';
    
    const threatContext = assessment.secondaryThreat ? 
      `multi-threat environment (${primaryThreatData?.label?.split('(')[0]} + ${secondaryThreatData?.label?.split('(')[0]})` :
      `${primaryThreatData?.label?.split('(')[0]} threat`;
    
    if (priorityScore >= 75) {
      recommendationType = 'High Priority - Comprehensive Assistance';
      strategicRationale = `Critical security partnership requiring immediate, sustained engagement due to ${threatContext} and strategic importance of ${regionalContext?.name}.`;
      recommendations = [
        'Multi-year Foreign Military Financing (FMF) program ($100M+ annually)',
        'Advanced military equipment transfers (subject to technology transfer approval)',
        'Extensive International Military Education and Training (IMET) programs',
        'Security Cooperation Office (SCO) establishment or expansion',
        'Joint exercises and regional security integration initiatives',
        'Institutional capacity building for defense governance'
      ];
    } else if (priorityScore >= 50) {
      recommendationType = 'Medium Priority - Targeted Assistance';
      strategicRationale = `Selective engagement focusing on capability gaps and ${threatContext} within ${regionalContext?.name}.`;
      recommendations = [
        'Targeted Foreign Military Financing ($25-75M annually)',
        'Focused equipment packages addressing priority capability gaps',
        'Professional military education and training programs',
        'Technical assistance for institutional strengthening',
        'Limited bilateral and multilateral exercise participation',
        'Security sector reform advisory support'
      ];
    } else if (priorityScore >= 25) {
      recommendationType = 'Low Priority - Minimal Engagement';
      strategicRationale = `Basic partnership maintenance with limited resources, monitoring ${threatContext} for potential escalation.`;
      recommendations = [
        'Small-scale training and education programs ($5-15M annually)',
        'Humanitarian assistance and disaster relief capabilities',
        'Institutional assessments and advisory services',
        'Regional conference and dialogue participation',
        'Peacekeeping capacity building (if applicable)'
      ];
    } else {
      recommendationType = 'Not Recommended - Diplomatic Engagement Only';
      strategicRationale = `Current ${threatContext} and partner capacity do not warrant significant military assistance investment.`;
      recommendations = [
        'Maintain diplomatic engagement through embassy channels',
        'Monitor security situation for changes',
        'Consider humanitarian assistance during crises',
        'Support multilateral diplomatic initiatives',
        'Reassess annually or following significant developments'
      ];
    }

    const regionalConsiderations = getRegionalStrategicConsiderations(assessment.regionalBureau, assessment.primaryThreat);

    return {
      priorityScore: Math.round(priorityScore),
      recommendationType,
      recommendations,
      strategicRationale,
      regionalConsiderations,
      scoring: {
        partnerWeight,
        politicalWeight,
        constraintWeight,
        primaryThreatWeight,
        secondaryThreatWeight,
        combinedThreatWeight,
        threatMultiplier,
        intensityMultiplier,
        urgencyMultiplier,
        regionalMultiplier,
        capabilityGap: Math.round(capabilityGap * 100),
        militaryScore,
        institutionalScore,
        resourceScore
      }
    };
  };

  const getRegionalStrategicConsiderations = (bureau, threat) => {
    const considerations = {
      'eur': {
        'state-aggression': ['NATO Article 5 implications', 'EU coordination requirements', 'Eastern flank reinforcement'],
        'hybrid-warfare': ['Information warfare countermeasures', 'Critical infrastructure protection', 'Democratic resilience'],
        'cyber-attacks': ['EU cyber directive compliance', 'NATO cyber defense integration', 'Public-private partnerships']
      },
      'eap': {
        'state-aggression': ['Alliance burden sharing', 'Maritime domain awareness', 'Multi-domain deterrence'],
        'maritime-disputes': ['Freedom of navigation operations', 'Coast guard capacity building', 'Maritime law enforcement'],
        'cyber-attacks': ['5G infrastructure security', 'Supply chain integrity', 'Technology standards coordination']
      },
      'nea': {
        'terrorism': ['Regional CT partnerships', 'Border security coordination', 'CVE programming'],
        'state-aggression': ['Regional balance of power', 'Proxy conflict management', 'Deterrence architecture'],
        'sectarian-conflict': ['Humanitarian crisis preparedness', 'Refugee management', 'Economic stabilization']
      },
      'sca': {
        'terrorism': ['Afghanistan lessons learned', 'Pakistan coordination', 'Regional CT frameworks'],
        'state-aggression': ['Nuclear stability', 'Kashmir conflict management', 'Great power competition'],
        'insurgency': ['Disaster preparedness', 'Climate security', 'Migration management']
      },
      'af': {
        'terrorism': ['AFRICOM coordination', 'French operations integration', 'Regional force development'],
        'instability': ['Governance strengthening', 'Economic development linkage', 'AU partnership'],
        'organized-crime': ['Maritime security (Gulf of Guinea)', 'Sahel security corridor', 'Border management']
      },
      'wha': {
        'drug-cartels': ['Drug interdiction cooperation', 'Anti-corruption initiatives', 'Border security'],
        'organized-crime': ['Migration management', 'Democratic governance', 'Economic partnerships'],
        'corruption': ['Democratic resilience', 'Information integrity', 'Economic diversification']
      }
    };
    
    return considerations[bureau]?.[threat] || ['Regional coordination', 'Partner capacity building', 'Multilateral engagement'];
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 5) {
      const results = calculateRecommendations();
      setRecommendations(results);
      setCurrentStep(6);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return assessment.regionalBureau && assessment.country && assessment.partnerType;
      case 2:
        return assessment.politicalRelationship && assessment.diplomaticObjectives.length > 0;
      case 3:
        return assessment.primaryThreat && assessment.threatIntensity && assessment.urgency;
      case 4:
        return assessment.militaryCapability && assessment.institutionalStrength && assessment.resourceCapacity;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const StepIndicator = ({ step, title, icon: Icon, active }) => (
    <div 
      onClick={() => setCurrentStep(step)}
      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-blue-50 ${
        active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
      }`}
    >
      <Icon size={16} />
      <div>
        <div className="text-xs font-medium">Step {step}</div>
        <div className="text-xs">{title}</div>
      </div>
    </div>
  );

  // Strategic Recommendations Display
  if (recommendations) {
    const regionalContext = getRegionalContext();
    
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Military Capability Assessment Tool</h1>
          <p className="text-gray-600">Strategic assessment framework for military assistance recommendations</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <FileText className="text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Military Assistance Assessment: {assessment.country}</span>
            </div>
            <div className="text-sm text-gray-600">
              Regional Bureau: {regionalContext?.name} | Strategic Priority: {regionalContext?.strategicPriority?.toUpperCase()}
            </div>
          </div>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Assessment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Regional Bureau:</strong> {regionalContext?.name}</div>
                  <div><strong>Partner Nation:</strong> {assessment.country}</div>
                  <div><strong>Partnership Type:</strong> {PARTNER_TYPES.find(p => p.value === assessment.partnerType)?.label}</div>
                  <div><strong>Political Relationship:</strong> {POLITICAL_RELATIONSHIPS.find(p => p.value === assessment.politicalRelationship)?.label}</div>
                  <div><strong>Primary Threat:</strong> {getRegionalThreats(assessment.regionalBureau).find(t => t.value === assessment.primaryThreat)?.label}</div>
                  {assessment.secondaryThreat && (
                    <div><strong>Secondary Threat:</strong> {getRegionalThreats(assessment.regionalBureau).find(t => t.value === assessment.secondaryThreat)?.label}</div>
                  )}
                  <div><strong>Threat Intensity:</strong> {THREAT_INTENSITY.find(i => i.value === assessment.threatIntensity)?.label}</div>
                  <div><strong>Response Urgency:</strong> {URGENCY_LEVELS.find(u => u.value === assessment.urgency)?.label}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Capability Assessment</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Military Capability:</strong> {CAPABILITY_LEVELS.find(c => c.value === parseInt(assessment.militaryCapability))?.label}</div>
                  <div><strong>Institutional Strength:</strong> {CAPABILITY_LEVELS.find(c => c.value === parseInt(assessment.institutionalStrength))?.label}</div>
                  <div><strong>Resource Capacity:</strong> {CAPABILITY_LEVELS.find(c => c.value === parseInt(assessment.resourceCapacity))?.label}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl">Strategic Recommendation</h3>
                <div className={`px-4 py-2 rounded-lg font-medium ${
                  recommendations.priorityScore >= 75 ? 'bg-red-100 text-red-800' :
                  recommendations.priorityScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                  recommendations.priorityScore >= 25 ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Priority Score: {recommendations.priorityScore}/100
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg text-blue-800">{recommendations.recommendationType}</h4>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-sm text-blue-900 mb-2">Strategic Rationale:</h5>
                  <p className="text-sm text-blue-800">{recommendations.strategicRationale}</p>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Recommended Actions:</h5>
                  <ul className="space-y-2">
                    {recommendations.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ChevronRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-medium mb-3">Regional Strategic Considerations:</h5>
                  <ul className="space-y-1">
                    {recommendations.regionalConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setRecommendations(null);
                  setAssessment({
                    regionalBureau: '',
                    country: '',
                    partnerType: '',
                    politicalRelationship: '',
                    diplomaticObjectives: [],
                    politicalConstraints: '',
                    primaryThreat: '',
                    secondaryThreat: '',
                    threatIntensity: '',
                    urgency: '',
                    militaryCapability: '',
                    institutionalStrength: '',
                    resourceCapacity: ''
                  });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                New Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Military Capability Assessment Tool</h1>
        <p className="text-gray-600">Strategic assessment framework for military assistance recommendations</p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <StepIndicator step={1} title="Partner Selection" icon={Flag} active={currentStep === 1} />
        <StepIndicator step={2} title="Political Relationship" icon={Users} active={currentStep === 2} />
        <StepIndicator step={3} title="Threat Assessment" icon={Shield} active={currentStep === 3} />
        <StepIndicator step={4} title="Capability Assessment" icon={Target} active={currentStep === 4} />
        <StepIndicator step={5} title="Strategic Report" icon={FileText} active={currentStep === 5} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-900">
            {currentStep === 1 && "Step 1: Partner Nation Selection"}
            {currentStep === 2 && "Step 2: Political Relationship & Objectives"}
            {currentStep === 3 && "Step 3: Threat Environment Assessment"}
            {currentStep === 4 && "Step 4: Capability Assessment"}
            {currentStep === 5 && "Step 5: Generate Strategic Report"}
          </div>
        </div>
        <div className="px-6 py-4 space-y-6">
          {/* Step 1: Partner Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Regional Bureau</label>
                <select
                  value={assessment.regionalBureau}
                  onChange={(e) => updateAssessment('regionalBureau', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose regional bureau...</option>
                  {Object.entries(REGIONAL_BUREAUS).map(([code, bureau]) => (
                    <option key={code} value={code}>{bureau.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Select Partner Nation</label>
                <select
                  value={assessment.country}
                  onChange={(e) => updateAssessment('country', e.target.value)}
                  disabled={!assessment.regionalBureau}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {assessment.regionalBureau ? 'Choose a country...' : 'Select regional bureau first'}
                  </option>
                  {getAvailableCountries().map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Partner Relationship Type</label>
                <select
                  value={assessment.partnerType}
                  onChange={(e) => updateAssessment('partnerType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship type...</option>
                  {PARTNER_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Political Relationship */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Political Relationship Status</label>
                <select
                  value={assessment.politicalRelationship}
                  onChange={(e) => updateAssessment('politicalRelationship', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select political relationship...</option>
                  {POLITICAL_RELATIONSHIPS.map(rel => (
                    <option key={rel.value} value={rel.value}>{rel.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Diplomatic Objectives (Select all applicable)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {DIPLOMATIC_OBJECTIVES.map(obj => (
                    <label key={obj.id} className="flex items-start space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={assessment.diplomaticObjectives.includes(obj.id)}
                        onChange={(e) => {
                          const current = assessment.diplomaticObjectives;
                          const updated = e.target.checked 
                            ? [...current, obj.id]
                            : current.filter(id => id !== obj.id);
                          updateAssessment('diplomaticObjectives', updated);
                        }}
                        className="mt-0.5"
                      />
                      <span>{obj.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Political Constraints</label>
                <select
                  value={assessment.politicalConstraints}
                  onChange={(e) => updateAssessment('politicalConstraints', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select primary constraint...</option>
                  {POLITICAL_CONSTRAINTS.map(constraint => (
                    <option key={constraint.value} value={constraint.value}>{constraint.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Threat Assessment */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Threat Type</label>
                <select
                  value={assessment.primaryThreat}
                  onChange={(e) => updateAssessment('primaryThreat', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select primary threat...</option>
                  {getRegionalThreats(assessment.regionalBureau).map(threat => (
                    <option key={threat.value} value={threat.value}>{threat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Secondary Threat Type</label>
                <select
                  value={assessment.secondaryThreat}
                  onChange={(e) => updateAssessment('secondaryThreat', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select secondary threat (optional)...</option>
                  {getRegionalThreats(assessment.regionalBureau)
                    .filter(threat => threat.value !== assessment.primaryThreat)
                    .map(threat => (
                    <option key={threat.value} value={threat.value}>{threat.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Threat Intensity Level</label>
                <select
                  value={assessment.threatIntensity}
                  onChange={(e) => updateAssessment('threatIntensity', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select intensity level...</option>
                  {THREAT_INTENSITY.map(intensity => (
                    <option key={intensity.value} value={intensity.value}>{intensity.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Response Urgency</label>
                <select
                  value={assessment.urgency}
                  onChange={(e) => updateAssessment('urgency', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select urgency level...</option>
                  {URGENCY_LEVELS.map(urgency => (
                    <option key={urgency.value} value={urgency.value}>{urgency.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Capability Assessment */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Military Capability Level</label>
                <select
                  value={assessment.militaryCapability}
                  onChange={(e) => updateAssessment('militaryCapability', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Assess military capability...</option>
                  {CAPABILITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Institutional Strength</label>
                <select
                  value={assessment.institutionalStrength}
                  onChange={(e) => updateAssessment('institutionalStrength', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Assess institutional strength...</option>
                  {CAPABILITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Resource Capacity</label>
                <select
                  value={assessment.resourceCapacity}
                  onChange={(e) => updateAssessment('resourceCapacity', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Assess resource capacity...</option>
                  {CAPABILITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 5: Generate Report */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="text-center p-8 bg-blue-50 rounded-lg">
                <FileText size={48} className="mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Generate Strategic Assessment</h3>
                <p className="text-blue-600 mb-4">
                  All assessment data collected. Click below to generate comprehensive strategic recommendations
                  and military assistance priorities for {assessment.country}.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <div className="font-medium text-blue-800">Regional Bureau</div>
                    <div className="text-blue-600">{getRegionalContext()?.name.split('(')[0]}</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <div className="font-medium text-blue-800">Partner Nation</div>
                    <div className="text-blue-600">{assessment.country}</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <div className="font-medium text-blue-800">Primary Threat</div>
                    <div className="text-blue-600">{getRegionalThreats(assessment.regionalBureau).find(t => t.value === assessment.primaryThreat)?.label?.split('(')[0]}</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <div className="font-medium text-blue-800">Urgency Level</div>
                    <div className="text-blue-600">{URGENCY_LEVELS.find(u => u.value === assessment.urgency)?.label?.split('(')[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-4 py-2 rounded-lg transition-colors ml-auto ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 4 ? 'Generate Strategic Report' : currentStep === 5 ? 'Generate Report' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapabilityAssessmentTool;
