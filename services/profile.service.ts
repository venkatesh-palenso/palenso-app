import APIService from "./api.service";
import { PROFILE_ITEMS_ENDPOINTS } from "@/constants/endpoints";

class ProfileService extends APIService {
  /**
   * Lists all experiences for a given profile ID.
   * @returns A promise that resolves to the list of experiences.
   */
  listExperiences() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_EXPERIENCES)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Lists all educations for a given profile ID.
   * @returns A promise that resolves to the list of educations.
   */
  listEducations() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_EDUCATIONS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Lists all projects for a given profile ID.
   * @returns A promise that resolves to the list of projects.
   */
  listProjects() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_PROJECTS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Lists all skills for a given profile ID.
   * @returns A promise that resolves to the list of skills.
   */
  listSkills() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_SKILLS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Lists all resumes for a given profile ID.
   * @returns A promise that resolves to the list of resumes.
   */
  listResumes() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_RESUMES)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Lists all interests for a given profile ID.
   * @returns A promise that resolves to the list of interests.
   */
  listInterests() {
    return this.get(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_INTERESTS)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new experience for a given profile ID.
   * @param data - The data for the new experience.
   * @returns A promise that resolves to the created experience.
   */
  createExperience(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_EXPERIENCES, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new education for a given profile ID.
   * @param data - The data for the new education.
   * @returns A promise that resolves to the created education.
   */
  createEducation(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_EDUCATIONS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new project for a given profile ID.
   * @param data - The data for the new project.
   * @returns A promise that resolves to the created project.
   */
  createProject(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_PROJECTS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new skill for a given profile ID.
   * @param data - The data for the new skill.
   * @returns A promise that resolves to the created skill.
   */
  createSkill(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_SKILLS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new resume for a given profile ID.
   * @param data - The data for the new resume.
   * @returns A promise that resolves to the created resume.
   */
  createResume(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_RESUMES, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new interest for a given profile ID.
   * @param data - The data for the new interest.
   * @returns A promise that resolves to the created interest.
   */
  createInterest(data: any) {
    return this.post(PROFILE_ITEMS_ENDPOINTS.LIST_CREATE_INTERESTS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing experience for a given profile ID.
   * @param experienceId - The ID of the experience to update.
   * @param data - The data for the updated experience.
   * @returns A promise that resolves to the updated experience.
   */
  updateExperience(experienceId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.EXPERIENCE_INFO(experienceId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing education for a given profile ID.
   * @param educationId - The ID of the education to update.
   * @param data - The data for the updated education.
   * @returns A promise that resolves to the updated education.
   */
  updateEducation(educationId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.EDUCATION_INFO(educationId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing project for a given profile ID.
   * @param projectId - The ID of the project to update.
   * @param data - The data for the updated project.
   * @returns A promise that resolves to the updated project.
   */
  updateProject(projectId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.PROJECT_INFO(projectId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing skill for a given profile ID.
   * @param skillId - The ID of the skill to update.
   * @param data - The data for the updated skill.
   * @returns A promise that resolves to the updated skill.
   */
  updateSkill(skillId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.SKILL_INFO(skillId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing resume for a given profile ID.
   * @param resumeId - The ID of the resume to update.
   * @param data - The data for the updated resume.
   * @returns A promise that resolves to the updated resume.
   */
  updateResume(resumeId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.RESUME_INFO(resumeId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an existing interest for a given profile ID.
   * @param interestId - The ID of the interest to update.
   * @param data - The data for the updated interest.
   * @returns A promise that resolves to the updated interest.
   */
  updateInterest(interestId: string, data: any) {
    return this.put(PROFILE_ITEMS_ENDPOINTS.INTEREST_INFO(interestId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing experience for a given profile ID.
   * @param experienceId - The ID of the experience to delete.
   * @returns A promise that resolves to the deleted experience.
   */
  deleteExperience(experienceId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.EXPERIENCE_INFO(experienceId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing education for a given profile ID.
   * @param educationId - The ID of the education to delete.
   * @returns A promise that resolves to the deleted education.
   */
  deleteEducation(educationId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.EDUCATION_INFO(educationId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing project for a given profile ID.
   * @param projectId - The ID of the project to delete.
   * @returns A promise that resolves to the deleted project.
   */
  deleteProject(projectId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.PROJECT_INFO(projectId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing skill for a given profile ID.
   * @param skillId - The ID of the skill to delete.
   * @returns A promise that resolves to the deleted skill.
   */
  deleteSkill(skillId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.SKILL_INFO(skillId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing resume for a given profile ID.
   * @param resumeId - The ID of the resume to delete.
   * @returns A promise that resolves to the deleted resume.
   */
  deleteResume(resumeId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.RESUME_INFO(resumeId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an existing interest for a given profile ID.
   * @param interestId - The ID of the interest to delete.
   * @returns A promise that resolves to the deleted interest.
   */
  deleteInterest(interestId: string) {
    return this.delete(PROFILE_ITEMS_ENDPOINTS.INTEREST_INFO(interestId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default ProfileService;
