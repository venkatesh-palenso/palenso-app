import { EVENT_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import type {
  Event,
  CreateEventForm,
  UpdateEventForm,
  EventSearchParams,
  EventRegistration,
  CreateEventRegistrationForm,
} from "@/interfaces/event";

class EventService extends APIService {
  /**
   * Retrieves all events.
   * @returns A promise that resolves to an array of events.
   */
  listEvents(): Promise<Event[]> {
    return this.get(EVENT_ENDPOINTS.LIST_CREATE_EVENT)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Searches for events based on provided parameters.
   * @param params - The search parameters.
   * @returns A promise that resolves to an array of events.
   */
  searchEvents(params: EventSearchParams): Promise<Event[]> {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.event_type) queryParams.append("event_type", params.event_type);
    if (params.location) queryParams.append("location", params.location);
    if (params.start_date) queryParams.append("start_date", params.start_date);
    if (params.end_date) queryParams.append("end_date", params.end_date);
    if (params.is_virtual !== undefined)
      queryParams.append("is_virtual", params.is_virtual.toString());
    if (params.registration_fee_min)
      queryParams.append(
        "registration_fee_min",
        params.registration_fee_min.toString(),
      );
    if (params.registration_fee_max)
      queryParams.append(
        "registration_fee_max",
        params.registration_fee_max.toString(),
      );
    if (params.company_id) queryParams.append("company_id", params.company_id);
    if (params.is_active !== undefined)
      queryParams.append("is_active", params.is_active.toString());
    if (params.is_featured !== undefined)
      queryParams.append("is_featured", params.is_featured.toString());

    const url = queryParams.toString()
      ? `${EVENT_ENDPOINTS.LIST_CREATE_EVENT}?${queryParams.toString()}`
      : EVENT_ENDPOINTS.LIST_CREATE_EVENT;

    return this.get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Creates a new event.
   * @param data - The data for the new event.
   * @returns A promise that resolves to the created event.
   */
  createEvent(data: CreateEventForm): Promise<Event> {
    return this.post(EVENT_ENDPOINTS.LIST_CREATE_EVENT, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieves an event by its ID.
   * @param eventId - The ID of the event to retrieve.
   * @returns A promise that resolves to the event.
   */
  getEvent(eventId: string): Promise<Event> {
    return this.get(EVENT_ENDPOINTS.EVENT_DETAIL(eventId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates an event by its ID.
   * @param eventId - The ID of the event to update.
   * @param data - The data to update the event with.
   * @returns A promise that resolves to the updated event.
   */
  updateEvent(eventId: string, data: UpdateEventForm): Promise<Event> {
    return this.put(EVENT_ENDPOINTS.EVENT_DETAIL(eventId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes an event by its ID.
   * @param eventId - The ID of the event to delete.
   * @returns A promise that resolves to the deleted event.
   */
  deleteEvent(eventId: string): Promise<Event> {
    return this.delete(EVENT_ENDPOINTS.EVENT_DETAIL(eventId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Registers for an event.
   * @param eventId - The ID of the event to register for.
   * @param data - The registration data.
   * @returns A promise that resolves to the event registration.
   */
  registerForEvent(
    eventId: string,
    data: CreateEventRegistrationForm,
  ): Promise<EventRegistration> {
    return this.post(EVENT_ENDPOINTS.REGISTER_FOR_EVENT(eventId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Unregisters from an event.
   * @param eventId - The ID of the event to unregister from.
   * @returns A promise that resolves to the unregistered event.
   */
  unregisterFromEvent(eventId: string): Promise<EventRegistration> {
    return this.post(EVENT_ENDPOINTS.UNREGISTER_FOR_EVENT(eventId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets event registrations for a specific event.
   * @param eventId - The ID of the event.
   * @returns A promise that resolves to an array of event registrations.
   */
  getEventRegistrations(eventId: string): Promise<EventRegistration[]> {
    return this.get(EVENT_ENDPOINTS.EVENT_REGISTRATIONS(eventId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default EventService;
