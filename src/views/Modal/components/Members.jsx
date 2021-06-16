import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  withModalRootContext,
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  List,
  Group,
  SimpleCell,
  Header,
  Avatar,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

const MembersComponent = ({ onClose, updateModalHeight, ...props }) => {
  const platform = usePlatform();
  const teams = useSelector((state) => state.room.teams);
  const members = useSelector((state) => state.room.members);

  useLayoutEffect(() => {
    updateModalHeight();
  }, [updateModalHeight, teams, members]);

  const teamName = (memberId) => teams.find((team) => team?.memberIds?.includes(memberId))?.name ?? '';

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            (platform === ANDROID || platform === VKCOM) && (
              <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
            )
          }
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={onClose}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          Список участников
        </ModalPageHeader>
      }
    >
      <Group header={<Header mode='secondary'>Участники</Header>}>
        <List>
          {members.map((member) => (
            <SimpleCell
              key={member.id}
              before={<Avatar size={48} src={member.photo_50} />}
              description={`${teamName(member.id)}`}
            >
              {`${member.first_name} ${member.last_name}`}
            </SimpleCell>
          ))}
        </List>
      </Group>
    </ModalPage>
  );
};

const Members = withModalRootContext(MembersComponent);

export { Members };
