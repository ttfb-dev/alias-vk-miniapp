import React, { Fragment, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderEdit,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  List,
  Group,
  Cell,
  MiniInfoCell,
  Button,
  Spacing,
  FixedLayout,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon24Add, Icon24Dismiss } from '@vkontakte/icons';

// import { room } from '../../../store';

const Teams = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const teams = useSelector((state) => state.room.teams);
  const ownerId = useSelector((state) => state.room.owner);
  const userId = useSelector((state) => state.general.userId);
  const members = useSelector((state) => state.general.members);
  const [isActive, setIsActive] = useState(false);
  const [checked, setChecked] = useState();

  const onRemove = (index) => {
    // const nextTeams = [...teams.slice(0, index), teams.slice(index + 1)];
    // dispatch.sync(room.action.deleteTeam({ teams: nextTeams }));
  };
  // [teams, dispatch],

  const onChange = useCallback(
    (index) => {
      if (!isActive) {
        setChecked(index);
      }
    },
    [isActive],
  );

  const getFirstNames = (teamId) => {
    const team = teams.find((team) => team.teamId === teamId);

    const teamMembers = members.filter((member) => (team?.members ?? []).includes(member.id));

    return `${teamMembers.reduce((acc, { first_name }, index) => `${acc}${index === 0 ? '' : ', '}${first_name}`, '')}`;
  };

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            <>
              {(platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
              )}
              {platform === IOS && ownerId === userId && (
                <PanelHeaderEdit editLabel='Ред.' isActive={isActive} onClick={() => setIsActive(!isActive)} />
              )}
            </>
          }
          right={
            <>
              {(platform === ANDROID || platform === VKCOM) && ownerId === userId && (
                <PanelHeaderEdit isActive={isActive} onClick={() => setIsActive(!isActive)} />
              )}
              {platform === IOS && (
                <PanelHeaderClose onClick={onClose}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )}
            </>
          }
        >
          Выбор команды
        </ModalPageHeader>
      }
    >
      <List>
        <Group>
          {teams.map((team, index) => (
            <Fragment key={team.teamId}>
              <Cell
                name={team.name}
                checked={team.teamId === checked + 1}
                selectable
                removable={isActive}
                description={getFirstNames(team.teamId)}
                onRemove={() => onRemove(index)}
                onChange={() => onChange(index)}
              >
                {team.name}
              </Cell>
              <Spacing separator size={24} />
            </Fragment>
          ))}
        </Group>
      </List>
      <Div>
        <Button mode='secondary' size='m' stretched before={<Icon24Add />}>
          Добавить команду
        </Button>
      </Div>
      <FixedLayout vertical={'bottom'}>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
        </MiniInfoCell>
      </FixedLayout>
    </ModalPage>
  );
};

export { Teams };
