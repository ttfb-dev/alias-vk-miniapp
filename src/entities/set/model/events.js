import { defineAction } from '@logux/actions';

const getSets = defineAction('profile/get_game_datasets');
const activateSet = defineAction('profile/activate_dataset');
const deactivateSet = defineAction('profile/deactivate_dataset');

export const actions = {
  getSets,
  activateSet,
  deactivateSet,
};
