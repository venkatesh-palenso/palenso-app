import { BaseService, ApiResponse, RequestConfig } from './BaseService';

// Types for job operations
export interface Job {
  id: string;
  title: string;
  description: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    location: string;
  };
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  category: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  requirements: string[];
  benefits: string[];
  skills: string[];
  experience: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  education: 'high-school' | 'bachelor' | 'master' | 'phd' | 'any';
  remote: boolean;
  status: 'active' | 'paused' | 'closed' | 'draft';
  applicationsCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
}

export interface CreateJobData {
  title: string;
  description: string;
  companyId: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  category: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  requirements: string[];
  benefits: string[];
  skills: string[];
  experience: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  education: 'high-school' | 'bachelor' | 'master' | 'phd' | 'any';
  remote: boolean;
  deadline?: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  status?: 'active' | 'paused' | 'closed' | 'draft';
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status:
    | 'pending'
    | 'reviewed'
    | 'shortlisted'
    | 'interviewed'
    | 'accepted'
    | 'rejected';
  coverLetter: string;
  resume: string;
  appliedAt: string;
  updatedAt: string;
  job: Job;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface CreateApplicationData {
  jobId: string;
  coverLetter: string;
  resume: File;
}

export interface JobSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  category?: string;
  experience?: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  education?: 'high-school' | 'bachelor' | 'master' | 'phd' | 'any';
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  companyId?: string;
  status?: 'active' | 'paused' | 'closed' | 'draft';
}

export class JobService extends BaseService {
  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000/api'
  ) {
    super(baseURL);
  }

  /**
   * Get all jobs with filters
   */
  async getJobs(
    params?: JobSearchParams,
    config?: RequestConfig
  ): Promise<
    ApiResponse<{ jobs: Job[]; total: number; page: number; limit: number }>
  > {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.location) queryParams.append('location', params.location);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.experience) queryParams.append('experience', params.experience);
    if (params?.education) queryParams.append('education', params.education);
    if (params?.remote !== undefined)
      queryParams.append('remote', params.remote.toString());
    if (params?.salaryMin)
      queryParams.append('salary_min', params.salaryMin.toString());
    if (params?.salaryMax)
      queryParams.append('salary_max', params.salaryMax.toString());
    if (params?.skills)
      params.skills.forEach(skill => queryParams.append('skills', skill));
    if (params?.companyId) queryParams.append('company_id', params.companyId);
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';

    return this.get<{
      jobs: Job[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get job by ID
   */
  async getJobById(
    jobId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<Job>> {
    return this.get<Job>(`/jobs/${jobId}`, config);
  }

  /**
   * Create a new job
   */
  async createJob(
    data: CreateJobData,
    config?: RequestConfig
  ): Promise<ApiResponse<Job>> {
    return this.post<Job>('/jobs', data, config);
  }

  /**
   * Update a job
   */
  async updateJob(
    jobId: string,
    data: UpdateJobData,
    config?: RequestConfig
  ): Promise<ApiResponse<Job>> {
    return this.put<Job>(`/jobs/${jobId}`, data, config);
  }

  /**
   * Delete a job
   */
  async deleteJob(
    jobId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(`/jobs/${jobId}`, config);
  }

  /**
   * Apply for a job
   */
  async applyForJob(
    data: CreateApplicationData,
    config?: RequestConfig
  ): Promise<ApiResponse<JobApplication>> {
    const formData = new FormData();
    formData.append('jobId', data.jobId);
    formData.append('coverLetter', data.coverLetter);
    formData.append('resume', data.resume);

    return this.uploadFile<JobApplication>(
      '/jobs/applications',
      data.resume,
      'resume',
      {
        jobId: data.jobId,
        coverLetter: data.coverLetter,
      },
      config
    );
  }

  /**
   * Get job applications for a job (employer only)
   */
  async getJobApplications(
    jobId: string,
    params?: {
      page?: number;
      limit?: number;
      status?:
        | 'pending'
        | 'reviewed'
        | 'shortlisted'
        | 'interviewed'
        | 'accepted'
        | 'rejected';
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      applications: JobApplication[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/jobs/${jobId}/applications?${queryString}`
      : `/jobs/${jobId}/applications`;

    return this.get<{
      applications: JobApplication[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get user's job applications
   */
  async getUserApplications(
    params?: {
      page?: number;
      limit?: number;
      status?:
        | 'pending'
        | 'reviewed'
        | 'shortlisted'
        | 'interviewed'
        | 'accepted'
        | 'rejected';
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      applications: JobApplication[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/jobs/applications/me?${queryString}`
      : '/jobs/applications/me';

    return this.get<{
      applications: JobApplication[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Update application status (employer only)
   */
  async updateApplicationStatus(
    applicationId: string,
    status:
      | 'pending'
      | 'reviewed'
      | 'shortlisted'
      | 'interviewed'
      | 'accepted'
      | 'rejected',
    config?: RequestConfig
  ): Promise<ApiResponse<JobApplication>> {
    return this.patch<JobApplication>(
      `/jobs/applications/${applicationId}`,
      { status },
      config
    );
  }

  /**
   * Withdraw application
   */
  async withdrawApplication(
    applicationId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(
      `/jobs/applications/${applicationId}`,
      config
    );
  }

  /**
   * Save job to favorites
   */
  async saveJob(
    jobId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(`/jobs/${jobId}/save`, {}, config);
  }

  /**
   * Remove job from favorites
   */
  async unsaveJob(
    jobId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(`/jobs/${jobId}/save`, config);
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs(
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{ jobs: Job[]; total: number; page: number; limit: number }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/jobs/saved?${queryString}` : '/jobs/saved';

    return this.get<{
      jobs: Job[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Check if job is saved
   */
  async isJobSaved(
    jobId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ saved: boolean }>> {
    return this.get<{ saved: boolean }>(`/jobs/${jobId}/saved-status`, config);
  }

  /**
   * Get job categories
   */
  async getJobCategories(
    config?: RequestConfig
  ): Promise<ApiResponse<{ categories: string[] }>> {
    return this.get<{ categories: string[] }>('/jobs/categories', config);
  }

  /**
   * Get job statistics
   */
  async getJobStats(config?: RequestConfig): Promise<
    ApiResponse<{
      totalJobs: number;
      activeJobs: number;
      totalApplications: number;
      pendingApplications: number;
    }>
  > {
    return this.get<{
      totalJobs: number;
      activeJobs: number;
      totalApplications: number;
      pendingApplications: number;
    }>('/jobs/stats', config);
  }

  /**
   * Search jobs by skills
   */
  async searchJobsBySkills(
    skills: string[],
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{ jobs: Job[]; total: number; page: number; limit: number }>
  > {
    const queryParams = new URLSearchParams();
    skills.forEach(skill => queryParams.append('skills', skill));
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/jobs/search/skills?${queryString}`;

    return this.get<{
      jobs: Job[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get similar jobs
   */
  async getSimilarJobs(
    jobId: string,
    params?: {
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<ApiResponse<{ jobs: Job[] }>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/jobs/${jobId}/similar?${queryString}`
      : `/jobs/${jobId}/similar`;

    return this.get<{ jobs: Job[] }>(endpoint, config);
  }

  /**
   * Report a job
   */
  async reportJob(
    jobId: string,
    reason: string,
    description?: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(
      `/jobs/${jobId}/report`,
      {
        reason,
        description,
      },
      config
    );
  }

  /**
   * Get job analytics (employer only)
   */
  async getJobAnalytics(
    jobId: string,
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      views: number;
      applications: number;
      saves: number;
      viewsByDay: Array<{ date: string; count: number }>;
      applicationsByDay: Array<{ date: string; count: number }>;
    }>
  > {
    return this.get<{
      views: number;
      applications: number;
      saves: number;
      viewsByDay: Array<{ date: string; count: number }>;
      applicationsByDay: Array<{ date: string; count: number }>;
    }>(`/jobs/${jobId}/analytics`, config);
  }
}
