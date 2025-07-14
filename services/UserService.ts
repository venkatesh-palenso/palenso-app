import { BaseService, ApiResponse, RequestConfig } from './BaseService';

// Types for user operations
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'student' | 'employer';
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
}

export interface UserStats {
  totalJobs: number;
  totalApplications: number;
  profileViews: number;
  connections: number;
}

export class UserService extends BaseService {
  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000/api'
  ) {
    super(baseURL);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(config?: RequestConfig): Promise<ApiResponse<User>> {
    return this.get<User>('/users/me', config);
  }

  /**
   * Update current user profile
   */
  async updateCurrentUser(
    data: UpdateUserData,
    config?: RequestConfig
  ): Promise<ApiResponse<User>> {
    return this.put<User>('/users/me', data, config);
  }

  /**
   * Get user by ID
   */
  async getUserById(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<User>> {
    return this.get<User>(`/users/${userId}`, config);
  }

  /**
   * Get users with pagination and filters
   */
  async getUsers(
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      role?: 'student' | 'employer';
      location?: string;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{ users: User[]; total: number; page: number; limit: number }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.location) queryParams.append('location', params.location);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/users?${queryString}` : '/users';

    return this.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(
    file: File,
    config?: RequestConfig
  ): Promise<ApiResponse<{ avatar: string }>> {
    return this.uploadFile<{ avatar: string }>(
      '/users/me/avatar',
      file,
      'avatar',
      {},
      config
    );
  }

  /**
   * Delete user avatar
   */
  async deleteAvatar(
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>('/users/me/avatar', config);
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(
    config?: RequestConfig
  ): Promise<ApiResponse<UserPreferences>> {
    return this.get<UserPreferences>('/users/me/preferences', config);
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(
    data: Partial<UserPreferences>,
    config?: RequestConfig
  ): Promise<ApiResponse<UserPreferences>> {
    return this.put<UserPreferences>('/users/me/preferences', data, config);
  }

  /**
   * Get user statistics
   */
  async getUserStats(config?: RequestConfig): Promise<ApiResponse<UserStats>> {
    return this.get<UserStats>('/users/me/stats', config);
  }

  /**
   * Follow a user
   */
  async followUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(
      `/users/${userId}/follow`,
      {},
      config
    );
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(`/users/${userId}/follow`, config);
  }

  /**
   * Get user followers
   */
  async getUserFollowers(
    userId: string,
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      followers: User[];
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
      ? `/users/${userId}/followers?${queryString}`
      : `/users/${userId}/followers`;

    return this.get<{
      followers: User[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Get user following
   */
  async getUserFollowing(
    userId: string,
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      following: User[];
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
      ? `/users/${userId}/following?${queryString}`
      : `/users/${userId}/following`;

    return this.get<{
      following: User[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Check if current user is following another user
   */
  async isFollowingUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ following: boolean }>> {
    return this.get<{ following: boolean }>(
      `/users/${userId}/following-status`,
      config
    );
  }

  /**
   * Block a user
   */
  async blockUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(`/users/${userId}/block`, {}, config);
  }

  /**
   * Unblock a user
   */
  async unblockUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(`/users/${userId}/block`, config);
  }

  /**
   * Get blocked users
   */
  async getBlockedUsers(
    params?: {
      page?: number;
      limit?: number;
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      blockedUsers: User[];
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
      ? `/users/me/blocked?${queryString}`
      : '/users/me/blocked';

    return this.get<{
      blockedUsers: User[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Check if current user is blocked by another user
   */
  async isBlockedByUser(
    userId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ blocked: boolean }>> {
    return this.get<{ blocked: boolean }>(
      `/users/${userId}/block-status`,
      config
    );
  }

  /**
   * Report a user
   */
  async reportUser(
    userId: string,
    reason: string,
    description?: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>(
      `/users/${userId}/report`,
      {
        reason,
        description,
      },
      config
    );
  }

  /**
   * Get user activity feed
   */
  async getUserActivity(
    params?: {
      page?: number;
      limit?: number;
      type?: 'all' | 'posts' | 'jobs' | 'applications';
    },
    config?: RequestConfig
  ): Promise<
    ApiResponse<{
      activities: any[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/users/me/activity?${queryString}`
      : '/users/me/activity';

    return this.get<{
      activities: any[];
      total: number;
      page: number;
      limit: number;
    }>(endpoint, config);
  }

  /**
   * Export user data
   */
  async exportUserData(config?: RequestConfig): Promise<void> {
    return this.downloadFile('/users/me/export', 'user-data.json', config);
  }

  /**
   * Delete user account
   */
  async deleteAccount(
    reason?: string,
    config?: RequestConfig
  ): Promise<ApiResponse<{ message: string }>> {
    // For DELETE requests with body, we need to use a different approach
    // This would require extending the BaseService to support DELETE with body
    return this.delete<{ message: string }>('/users/me', config);
  }
}
