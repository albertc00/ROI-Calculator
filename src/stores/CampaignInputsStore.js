import { derived, writable } from 'svelte/store';

export const totalTargetAccounts = writable(2000);
export const campaignSetupCost = writable(1000);
export const costPerTerm = writable(20000);
export const termcontract = writable(4);

export const totalInvestment = derived(
  [termcontract, campaignSetupCost, costPerTerm],
  ([$termcontract, $campaignSetupCost, $costPerTerm]) =>
    $termcontract * $costPerTerm + $campaignSetupCost
);

export const costPerTermTotal = derived(
  [termcontract, totalInvestment],
  ([$termcontract, $totalInvestment]) => $totalInvestment / $termcontract
);
