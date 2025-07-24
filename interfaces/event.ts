// Event interface based on Django Event model
export interface Event {
  id: string;
  organizer_id: string;
  organizer_name: string;
  organizer_email: string;
  organizer_phone?: string;
  company_id?: string;
  title: string;
  description: string;
  event_type:
    | "workshop"
    | "seminar"
    | "conference"
    | "hackathon"
    | "career_fair"
    | "networking"
    | "webinar"
    | "other";
  start_date: string;
  end_date: string;
  registration_deadline?: string;
  location: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  max_participants?: number;
  is_registration_required: boolean;
  registration_fee: number;
  banner_image_url?: string;
  tags?: string;
  requirements?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Event registration interface based on Django EventRegistration model
export interface EventRegistration {
  id: string;
  event_id: string;
  participant_id: string;
  registration_date: string;
  status: "registered" | "confirmed" | "attended" | "cancelled" | "no_show";
  dietary_restrictions?: string;
  special_requirements?: string;
  notes?: string;
  payment_status: "pending" | "paid" | "refunded";
  payment_amount: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Event form interfaces
export interface CreateEventForm {
  title: string;
  description: string;
  event_type:
    | "workshop"
    | "seminar"
    | "conference"
    | "hackathon"
    | "career_fair"
    | "networking"
    | "webinar"
    | "other";
  start_date: string;
  end_date: string;
  registration_deadline?: string;
  location: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  max_participants?: number;
  is_registration_required: boolean;
  registration_fee: number;
  banner_image_url?: string;
  tags?: string;
  requirements?: string;
}

export interface UpdateEventForm extends Partial<CreateEventForm> {
  id: string;
  is_active?: boolean;
  is_featured?: boolean;
}

// Event registration form interface
export interface CreateEventRegistrationForm {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  event_id: string;
  dietary_restrictions?: string;
  special_requirements?: string;
  notes?: string;
}

// Event search and filter interfaces
export interface EventSearchParams {
  search?: string;
  event_type?:
    | "workshop"
    | "seminar"
    | "conference"
    | "hackathon"
    | "career_fair"
    | "networking"
    | "webinar"
    | "other";
  location?: string;
  start_date?: string;
  end_date?: string;
  is_virtual?: boolean;
  registration_fee_min?: number;
  registration_fee_max?: number;
  company_id?: string;
  is_active?: boolean;
  is_featured?: boolean;
}

// Event recommendation interface
export interface EventRecommendation {
  event_id: string;
  event_title: string;
  company_name: string;
  event_type: string;
  start_date: string;
  match_score: number;
  reason: string;
  skills_related: string[];
  created_at: string;
}

// Event analytics interface
export interface EventAnalytics {
  id: string;
  event_id: string;
  views_count: number;
  registrations_count: number;
  attendance_count: number;
  shares_count: number;
  conversion_rate: number;
  average_rating?: number;
  feedback_count: number;
  created_at: string;
  updated_at: string;
}
