import vkapi from '@/shared/api';

const CREATE = 'create';
const RESUME = 'resume';
const CANCEL = 'cancel';
const ITEM = 'subscription_base';

export const subscriptionService = () => {
  return {
    create: async () => {
      await vkapi.showSubscriptionBox({ action: CREATE, item: ITEM });
    },

    resume: async (subscription_id) => {
      await vkapi.showSubscriptionBox({ action: RESUME, item: ITEM, subscription_id });
    },

    cancel: async (subscription_id) => {
      await vkapi.showSubscriptionBox({ action: CANCEL, item: ITEM, subscription_id });
    },
  };
};
