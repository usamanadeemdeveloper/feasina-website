// Business operates in Pakistan -- PKR, "Rs" prefix, no decimals for
// whole-rupee amounts (the everyday retail/invoice convention there, not the
// 2-decimal accounting style). Plain Western digit grouping (en-US), not
// en-PK/en-IN, which would group as lakhs (1,95,000) instead of 195,000.
const amountFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatCurrency(amount: number): string {
  return `Rs ${amountFormatter.format(amount)}`;
}
