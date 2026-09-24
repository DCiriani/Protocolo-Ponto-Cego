export const PONTO20_CODE = "PONTO20";
export const PONTO20_DISCOUNT_PERCENT = 20;

export function normalizeCoupon(value?: string | null) {
  return (value ?? "").trim().toUpperCase();
}

export function isPonto20Coupon(value?: string | null) {
  return normalizeCoupon(value) === PONTO20_CODE;
}

export function applyPonto20Discount(price: number) {
  return Math.round(price * (1 - PONTO20_DISCOUNT_PERCENT / 100) * 100) / 100;
}

export function getCouponFromRawPayload(rawPayload: unknown) {
  if (
    typeof rawPayload === "object" &&
    rawPayload !== null &&
    "coupon" in rawPayload &&
    typeof (rawPayload as { coupon?: unknown }).coupon === "string"
  ) {
    return normalizeCoupon((rawPayload as { coupon: string }).coupon);
  }

  return null;
}

export function getPlanPrice(
  plan: string | null | undefined,
  coupon: string | null | undefined,
  basePrice: number,
  premiumPrice: number,
) {
  if (plan === "leitura_devolutiva") {
    return premiumPrice;
  }

  if (plan === "leitura" && isPonto20Coupon(coupon)) {
    return applyPonto20Discount(basePrice);
  }

  return basePrice;
}
