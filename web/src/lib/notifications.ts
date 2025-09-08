import { should_never_happen } from "../../../lib/src/should";

export function notifications_init(): HTMLDivElement {
  const notifications = document.createElement('div');
  notifications.classList.add('notifications');
  notifications.id = "notifications";

  return notifications;
}

export function notifications_create(
  html: string,
  type: string = 'success',
  duration: number = 0
): void {
  const notifications_wrapper = document.getElementById('notifications');
  if (!notifications_wrapper) {
    should_never_happen("Notifications wrapper not found");
    return;
  }

  const delete_button = document.createElement("button");
  delete_button.className = "notification-close delete";


  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.classList.add(type);
  notification.appendChild(delete_button);

  const message_html = document.createElement('div');
  message_html.classList.add('notification-message');
  message_html.innerHTML = html;

  notification.appendChild(message_html);

  notifications_wrapper.appendChild(notification);
  delete_button.addEventListener('click', () => {
    try {
      notifications_wrapper.removeChild(notification);
    } catch(_) {
      // Do nothing: the notification was already removed
    }
  });
  if (duration > 0) {
    setTimeout(() => {
      try {
        notifications_wrapper.removeChild(notification);
      } catch(_) {
        // Do nothing: the notification was already removed
      }
    }, duration);
  }
}