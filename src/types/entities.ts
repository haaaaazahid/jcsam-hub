// ============================================================
// JCSAM HUB - SHARED ENTITY TYPES
// ============================================================
//
// CrudTable<T extends { id: string }> infers T from the `data`
// prop. When a page does `const { data: x = [] } = useHook()`
// and the hook's return type is untyped (services return
// `any`), the empty-array default collapses T down to the
// bare `{ id: string }` constraint, so every other field the
// columns/fields config references throws a TS2339 "property
// does not exist" error.
//
// Declaring the real shapes here and casting the query
// defaults (`data: x = [] as CommitteeMember[]`) gives T a
// concrete shape again and fixes those inference errors
// without touching the underlying Apps Script response shape
// (all fields stay optional/loose since the backend is a
// Google Sheet and can be inconsistently populated).
// ============================================================

export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  rules: string;
  banner_color?: string;
  [key: string]: any;
}

export interface College {
  id: string;
  name: string;
  address?: string;
  contact_person?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  logo_url?: string;
  logoUrl?: string;
  status?: string;
  [key: string]: any;
}

export interface Player {
  id: string;
  name: string;
  college_id?: string;
  sport_id?: string;
  age?: number;
  contact?: string;
  status?: string;
  [key: string]: any;
}

export interface Schedule {
  id: string;
  title: string;
  sport_id?: string;
  team1?: string;
  team2?: string;
  venue?: string;
  date?: string;
  time?: string;
  status?: string;
  [key: string]: any;
}

export interface Result {
  id: string;
  eventName?: string;
  studentName?: string;
  collegeName?: string;
  medal?: string;
  position?: string;
  score?: string;
  [key: string]: any;
}

export interface Notice {
  id: string;
  title: string;
  content?: string;
  sport_id?: string;
  priority?: string;
  date?: string;
  image?: string;
  pdf_url?: string;
  [key: string]: any;
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation?: string;
  role?: string;
  institution?: string;
  display_order?: number;
  image?: string;
  [key: string]: any;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  sport_id?: string;
  category?: string;
  date?: string;
  [key: string]: any;
}
