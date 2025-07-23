import { JOB_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import type {
  Job,
  CreateJobForm,
  UpdateJobForm,
  JobSearchParams,
  JobApplication,
  CreateJobApplicationForm,
  SavedJob,
  CreateSaveJobForm,
} from "@/interfaces/job";

class JobService extends APIService {
  /**
   * Retrieves all jobs.
   * @returns A promise that resolves to an array of jobs.
   */
  listJobs(): Promise<Job[]> {
    return this.get(JOB_ENDPOINTS.LIST_CREATE_JOB)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Searches for jobs based on provided parameters.
   * @param params - The search parameters.
   * @returns A promise that resolves to an array of jobs.
   */
  searchJobs(params: JobSearchParams): Promise<Job[]> {
    const queryParams = new URLSearchParams();

    console.log(params, "search params");

    if (params.search) queryParams.append("search", params.search);
    if (params.location) queryParams.append("location", params.location);
    if (params.job_type) queryParams.append("job_type", params.job_type);
    if (params.experience_level)
      queryParams.append("experience_level", params.experience_level);
    if (params.salary_min)
      queryParams.append("salary_min", params.salary_min.toString());
    if (params.salary_max)
      queryParams.append("salary_max", params.salary_max.toString());
    if (params.skills) queryParams.append("skills", params.skills);
    if (params.company_id) queryParams.append("company_id", params.company_id);
    if (params.category) queryParams.append("category", params.category);
    if (params.is_active !== undefined)
      queryParams.append("is_active", params.is_active.toString());
    if (params.is_featured !== undefined)
      queryParams.append("is_featured", params.is_featured.toString());

    const url = queryParams.toString()
      ? `${JOB_ENDPOINTS.LIST_CREATE_JOB}?${queryParams.toString()}`
      : JOB_ENDPOINTS.LIST_CREATE_JOB;

    return this.get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new job.
   * @param data - The data for the new job.
   * @returns A promise that resolves to the created job.
   */
  createJob(data: CreateJobForm): Promise<Job> {
    return this.post(JOB_ENDPOINTS.LIST_CREATE_JOB, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieves a job by its ID.
   * @param jobId - The ID of the job to retrieve.
   * @returns A promise that resolves to the job.
   */
  getJob(jobId: string): Promise<Job> {
    return this.get(JOB_ENDPOINTS.JOB_DETAIL(jobId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates a job by its ID.
   * @param jobId - The ID of the job to update.
   * @param data - The data to update the job with.
   * @returns A promise that resolves to the updated job.
   */
  updateJob(jobId: string, data: UpdateJobForm): Promise<Job> {
    return this.put(JOB_ENDPOINTS.JOB_DETAIL(jobId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes a job by its ID.
   * @param jobId - The ID of the job to delete.
   * @returns A promise that resolves to the deleted job.
   */
  deleteJob(jobId: string): Promise<Job> {
    return this.delete(JOB_ENDPOINTS.JOB_DETAIL(jobId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Applies for a job.
   * @param jobId - The ID of the job to apply for.
   * @param data - The application data.
   * @returns A promise that resolves to the job application.
   */
  applyForJob(
    jobId: string,
    data: CreateJobApplicationForm,
  ): Promise<JobApplication> {
    return this.post(JOB_ENDPOINTS.APPLY_FOR_JOB(jobId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets job applications for a specific job.
   * @param jobId - The ID of the job.
   * @returns A promise that resolves to an array of job applications.
   */
  getJobApplications(jobId: string): Promise<JobApplication[]> {
    return this.get(JOB_ENDPOINTS.JOB_APPLICATIONS(jobId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets user's saved jobs.
   * @returns A promise that resolves to an array of saved jobs.
   */
  getSavedJobs(): Promise<SavedJob[]> {
    return this.get(JOB_ENDPOINTS.SAVED_JOBS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Saves a job.
   * @param jobId - The ID of the job to save.
   * @param data - The save job data.
   * @returns A promise that resolves to the saved job.
   */
  saveJob(jobId: string, data?: CreateSaveJobForm): Promise<SavedJob> {
    return this.post(JOB_ENDPOINTS.SAVE_JOB(jobId), data || {})
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Unsaves a job.
   * @param jobId - The ID of the job to unsave.
   * @returns A promise that resolves to the unsaved job.
   */
  unsaveJob(jobId: string): Promise<SavedJob> {
    return this.delete(JOB_ENDPOINTS.UNSAVE_JOB(jobId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets user's job applications.
   * @returns A promise that resolves to an array of job applications.
   */
  getMyApplications(): Promise<JobApplication[]> {
    return this.get(JOB_ENDPOINTS.MY_APPLICATIONS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets a specific job application.
   * @param applicationId - The ID of the application.
   * @returns A promise that resolves to the job application.
   */
  getApplication(applicationId: string): Promise<JobApplication> {
    return this.get(JOB_ENDPOINTS.APPLICATION_DETAIL(applicationId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates a job application.
   * @param applicationId - The ID of the application.
   * @param data - The data to update the application with.
   * @returns A promise that resolves to the updated application.
   */
  updateApplication(
    applicationId: string,
    data: Partial<JobApplication>,
  ): Promise<JobApplication> {
    return this.put(JOB_ENDPOINTS.UPDATE_APPLICATION(applicationId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Withdraws a job application.
   * @param applicationId - The ID of the application.
   * @returns A promise that resolves to the withdrawn application.
   */
  withdrawApplication(applicationId: string): Promise<JobApplication> {
    return this.post(JOB_ENDPOINTS.WITHDRAW_APPLICATION(applicationId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default JobService;
