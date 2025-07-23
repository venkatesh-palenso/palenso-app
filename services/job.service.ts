import { JOB_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import type {
  Job,
  CreateJobForm,
  UpdateJobForm,
  JobSearchParams,
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

    if (params.search) queryParams.append("search", params.search);
    if (params.location) queryParams.append("location", params.location);
    if (params.job_type) queryParams.append("job_type", params.job_type);
    if (params.experience_level) queryParams.append("experience_level", params.experience_level);
    if (params.salary_min) queryParams.append("salary_min", params.salary_min.toString());
    if (params.salary_max) queryParams.append("salary_max", params.salary_max.toString());
    if (params.skills) queryParams.append("skills", params.skills);
    if (params.company_id) queryParams.append("company_id", params.company_id);
    if (params.category) queryParams.append("category", params.category);
    if (params.is_active !== undefined) queryParams.append("is_active", params.is_active.toString());
    if (params.is_featured !== undefined) queryParams.append("is_featured", params.is_featured.toString());

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
}

export default JobService;
