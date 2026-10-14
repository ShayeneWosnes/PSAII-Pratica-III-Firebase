
import { PaperProvider, ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase-init";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      try {
        if (usuario) {
          await usuario.reload();

          if (auth.currentUser?.emailVerified) {
            setUsuarioLogado(auth.currentUser);
          } else {
            setUsuarioLogado(null);
          }
        } else {
          setUsuarioLogado(null);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setUsuarioLogado(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : usuarioLogado ? (
          <DrawerNavigator />
        ) : (
          <LoginStackNavigator />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
