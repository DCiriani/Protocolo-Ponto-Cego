export const PONTO20_CODE = "PONTO20";
export const PONTO20_DISCOUNT_PERCENT = 20;
export const PONTO20_PLAN = "leitura_ponto20";

export function normalizeCoupon(value?: string | null) {
  return (value ?? "").trim().toUpperCase();
}

export function isPonto20Coupon(value?: string | null) {
  return normalizeCoupon(value) === PONTO20_CODE;
}

export function resolveOrderPlan(plan?: string, coupon?: string | null) {
  if (plan === "leitura_devolutiva") {
    return "leitura_devolutiva";
  }

  return isPonto20Coupon(coupon) ? PONTO20_PLAN : "leitura";
}

export function isPonto20Plan(plan?: string | null) {
  return plan === PONTO20_PLAN;
}

export function applyPonto20Discount(price: number) {
  return Math.round(price * (1 - PONTO20_DISCOUNT_PERCENT / 100) * 100) / 100;
}

export function getPlanPrice(
  plan: string | null | undefined,
  basePrice: number,
  premiumPrice: number,
) {
  if (plan === "leitura_devolutiva") {
    return premiumPrice;
  }

  if (isPonto20Plan(plan)) {
    return applyPonto20Discount(basePrice);
  }

  return basePrice;
}
