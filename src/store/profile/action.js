import { defineAction } from '@logux/actions';

const getSets = defineAction('profile/get_game_datasets');
const activateSet = defineAction('profile/activate_dataset');
const deactivateSet = defineAction('profile/deactivate_dataset');
const buySet = defineAction('profile/buy_game_dataset');

export { getSets, activateSet, deactivateSet, buySet };
