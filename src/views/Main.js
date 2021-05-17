import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Button,
  Spacing,
} from "@vkontakte/vkui";
import {
  Icon24Help,
  Icon24UserAdd,
  Icon24Settings,
  Icon24Game,
} from "@vkontakte/icons";

const Main = () => (
  <View activePanel="main">
    <Panel id="main">
      <PanelHeader fixed={false} left={<PanelHeaderBack onClick={() => {}} />}>
        Alias
      </PanelHeader>
      <Group separator="hide">
        <Div>
          <Button mode="outline" size="l" stretched before={<Icon24UserAdd />}>
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button mode="outline" size="l" stretched before={<Icon24Game />}>
            Новая игра
          </Button>
          <Spacing size={12} />

          <Button mode="outline" size="l" stretched before={<Icon24Settings />}>
            Наборы словы
          </Button>
          <Spacing size={12} />

          <Button mode="outline" size="l" stretched before={<Icon24Help />}>
            Об игре
          </Button>
        </Div>
      </Group>
    </Panel>
  </View>
);

export default Main;
