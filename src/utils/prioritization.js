// Product Prioritization Formulas (RICE, Kano, Opportunity, Value vs Effort)

export function calculateRice(reach, impact, confidence, effort) {
  const r = parseFloat(reach) || 0;
  const i = parseFloat(impact) || 1.0;
  const c = (parseFloat(confidence) || 100) / 100;
  const e = Math.max(0.1, parseFloat(effort) || 1.0);

  return Math.round(((r * i * c) / e) * 10) / 10;
}

export function calculateOpportunityScore(importance, satisfaction) {
  const imp = parseFloat(importance) || 0;
  const sat = parseFloat(satisfaction) || 0;
  const gap = Math.max(imp - sat, 0);
  return Math.round((imp + gap) * 10) / 10;
}

export function getQuadrant(valueScore, effortScore) {
  const v = parseFloat(valueScore) || 0;
  const e = parseFloat(effortScore) || 0;

  if (v >= 50 && e < 50) {
    return {
      name: "Quick Win",
      color: "emerald",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: "High impact with manageable technical effort. Must be prioritized in immediate sprints."
    };
  }
  if (v >= 50 && e >= 50) {
    return {
      name: "Major Strategic Bet",
      color: "brand",
      badgeClass: "bg-brand-500/10 text-brand-400 border-brand-500/20",
      description: "Transformative feature requiring high architectural investment. Plan for Q1/Q2 roadmap."
    };
  }
  if (v < 50 && e < 50) {
    return {
      name: "Fill-In",
      color: "amber",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: "Low-effort, moderate utility enhancements suitable for buffer sprints."
    };
  }
  return {
    name: "Thankless Task",
    color: "rose",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    description: "High effort with low customer perceived value. Highly recommend deprioritizing."
  };
}
