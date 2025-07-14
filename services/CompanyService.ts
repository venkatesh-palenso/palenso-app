import { BaseService, ApiResponse, RequestConfig } from './BaseService';

// Types for company operations
export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  location: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  founded: number;
  type: 'public' | 'private' | 'non-profit' | 'government';
  employees: number;
  revenue?: string;
  mission?: string;
  values?: string[];
  benefits?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactInfo: {
    email: string;
    phone?: string;
    address?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  verified: boolean;
  jobsCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyData {
  name: string;
  description: string;
  website?: string;
  location: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  founded: number;
  type: 'public' | 'private' | 'non-profit' | 'government';
  employees: number;
  revenue?: string;
  mission?: string;
  values?: string[];
  benefits?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactInfo: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface UpdateCompanyData extends Partial<CreateCompanyData> {
  status?: 'active' | 'inactive' | 'pending';
}

export interface CompanyEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  joinedAt: string;
}

export interface CompanyReview {
  id: string;
  userId: string;
  companyId: string;
  rating: number;
  title: string;
  review: string;
  pros: string;
  cons: string;
  recommend: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateReviewData {
  companyId: string;
  rating: number;
  title: string;
  review: string;
  pros: string;
  cons: string;
  recommend: boolean;
}

export class CompanyService extends BaseService {
  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000/api'
  ) {
    super(baseURL);
  }

  /**
   * Get all companies with filters
   */
  async getCompanies(
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      location?: string;
      industry?: string;
      size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
      type?: 'public' | 'private' | 'non-profit' | 'government';
      verified?: boolean;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.location) queryParams.append('location', params.location);
    if (params?.industry) queryParams.append('industry', params.industry);
    if (params?.size) queryParams.append('size', params.size);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.verified !== undefined)
      queryParams.append('verified', params.verified.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/companies?${queryString}` : '/companies';

    return this.get<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get company by ID
   */
  async getCompanyById(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<Company>> {
    return this.get<Company>(`/companies/${companyId}`, config);
  }

  /**
   * Create a new company
   */
  async createCompany(
    data: CreateCompanyData,
    config?: RequestConfig
  ): Promise<ApiResponse<Company>> {
    return this.post<Company>('/companies', data, config);
  }

  /**
   * Update a company
   */
  async updateCompany(
    companyId: string,
    data: UpdateCompanyData,
    config?: RequestConfig
  ): Promise<ApiResponse<Company>> {
    return this.put<Company>(`/companies/${companyId}`, data, config);
  }

  /**
   * Delete a company
   */
  async deleteCompany(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(`/companies/${companyId}`, config);
  }

  /**
   * Upload company logo
   */
  async uploadLogo(
    companyId: string,
    file: File,
    config?: RequestConfig
  ): Promise<ApiResponse<{ logo: string }>> {
    return this.uploadFile<{ logo: string }>(
      `/companies/${companyId}/logo`,
      file,
      'logo',
      {},
      config
    );
  }

  /**
   * Delete company logo
   */
  async deleteLogo(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(
      `/companies/${companyId}/logo`,
      config
    );
  }

  /**
   * Get company employees
   */
  async getCompanyEmployees(
    companyId: string,
    params?: {
      page?: number;
      limit?: number;
      department?: string;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      employees: CompanyEmployee[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.department) queryParams.append('department', params.department);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/companies/${companyId}/employees?${queryString}`
      : `/companies/${companyId}/employees`;

    return this.get<{
      employees: CompanyEmployee[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Add employee to company
   */
  async addEmployee(
    companyId: string,
    data: {
      name: string;
      email: string;
      role: string;
      department: string;
    },
    config?: RequestConfig
  ): Promise<ApiResponse<CompanyEmployee>> {
    return this.post<CompanyEmployee>(
      `/companies/${companyId}/employees`,
      data,
      config
    );
  }

  /**
   * Remove employee from company
   */
  async removeEmployee(
    companyId: string,
    employeeId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(
      `/companies/${companyId}/employees/${employeeId}`,
      config
    );
  }

  /**
   * Get company reviews
   */
  async getCompanyReviews(
    companyId: string,
    params?: {
      page?: number;
      limit?: number;
      rating?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      reviews: CompanyReview[];
      total: number;
      page: number;
      limit: number;
      averageRating: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.rating) queryParams.append('rating', params.rating.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/companies/${companyId}/reviews?${queryString}`
      : `/companies/${companyId}/reviews`;

    return this.get<{
      reviews: CompanyReview[];
      total: number;
      page: number;
      limit: number;
      averageRating: number;
    }>(endpoint, config);
  }

  /**
   * Create company review
   */
  async createReview(
    data: CreateReviewData,
    config?: RequestConfig
  ): Promise<ApiResponse<CompanyReview>> {
    return this.post<CompanyReview>('/companies/reviews', data, config);
  }

  /**
   * Update company review
   */
  async updateReview(
    reviewId: string,
    data: Partial<CreateReviewData>,
    config?: RequestConfig
  ): Promise<ApiResponse<CompanyReview>> {
    return this.put<CompanyReview>(
      `/companies/reviews/${reviewId}`,
      data,
      config
    );
  }

  /**
   * Delete company review
   */
  async deleteReview(
    reviewId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(
      `/companies/reviews/${reviewId}`,
      config
    );
  }

  /**
   * Follow a company
   */
  async followCompany(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(
      `/companies/${companyId}/follow`,
      {},
      config
    );
  }

  /**
   * Unfollow a company
   */
  async unfollowCompany(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(
      `/companies/${companyId}/follow`,
      config
    );
  }

  /**
   * Get company followers
   */
  async getCompanyFollowers(
    companyId: string,
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      followers: any[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/companies/${companyId}/followers?${queryString}`
      : `/companies/${companyId}/followers`;

    return this.get<{
      followers: any[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Check if user is following company
   */
  async isFollowingCompany(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ following: boolean }>> {
    return this.get<{ following: boolean }>(
      `/companies/${companyId}/following-status`,
      config
    );
  }

  /**
   * Get followed companies
   */
  async getFollowedCompanies(
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/companies/followed?${queryString}`
      : '/companies/followed';

    return this.get<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get company industries
   */
  async getIndustries(
    config?: RequestConfig
  ): Promise<ApiResponse<{ industries: string[] }>> {
    return this.get<{ industries: string[] }>('/companies/industries', config);
  }

  /**
   * Get company statistics
   */
  async getCompanyStats(
    companyId: string,
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      totalJobs: number;
      activeJobs: number;
      totalApplications: number;
      totalReviews: number;
      averageRating: number;
      followersCount: number;
      employeesCount: number;
    }>
  > {
    return this.get<{
      totalJobs: number;
      activeJobs: number;
      totalApplications: number;
      totalReviews: number;
      averageRating: number;
      followersCount: number;
      employeesCount: number;
    }>(`/companies/${companyId}/stats`, config);
  }

  /**
   * Search companies
   */
  async searchCompanies(
    query: string,
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/companies/search?${queryString}`;

    return this.get<{
      companies: Company[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Verify company (admin only)
   */
  async verifyCompany(
    companyId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<Company>> {
    return this.post<Company>(`/companies/${companyId}/verify`, {}, config);
  }

  /**
   * Report a company
   */
  async reportCompany(
    companyId: string,
    reason: string,
    description?: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(
      `/companies/${companyId}/report`,
      {
        reason,
        description,
      },
      config
    );
  }
}
