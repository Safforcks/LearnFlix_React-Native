import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DisciplinasScreen from '../screens/DisciplinasScreen';
import ModulosScreen from '../screens/ModulosScreen';
import VerConteudoScreen from '../screens/VerConteudoScreen';
import LoginScreen from '../screens/LoginScreen';
import PerfilScreen from '../screens/PerfilScreen';
import HistoricoEscolarScreen from '../screens/HistoricoEscolarScreen';
import NotasScreen from '../screens/NotasScreen';
import FrequenciaScreen from '../screens/FrequenciaScreen';

import { ModoProvider, useModo } from '../context/modo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  const { modo } = useModo()
  const header = {
    backgroundColor: modo.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: modo.colors.border,
    headerTitleStyle: {
      color: modo.colors.text,
      fontSize: 25,
      fontWeight: "700",
      marginBottom: 10,
    },
    headerTitleAlign: "center"
  }

  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size}) => {
        let icone = "ellipse-outline"
        if (route.name === "Disciplinas") {
          icone = focused ? "library" : "library-outline"
        } else if (route.name === "Perfil") {
          icone = focused ? "people" : "people-outline"
        } else if (route.name === "Configuração") {
          icone = focused ? "settings" : "settings-outline"
        }

        return <Ionicons name={icone} color={color} size={size} />
      },
      tabBarActiveTintColor: "#554be4",
      tabBarInactiveTintColor: modo.colors.textMuted,
      headerStyle: header,
      tabBarStyle: {
        backgroundColor: modo.colors.surface,
        borderTopColor: modo.colors.border,
        borderTopWidth: 1,
        height: 62,
        paddingBottom: 8,
        paddingTop: 6,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: "600",
      },
    })}
    >
      <Tab.Screen name="Disciplinas" component={DisciplinasScreen} options={header}/>
      <Tab.Screen name="Perfil" component={PerfilScreen} options={header}/>
    </Tab.Navigator>
  )
}

function AppNavigatorContent() {

  const { escuro, modo } = useModo()
  const headerStyle = {
    headerStyle: { 
      backgroundColor: escuro ? "#0f172a" : "white",
      borderBottomWidth: 1,
      borderBottomColor: modo.colors.border,
    },
    headerTintColor: modo.colors.text,
    
    headerTitleStyle: {
      color: modo.colors.text,
      fontSize: 25,
      fontWeight: "700",
    },
    headerTitleAlign: "center",
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Tabs" component={TabNavigator} 
        options={{headerShown: false}}
        />
        <Stack.Screen
          name="Modulos"
          component={ModulosScreen}
          options={{
            ...headerStyle,
            title: "Módulos",
            headerBackButtonDisplayMode: "minimal"
          }}
        />
        <Stack.Screen 
          name="VerConteudos" 
          component={VerConteudoScreen}
          options={{
            ...headerStyle,
            title: "Conteúdos",
            headerBackButtonDisplayMode: "minimal"
          }}/>
          <Stack.Screen
          name="HistoricoEscolar"
          component={HistoricoEscolarScreen}
          options={{
            ...headerStyle,
            title: "Histórico escolar",
            headerBackButtonDisplayMode: "minimal"
          }}
          />
          <Stack.Screen
          name="Notas"
          component={NotasScreen}
          options={{
            ...headerStyle,
            headerBackButtonDisplayMode: "minimal"
          }}
          />
          <Stack.Screen
          name="Frequência"
          component={FrequenciaScreen}
          options={{
            ...headerStyle,
            headerBackButtonDisplayMode: "minimal"
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <ModoProvider>
      <AppNavigatorContent />
    </ModoProvider>
  )
}