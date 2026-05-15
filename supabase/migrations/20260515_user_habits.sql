-- user_habits: event-driven behavioural tracking
-- Records any discrete user action across the app.
-- metadata is untyped JSONB — shape is enforced in TypeScript (see lib/habits.ts).

create table if not exists user_habits (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users(id) on delete cascade,
  event_type   text        not null,
  metadata     jsonb       not null default '{}',
  occurred_at  timestamptz not null default now()
);

-- Fast lookups by user + event type (e.g. "how many trades has this user made?")
create index user_habits_user_event_idx  on user_habits (user_id, event_type);
-- Fast time-series queries (e.g. "activity in the last 30 days")
create index user_habits_occurred_at_idx on user_habits (occurred_at desc);

-- Row-level security: users can only read and write their own rows
alter table user_habits enable row level security;

create policy "user_habits: insert own"
  on user_habits for insert
  with check (auth.uid() = user_id);

create policy "user_habits: select own"
  on user_habits for select
  using (auth.uid() = user_id);
