import { create } from 'zustand';

function areNotificationsEqual(previous, next) {
  if (previous === next) {
    return true;
  }

  if (!Array.isArray(previous) || !Array.isArray(next)) {
    return false;
  }

  if (previous.length !== next.length) {
    return false;
  }

  return previous.every((item, index) => {
    const nextItem = next[index];

    return (
      item.id === nextItem.id &&
      item.read === nextItem.read &&
      item.title === nextItem.title &&
      item.description === nextItem.description
    );
  });
}

export const useNotificationStore = create((set) => ({
  notifications: [],
  isOpen: false,

  setNotifications: (notifications) =>
    set((state) => {
      if (areNotificationsEqual(state.notifications, notifications)) {
        return state;
      }

      return {
        notifications
      };
    }),

  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen
    })),

  close: () =>
    set({
      isOpen: false
    }),

  markRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    }))
}));