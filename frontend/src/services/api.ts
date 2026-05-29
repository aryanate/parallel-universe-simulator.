export interface UniverseItem {
  name: string;
  title: string;
  storySummary: string;
  keyLesson: string;
  emotionalTone: string;
  probabilityScore: number;
}

export interface UniverseResponse {
  universeId: string;
  primaryTrait: string;
  reflectionQuote: string;
  currentTimelineTitle: string;
  mostProbableAlternateTitle: string;
  universes: UniverseItem[];
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5069') + '/api';

export async function generateUniverseReport(decision: string): Promise<UniverseResponse> {
  const response = await fetch(`${API_BASE_URL}/universe/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ decision }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to scan timelines. The cosmos is unstable.');
  }

  return response.json();
}
