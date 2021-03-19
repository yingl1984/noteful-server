CREATE TABLE noteful_notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  name TEXT NOT NULL,
  modified TIMESTAMP DEFAULT now() NOT NULL,
  folder_id uuid,
  FOREIGN KEY (folder_id) REFERENCES "noteful_folders" (id),
  content TEXT NOT NULL
);