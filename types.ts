
export interface IngredientAnalysis {
  name: string;
  significance: string;
  tradeOffs: string;
  category: 'Beneficial' | 'Neutral' | 'Questionable' | 'Avoid' | 'Allergen' | 'Preservative' | 'Sweetener' | 'Stabilizer';
}

export interface IngredientInteraction {
  name: string;
  description: string;
  impact: 'Synergy' | 'Conflict' | 'Caution';
}

export interface AnalysisResult {
  inferredIntent: string;
  reasoningChain: string;
  ingredients: IngredientAnalysis[];
  ingredientInteractions: IngredientInteraction[];
  uncertaintyDisclaimer: string;
  summary: string;
  suggestedAction: string;
}

export type AppState = 'idle' | 'analyzing' | 'result' | 'error';
