import { useEffect } from 'react';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from '@/services/notificationService.js';
import { useNotificationStore } from '@/store/notificationStore.js';

function NotificationCenter() {
  const queryClient = useQueryClient();

  const {
    notifications,
    isOpen,
    setNotifications,
    toggleOpen,
    close,
    markRead,
    markAllRead
  } = useNotificationStore();

  const notificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    staleTime: 30 * 1000
    });

const notificationsData = notificationsQuery.data;

  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: (_, notificationId) => {
      markRead(notificationId);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const markAllMutation = useMutation({
        mutationFn: markAllNotificationsRead,
        onSuccess: () => {
        markAllRead();
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    useEffect(() => {
    if (notificationsData) {
        setNotifications(notificationsData);
    }
    }, [notificationsData, setNotifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        className="relative rounded-xl border border-slate-800 p-2 text-slate-300 hover:bg-slate-800"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={isOpen}
      >
        <Bell size={18} />

        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={close}
            aria-label="Close notifications"
          />

          <section className="absolute right-0 z-50 mt-3 w-[min(92vw,380px)] rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Activity center
                </p>
                <h2 className="mt-1 font-semibold text-white">
                  Notifications
                </h2>
              </div>

              <button
                type="button"
                onClick={() => markAllMutation.mutate()}
                disabled={!unreadCount || markAllMutation.isPending}
                className="inline-flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 disabled:opacity-50"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            </div>

            <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="rounded-xl bg-slate-950/50 p-5 text-center text-sm text-slate-500">
                  You are all caught up.
                </p>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    to={notification.href}
                    onClick={() => {
                      if (!notification.read) {
                        markReadMutation.mutate(notification.id);
                      }
                      close();
                    }}
                    className={`block rounded-xl border p-3 transition hover:border-indigo-500/40 ${
                      notification.read
                        ? 'border-slate-800 bg-slate-950/40'
                        : 'border-indigo-500/20 bg-indigo-500/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-200">
                        {notification.title}
                      </p>
                      <ExternalLink size={14} className="shrink-0 text-slate-500" />
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {notification.description}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-600">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default NotificationCenter;