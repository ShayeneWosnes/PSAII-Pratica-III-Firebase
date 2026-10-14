
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
    Card,
    Avatar,
    List,
    Text,
    ActivityIndicator,
    Button,
} from "react-native-paper";

import { auth, db } from "../../firebase-init";
import { doc, getDoc } from "firebase/firestore";
import { usuarioConverter } from "../models/Usuario";

function PagePerfil() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const usuarioAtual = auth.currentUser;

                if (!usuarioAtual) {
                    throw new Error("Nenhum usuário autenticado.");
                }

                const usuarioRef = doc(
                    db,
                    "Usuarios",
                    usuarioAtual.uid
                ).withConverter(usuarioConverter);

                const documento = await getDoc(usuarioRef);

                if (!documento.exists()) {
                    throw new Error("Perfil não encontrado.");
                }

                setUsuario(documento.data());
            } catch (error) {
                console.error(error);
                setErro(error.message);
            } finally {
                setLoading(false);
            }
        }

        carregarPerfil();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    if (erro) {
        return (
            <Text style={{ margin: 20 }}>
                Erro ao carregar perfil: {erro}
            </Text>
        );
    }

    return (
        <ScrollView style={{ padding: 16 }}>
            <Card>
                <Card.Content style={{ alignItems: "center" }}>
                    <Avatar.Text
                        size={90}
                        label={usuario.nome
                            .split(" ")
                            .map((parte) => parte[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    />

                    <Text
                        variant="headlineSmall"
                        style={{ marginTop: 16 }}
                    >
                        {usuario.nome}
                    </Text>

                    <Text variant="bodyMedium">
                        Meu perfil
                    </Text>
                </Card.Content>

                <Card.Content>
                    <List.Item
                        title="Nome completo"
                        description={usuario.nome}
                        left={(props) =>
                            <List.Icon {...props} icon="account" />}
                    />

                    <List.Item
                        title="E-mail"
                        description={usuario.email}
                        left={(props) =>
                            <List.Icon {...props} icon="email" />}
                    />

                    <List.Item
                        title="Telefone"
                        description={usuario.telefone}
                        left={(props) =>
                            <List.Icon {...props} icon="phone" />}
                    />

                    <List.Item
                        title="ID do usuário"
                        description={usuario.id}
                        left={(props) =>
                            <List.Icon {...props} icon="identifier" />}
                    />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

export default PagePerfil;
