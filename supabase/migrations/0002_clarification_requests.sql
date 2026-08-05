CREATE TABLE IF NOT EXISTS clarification_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES jornada_submissions(id),
  question      text NOT NULL,
  answer        text,
  status        text NOT NULL DEFAULT 'pending', -- 'pending' | 'answered'
  asked_at      timestamptz NOT NULL DEFAULT now(),
  answered_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Regra de negócio: no máximo uma dúvida pontual por submission (não é chat).
-- Unique já cobre a busca por submission_id, então serve também como índice de lookup.
CREATE UNIQUE INDEX IF NOT EXISTS idx_clarification_submission
  ON clarification_requests (submission_id);

CREATE INDEX IF NOT EXISTS idx_clarification_status
  ON clarification_requests (status);
