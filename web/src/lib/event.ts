export type EventListener<T> = (data: T) => void;
export interface Events {
  building_action_start: {
    id: number,
    action: string,
    chance: number,
    duration: number
  },
  building_action_end: {
    id: number,
    action: string,
    success: boolean
  }
}

const event_listeners: Map<string, EventListener<any>[]> = new Map();

export function event_on<T>(event: string, listener: EventListener<T>): void {
  if (!event_listeners.has(event)) {
    event_listeners.set(event, []);
  }
  event_listeners.get(event)!.push(listener);
}

export function event_off<T>(event: string, listener: EventListener<T>): void {
  const listeners = event_listeners.get(event);
  if (listeners) {
    event_listeners.set(
      event,
      listeners.filter((l) => l !== listener)
    );
  }
}

export function event_emit<T>(event: string, data: T): void {
  const listeners = event_listeners.get(event);
  if (listeners) {
    listeners.forEach((listener) => listener(data));
  }
}