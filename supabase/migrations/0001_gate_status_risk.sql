-- checkout_orders
ALTER TABLE checkout_orders
  ADD COLUMN IF NOT EXISTS gate_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS jornada_submission_id uuid;
-- gate_status: 'pending' | 'approved' | 'blocked_acolhimento'

-- jornada_submissions
ALTER TABLE jornada_submissions
  ADD COLUMN IF NOT EXISTS risk_level      text,
  ADD COLUMN IF NOT EXISTS risk_category   text,
  ADD COLUMN IF NOT EXISTS risk_gate       text,
  ADD COLUMN IF NOT EXISTS risk_excerpts   jsonb,
  ADD COLUMN IF NOT EXISTS risk_reason     text,
  ADD COLUMN IF NOT EXISTS risk_flagged_at timestamptz,
  ADD COLUMN IF NOT EXISTS alert_sent_at   timestamptz;

CREATE INDEX IF NOT EXISTS idx_jornada_risk
  ON jornada_submissions (risk_level)
  WHERE risk_level IN ('amarelo', 'vermelho');

CREATE INDEX IF NOT EXISTS idx_jornada_email
  ON jornada_submissions (email);

CREATE INDEX IF NOT EXISTS idx_orders_gate
  ON checkout_orders (gate_status);
