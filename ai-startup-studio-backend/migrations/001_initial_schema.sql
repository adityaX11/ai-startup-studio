CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'local',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE startup_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  industry TEXT,
  stage TEXT NOT NULL DEFAULT 'Idea',
  status TEXT NOT NULL DEFAULT 'Draft',
  progress SMALLINT NOT NULL DEFAULT 0
    CHECK (progress BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX startup_projects_owner_id_idx
  ON startup_projects(owner_id);

CREATE INDEX startup_projects_updated_at_idx
  ON startup_projects(updated_at DESC);

CREATE TABLE startup_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not-started',
  progress SMALLINT NOT NULL DEFAULT 0
    CHECK (progress BETWEEN 0 AND 100),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (startup_id, module_key)
);

CREATE INDEX startup_modules_startup_id_idx
  ON startup_modules(startup_id);

CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  artifact_type TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_label TEXT,
  confidence TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX artifacts_startup_module_idx
  ON artifacts(startup_id, module_key);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  startup_id UUID REFERENCES startup_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  href TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX notifications_user_created_idx
  ON notifications(user_id, created_at DESC);

CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  startup_id UUID REFERENCES startup_projects(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX audit_events_startup_created_idx
  ON audit_events(startup_id, created_at DESC);