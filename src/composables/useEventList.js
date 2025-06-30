import {ref} from 'vue';
import {_uuid} from "../utils/uuidv4.js";

export const eventList = ref({});

export const addEventToList = event => {

    if (eventList.value[event.id]) throw new Error(`event with id=${event.id} is already registered`);
    else {
        eventList.value[event.id || _uuid()] = {
            ...event,
            id: event.id || _uuid(),
        }
    }
}

export const updateEventInList = (eventId, event) => {
    eventList.value[eventId] = event;
};

export const deleteEventInList = eventId => {
    delete (eventList.value[eventId]);
};
