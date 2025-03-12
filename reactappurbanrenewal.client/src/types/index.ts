export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  last_login?: string;
}

export type UserRole = 
  | 'developer'
  | 'lawyer'
  | 'appraiser'
  | 'financialAdvisor'
  | 'professional'
  | 'resident'
  | 'localAuthority'
  | 'governmentOffice';

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: ProjectStatus;
  type: ProjectType;
  created_at: string;
  updated_at: string;
  owner_id: string;
  units_total: number;
  units_sold: number;
  budget: number;
  start_date: string;
  end_date: string;
}

export type ProjectStatus = 
  | 'planning'
  | 'approval'
  | 'construction'
  | 'completed';

export type ProjectType =
  | 'tama38'
  | 'pinuiBinui'
  | 'urbanRenewalOther';

export interface Tender {
  id: string;
  title: string;
  description: string;
  publisher_id: string;
  status: TenderStatus;
  type: ProjectType;
  budget: number;
  location: string;
  deadline: string;
  created_at: string;
  requirements: string[];
  documents: TenderDocument[];
}

export type TenderStatus =
  | 'draft'
  | 'open'
  | 'closed'
  | 'awarded';

export interface TenderDocument {
  id: string;
  tender_id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

export interface TenderApplication {
  id: string;
  tender_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  submitted_at: string;
  company_name: string;
  proposal: string;
  documents: ApplicationDocument[];
}

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'underReview'
  | 'accepted'
  | 'rejected';

export interface ApplicationDocument {
  id: string;
  application_id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: PropertyType;
  size: number;
  units: number;
  status: PropertyStatus;
  owner_id: string;
  project_id?: string;
  created_at: string;
  updated_at: string;
}

export type PropertyType =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'land';

export type PropertyStatus =
  | 'available'
  | 'underConstruction'
  | 'sold'
  | 'rented';

export interface PropertyValuation {
  id: string;
  property_id: string;
  appraiser_id: string;
  value: number;
  date: string;
  method: ValuationMethod;
  factors: ValuationFactors;
  comparables: ComparableProperty[];
  notes: string;
  status: ValuationStatus;
}

export type ValuationMethod =
  | 'comparable'
  | 'income'
  | 'cost'
  | 'development';

export interface ValuationFactors {
  location: number;
  condition: number;
  size: number;
  age: number;
  view: number;
  other?: number;
}

export interface ComparableProperty {
  address: string;
  size: number;
  price: number;
  date: string;
}

export type ValuationStatus =
  | 'draft'
  | 'completed'
  | 'approved'
  | 'rejected';

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  owner_id: string;
  project_id?: string;
  property_id?: string;
  tender_id?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer_id: string;
  project_id?: string;
  property_id?: string;
  attendees: string[];
  status: MeetingStatus;
}

export type MeetingStatus =
  | 'scheduled'
  | 'cancelled'
  | 'completed';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  data: any;
  creator_id: string;
  project_id?: string;
  property_id?: string;
  created_at: string;
  updated_at: string;
}

export type ReportType =
  | 'financial'
  | 'progress'
  | 'valuation'
  | 'sales'
  | 'custom';