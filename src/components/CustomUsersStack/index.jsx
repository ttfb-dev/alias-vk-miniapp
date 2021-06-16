import React, { useMemo } from 'react';
import { UsersStack } from '@vkontakte/vkui';

import { declension } from '../../helpers';

const CustomUsersStack = ({ photos, firstNames, visibleCount, ...props }) => {
  const othersFirstNameCount = useMemo(() => Math.max(0, firstNames.length - visibleCount), [firstNames, visibleCount]);
  const canShowOthers = useMemo(() => othersFirstNameCount > 0, [othersFirstNameCount]);
  const firstNamesShown = useMemo(() => firstNames.slice(0, visibleCount), [firstNames, visibleCount]);
  const declensionForm = useMemo(
    () => declension(othersFirstNameCount, ['человек', 'человека', 'человек']),
    [othersFirstNameCount],
  );
  const getFirstNames = useMemo(
    () => firstNamesShown.reduce((acc, firstName, index) => `${acc}${index === 0 ? '' : ', '}${firstName}`, ''),
    [firstNamesShown],
  );

  return (
    <UsersStack {...props} photos={photos} visibleCount={visibleCount}>
      {getFirstNames}
      {canShowOthers && ` и ещё ${othersFirstNameCount} ${declensionForm}`}
    </UsersStack>
  );
};

export { CustomUsersStack };
