import type { ChartId } from "@/lib/studies";
import LikertBars from "./LikertBars";
import DistrictGradient from "./DistrictGradient";
import ForestPlot from "./ForestPlot";
import TypologyScatter from "./TypologyScatter";
import ThemeMatrix from "./ThemeMatrix";
import JointDisplay from "./JointDisplay";
import VarianceCollapse from "./VarianceCollapse";
import AdminDistribution from "./AdminDistribution";
import ConstantsNotDistributions from "./ConstantsNotDistributions";
import ClaimSurvival from "./ClaimSurvival";

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
  "variance-collapse": VarianceCollapse,
  "admin-distribution": AdminDistribution,
  "constants-not-distributions": ConstantsNotDistributions,
  "claim-survival": ClaimSurvival,
};
