export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
}

export interface ComponentFilter {
  search: string;
  category: string;
}