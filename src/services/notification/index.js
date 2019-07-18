
const notifications = [
  {
    id: 'DEV716627',
    title: 'New order has been received',
    when: '2 hours ago',
    type: 'order',
    to: '/orders/DEV730658'
  },
  {
    id: 'DEV853890',
    title: 'New customer is registered',
    when: '3 hours ago',
    type: 'user',
    to: '/users/DEV696649'
  },
  {
    id: 'DEV897704',
    title: 'Product has been approved',
    when: '1 day ago',
    type: 'product',
    to: '/products/DEV654476'
  },
  {
    id: 'DEV604714',
    title: 'New feature has been added',
    when: '2 day ago',
    type: 'feature',
    to: '/features'
  }
];

export const getNotifications = (limit = 6) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        notifications: notifications.slice(0, limit),
        notificationsCount: notifications.length
      });
    }, 700);
  });
};
