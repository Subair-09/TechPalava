
import React from 'react';

export enum AuthState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// --- Home Advert Types ---
export type AdvertLabel = 'Sponsored' | 'Partner';
export type AdvertStatus = 'Active' | 'Inactive' | 'Scheduled' | 'Expired';

export interface HomeAdvert {
  id: string;
  internalName: string;
  imageUrl: string;
  destinationUrl: string;
  label: AdvertLabel;
  status: AdvertStatus;
  startDate: string;
  endDate: string;
  order: number;
  clickCount: number;
}

// --- Nav & User Types ---
export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  category?: string;
}

export type UserRole = 'Super Admin' | 'Editor-in-Chief' | 'Editor' | 'Contributor' | 'Business' | 'Analyst';
export type UserStatus = 'Active' | 'Suspended';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  dateCreated: string;
  failedAttempts?: number;
  avatar?: string;
}

export interface RolePermission {
  key: string;
  label: string;
  description: string;
}

export const SYSTEM_PERMISSIONS: RolePermission[] = [
  { key: 'create_content', label: 'Create Content', description: 'Can create news and analysis drafts' },
  { key: 'edit_content', label: 'Edit Content', description: 'Can modify existing articles' },
  { key: 'publish_content', label: 'Publish Content', description: 'Can push stories to the live site' },
  { key: 'manage_jobs', label: 'Manage Jobs', description: 'Can review and publish job listings' },
  { key: 'manage_events', label: 'Manage Events', description: 'Can curate the event calendar' },
  { key: 'access_analytics', label: 'Access Analytics', description: 'Can view traffic and performance reports' },
  { key: 'manage_users', label: 'Manage Users', description: 'Can add/edit team members and roles' },
  { key: 'modify_settings', label: 'Modify Settings', description: 'Can change site-wide configurations' },
];

export const ROLE_CAPABILITIES: Record<UserRole, string[]> = {
  'Super Admin': ['create_content', 'edit_content', 'publish_content', 'manage_jobs', 'manage_events', 'access_analytics', 'manage_users', 'modify_settings'],
  'Editor-in-Chief': ['create_content', 'edit_content', 'publish_content', 'manage_jobs', 'manage_events', 'access_analytics'],
  'Editor': ['create_content', 'edit_content', 'publish_content', 'access_analytics'],
  'Contributor': ['create_content', 'edit_content'],
  'Business': ['manage_jobs', 'manage_events', 'access_analytics'],
  'Analyst': ['access_analytics'],
};

// --- Editorial Types ---
export type ContentType = 'News' | 'Analysis' | 'Spotlight' | 'Jobs' | 'Events' | 'Advertise';
export type ArticleStatus = 'Draft' | 'Published' | 'Scheduled';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  type: ContentType;
  category: string;
  author: string;
  authorImage?: string; // New field for author's circular avatar
  status: ArticleStatus;
  publishDate?: string; // ISO datetime string
  lastUpdated: string;
  featuredImage?: string;
  imageCaption?: string;
  tags: string[];
  readingTime: number;
  isFeatured: boolean;
}

// --- Spotlight Types ---
export type SpotlightType = 'Founder' | 'Interview' | 'Feature' | 'Innovator';
export type SpotlightPlacement = 'Homepage Hero' | 'Spotlight Page' | 'Both';
export type SpotlightStatus = 'Draft' | 'Published' | 'Scheduled';

export interface SpotlightEntry {
  id: string;
  title: string;
  personName: string;
  role: string;
  summary: string;
  description?: string;
  type: SpotlightType;
  placement: SpotlightPlacement;
  status: SpotlightStatus;
  imageUrl: string;
  order: number;
  lastUpdated: string;
  isPinned: boolean;
}

// --- Job Types ---
export type JobType = 'Full-time' | 'Contract' | 'Remote' | 'Freelance';
export type JobLocationType = 'Remote' | 'Onsite' | 'Hybrid';
export type JobStatus = 'Draft' | 'Published' | 'Pending' | 'Expired' | 'Rejected';
export type JobListingType = 'Paid' | 'Editorial' | 'Partner';

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  type: JobType;
  location: string;
  locationType: JobLocationType;
  salaryRange: string;
  listingType: JobListingType;
  status: JobStatus;
  datePosted: string;
  expiryDate: string;
  description: string;
  applicationUrl: string;
  isFeatured: boolean;
  price?: number;
  internalNotes?: string;
  submissionSource?: string;
}

// --- Event Types ---
export type EventType = 'Conference' | 'Webinar' | 'Meetup' | 'Product Launch' | 'Hackathon';
export type EventStatus = 'Draft' | 'Published' | 'Scheduled' | 'Ended';
export type EventSource = 'Internal' | 'Public' | 'Partner';

export interface TechEvent {
  id: string;
  title: string;
  summary: string;
  description: string;
  type: EventType;
  organizer: string;
  registrationUrl: string;
  location: string;
  isVirtual: boolean;
  startDate: string;
  endDate: string;
  timezone: string;
  bannerUrl: string;
  status: EventStatus;
  isFeatured: boolean;
  isSponsored: boolean;
  lastUpdated: string;
  internalNotes?: string;
  source: EventSource;
}

// --- Advertising & Partnership Types ---
export type CampaignType = 'Display Ad' | 'Sponsored Article' | 'Sponsored Event' | 'Newsletter Placement';
export type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Pending';
export type PlacementType = 'Homepage Hero' | 'Sidebar' | 'Footer' | 'Article Inline' | 'Newsletter';
export type PaymentStatus = 'Paid' | 'Pending' | 'Complimentary';
export type PartnerTier = 'Standard' | 'Premium' | 'Strategic';

export interface PartnerCampaign {
  id: string;
  brandName: string;
  brandLogo: string;
  campaignTitle: string;
  type: CampaignType;
  placement: PlacementType;
  creativeUrl?: string;
  destinationUrl: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  isFeatured: boolean;
  hasPartnerLabel: boolean;
  value?: number;
  paymentStatus: PaymentStatus;
  tier: PartnerTier;
  internalNotes?: string;
}

export interface CampaignRequest {
  id: string;
  brandName: string;
  contactPerson: string;
  contactEmail: string;
  type: CampaignType | 'Partnership';
  requestedPlacement: string;
  budgetRange: string;
  status: 'New' | 'In Review' | 'Active' | 'Rejected';
  dateSubmitted: string;
  notes?: string;
}

// --- Submission Types ---
export type SubmissionType = 'News' | 'Job' | 'Event' | 'Advertise' | 'Contact';
export type SubmissionStatus = 'New' | 'In Review' | 'Approved' | 'Rejected';

export interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  submittedBy: {
    name: string;
    email: string;
    company?: string;
  };
  content: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  source: string;
  isRead: boolean;
  internalNotes?: string;
  attachments?: string[];
}

// --- Taxonomy Types ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  type: ContentType;
  description: string;
  articleCount: number;
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
  lastUpdated: string;
}
