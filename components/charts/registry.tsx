import type { ChartId } from "@/lib/studies";
import LikertBars from "./LikertBars";
import DistrictGradient from "./DistrictGradient";
import ForestPlot from "./ForestPlot";
import TypologyScatter from "./TypologyScatter";
import ThemeMatrix from "./ThemeMatrix";
import JointDisplay from "./JointDisplay";
import CostComponents from "./CostComponents";
import ErrorShift from "./ErrorShift";

/**
 * Charts are addressed by id from study content, so the data files stay free of
 * JSX and a study can reference a figure without importing it.
 */
export const CHARTS: Record<ChartId, () => React.ReactElement> = {
  "cost-items": LikertBars,
  registers: DistrictGradient,
  "attitude-model": () => <ForestPlot variant="attitude" />,
  "move-out-model": () => <ForestPlot variant="move-out" />,
  typology: TypologyScatter,
  themes: ThemeMatrix,
  "joint-display": JointDisplay,
  "cost-components": CostComponents,
  "error-shift": ErrorShift,
};
