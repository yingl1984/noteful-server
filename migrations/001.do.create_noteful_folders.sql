CREATE TABLE noteful_folders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  name TEXT NOT NULL
);