
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import StackNavigator from "./StackNavigator";
import PageIFPR from "../pages/PageIFPR";
import PagePerfil from "../pages/PagePerfil";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Início"
                component={StackNavigator}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="IFPR"
                component={PageIFPR}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="school" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Meu Perfil"
                component={PagePerfil}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
