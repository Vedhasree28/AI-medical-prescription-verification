// NOTE: This is a mock AI service.
// The IBM Granite models are typically accessed via a secure backend service (e.g., using Python with the Watsonx.ai SDK).
// Direct frontend calls are not standard practice. This mock simulates the expected API responses
// to keep the user interface functional. In a real-world application, this service would
// make authenticated fetch() calls to your backend API endpoints.

import { InteractionResult, DosageResult, AlternativeResult, ExtractedInfo } from '../types';

const simulateNetworkDelay = <T>(data: T, delay = 800): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const analyzeDrugInteractions = async (drugs: string[]): Promise<InteractionResult[]> => {
  console.log("Simulating interaction check for:", drugs);
  const mockInteractions: { [key: string]: InteractionResult } = {
    "aspirin-warfarin": {
      drugs: ["Aspirin", "Warfarin"],
      severity: 'High',
      description: 'Concurrent use significantly increases the risk of major bleeding events.',
      recommendation: 'Avoid concomitant use if possible. If necessary, monitor INR closely and adjust warfarin dosage. Patient education on bleeding signs is critical.'
    },
    "ibuprofen-lisinopril": {
        drugs: ["Ibuprofen", "Lisinopril"],
        severity: 'Medium',
        description: 'NSAIDs like Ibuprofen may reduce the antihypertensive effect of ACE inhibitors like Lisinopril and increase the risk of renal impairment.',
        recommendation: 'Monitor blood pressure and renal function. Advise patient to limit NSAID use.'
    }
  };
  
  const results: InteractionResult[] = [];
  for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
          const key1 = `${drugs[i].toLowerCase()}-${drugs[j].toLowerCase()}`;
          const key2 = `${drugs[j].toLowerCase()}-${drugs[i].toLowerCase()}`;
          if (mockInteractions[key1]) results.push(mockInteractions[key1]);
          else if (mockInteractions[key2]) results.push(mockInteractions[key2]);
      }
  }

  return simulateNetworkDelay(results);
};


export const getDosageRecommendation = async (drugName: string, age: number, weight?: number): Promise<DosageResult> => {
    console.log(`Simulating dosage for ${drugName}, age ${age}, weight ${weight}`);
    const mockDosage: DosageResult = {
        drugName: drugName,
        ageGroup: age < 18 ? 'Pediatric' : age > 65 ? 'Geriatric' : 'Adult',
        recommendedDosage: age < 18 ? '10-15 mg/kg every 4-6 hours' : '325-650 mg every 4-6 hours as needed',
        maxDailyDosage: '4000 mg',
        considerations: 'Use with caution in patients with hepatic impairment or alcoholism. For geriatric patients, consider lower doses due to potential for decreased renal function.'
    };
    return simulateNetworkDelay(mockDosage);
};

export const findAlternativeMedications = async (drugName: string, age: number, condition?: string): Promise<AlternativeResult[]> => {
    console.log(`Simulating alternatives for ${drugName}, age ${age}, condition ${condition}`);
    const mockAlternatives: AlternativeResult[] = [
        {
            alternative: 'Acetaminophen',
            reason: 'Different mechanism of action, less risk of gastrointestinal bleeding compared to NSAIDs like ' + drugName,
            potentialBenefits: 'Safer for patients with a history of GI ulcers or those on anticoagulants.'
        },
        {
            alternative: 'Naproxen',
            reason: 'Longer-acting NSAID, which may allow for less frequent dosing.',
            potentialBenefits: 'Improved patient compliance due to twice-daily dosing regimen.'
        }
    ];
    return simulateNetworkDelay(mockAlternatives);
};

export const extractInfoFromText = async (text: string): Promise<ExtractedInfo[]> => {
  console.log("Simulating text extraction for:", text);
  const mockExtraction: ExtractedInfo[] = [
    {
        drugName: 'Aspirin',
        dosage: '100mg',
        frequency: 'daily',
        duration: 'Ongoing',
    },
    {
        drugName: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'every 6 hours as needed',
        duration: 'As needed for pain',
    }
  ];
  if(text.toLowerCase().includes('amoxicillin')){
      return simulateNetworkDelay([{
          drugName: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'three times daily',
          duration: '7 days'
      }]);
  }
  return simulateNetworkDelay(mockExtraction);
};
