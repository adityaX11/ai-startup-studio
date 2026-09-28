import apiClient from '@/services/apiClient.js';
import { isMockMode } from '@/services/apiMode.js';
import { mockNotifications } from '@/mock/notificationData.js';

export async function getNotifications() {
  if (isMockMode()) {
    return mockNotifications;
  }

  const response = await apiClient.get('/notifications');
  return response.data;
}

export async function markNotificationRead(notificationId) {
  if (isMockMode()) {
    return { id: notificationId, read: true };
  }

  const response = await apiClient.patch(`/notifications/${notificationId}/read`);
  return response.data;
}

export async function markAllNotificationsRead() {
  if (isMockMode()) {
    return { success: true };
  }

  const response = await apiClient.patch('/notifications/read-all');
  return response.data;
}