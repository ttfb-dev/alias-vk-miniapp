import { useState } from 'react'
import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Button,
  Spacing,
} from '@vkontakte/vkui'
import {
  Icon24Help,
  Icon24UserAdd,
  Icon24Settings,
  Icon24Game,
} from '@vkontakte/icons'

const Home = () => {
  const [activePanel, setActivePanel] = useState('home')

  return (
    <View activePanel={activePanel}>
      <Panel id="home">
        <PanelHeader>Alias</PanelHeader>
        <Group separator="hide">
          <Div>
            <Button
              mode="outline"
              size="l"
              stretched
              before={<Icon24UserAdd />}
            >
              Присоединиться
            </Button>
            <Spacing size={12} />

            <Button
              mode="outline"
              size="l"
              stretched
              before={<Icon24Game />}
              onClick={() => setActivePanel('room')}
            >
              Новая игра
            </Button>
            <Spacing size={12} />

            <Button
              mode="outline"
              size="l"
              stretched
              before={<Icon24Settings />}
              onClick={() => setActivePanel('sets')}
            >
              Наборы словы
            </Button>
            <Spacing size={12} />

            <Button
              mode="outline"
              size="l"
              stretched
              before={<Icon24Help />}
              onClick={() => setActivePanel('about')}
            >
              Об игре
            </Button>
          </Div>
        </Group>
      </Panel>
      <Panel id="room">
        <PanelHeader
          fixed={false}
          left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
        >
          Комната
        </PanelHeader>
      </Panel>
      <Panel id="sets">
        <PanelHeader
          fixed={false}
          left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
        >
          Наборы слов
        </PanelHeader>
      </Panel>
      <Panel id="about">
        <PanelHeader
          fixed={false}
          left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
        >
          Об игре
        </PanelHeader>
      </Panel>
    </View>
  )
}

export { Home }
