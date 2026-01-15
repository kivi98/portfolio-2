// Types for Credly API responses

export interface CredlyIssuerEntity {
  type: string;
  id: string;
  name: string;
  url: string;
  vanity_url: string;
}

export interface CredlyIssuer {
  summary: string;
  entities: Array<{
    label: string;
    primary: boolean;
    entity: CredlyIssuerEntity;
  }>;
}

export interface CredlyBadgeTemplate {
  id: string;
  name: string;
  description: string;
  image_url: string;
  url: string;
  skills?: Array<{
    id: string;
    name: string;
    vanity_slug: string;
  }>;
  issuer: CredlyIssuer;
}

export interface CredlyBadge {
  id: string;
  issued_at: string;
  issued_at_date: string;
  expires_at?: string;
  expires_at_date?: string;
  issued_to: string;
  state: string;
  public: boolean;
  image_url: string;
  earner_path: string;
  issuer: CredlyIssuer;
  badge_template: CredlyBadgeTemplate;
  image: {
    id: string;
    url: string;
  };
}

export interface CredlyApiResponse {
  data: CredlyBadge[];
  metadata: {
    count: number;
    current_page: number;
    total_count: number;
    total_pages: number;
    per: number;
    previous_page_url: string | null;
    next_page_url: string | null;
  };
}

export interface CredlyBadgeDisplay {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuer: string;
  issuedDate: string;
  expiresDate?: string;
  credlyUrl: string;
  skills?: string[];
  issuedTo: string;
}
