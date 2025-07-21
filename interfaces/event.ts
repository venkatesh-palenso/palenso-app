// Event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  company_id: string;
  employer_id: string;
  type:
    | "Career Fair"
    | "Workshop"
    | "Networking"
    | "Conference"
    | "Webinar"
    | "Hackathon";
  category: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  location: string;
  venue?: string;
  is_online: boolean;
  online_url?: string;
  max_attendees?: number;
  current_attendees: number;
  registration_deadline: string;
  price: {
    amount: number;
    currency: string;
    is_free: boolean;
  };
  image_url?: string;
  status: "Draft" | "Published" | "Active" | "Completed" | "Cancelled";
  tags: string[];
  requirements?: string[];
  agenda?: string[];
  speakers?: Speaker[];
  created_at: string;
  updated_at: string;
}

// Speaker interface
export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

// Event registration interface
export interface EventRegistration {
  id: string;
  event_id: string;
  student_id: string;
  employer_id: string;
  status: "Registered" | "Attended" | "Cancelled" | "No-show";
  registration_date: string;
  attended_date?: string;
  feedback?: string;
  rating?: number;
  notes?: string;
}

// Event form interfaces
export interface CreateEventForm {
  title: string;
  description: string;
  type:
    | "Career Fair"
    | "Workshop"
    | "Networking"
    | "Conference"
    | "Webinar"
    | "Hackathon";
  category: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  location: string;
  venue?: string;
  is_online: boolean;
  online_url?: string;
  max_attendees?: number;
  registration_deadline: string;
  price: {
    amount: number;
    currency: string;
    is_free: boolean;
  };
  image?: File;
  tags: string[];
  requirements?: string[];
  agenda?: string[];
  speakers?: Omit<Speaker, "id">[];
}

export interface UpdateEventForm extends Partial<CreateEventForm> {
  id: string;
  status?: "Draft" | "Published" | "Active" | "Completed" | "Cancelled";
}

// Event registration form interface
export interface CreateEventRegistrationForm {
  event_id: string;
  additional_notes?: string;
}
