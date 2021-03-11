CREATE TABLE noteful_notes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  note_title TEXT NOT NULL,
  note_content TEXT NOT NULL,
  date_modified TIMESTAMP DEFAULT now() NOT NULL,
  folder_id INTEGER REFERENCES noteful_folders(id) ON DELETE CASCADE NOT NULL
);