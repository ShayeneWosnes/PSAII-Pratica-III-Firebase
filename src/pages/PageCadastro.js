
import { ScrollView, Alert } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";

function PageCadastro() {
    const [usuario, setUsuario] = useState({
        nome: "",
        telefone: "",
        email: "",
        senha: "",
    });

    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    async function cadastrarUsuario() {
        if (!usuario.nome.trim() ||
            !usuario.telefone.trim() ||
            !usuario.email.trim() ||
            !usuario.senha) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);

            await cadastrarEmailSenha(usuario);

            Alert.alert(
                "Cadastro realizado!",
                "Verifique seu e-mail antes de fazer login.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]
            );
        } catch (err) {
            console.error(err);

            Alert.alert(
                "Erro no cadastro",
                err.message || "Não foi possível realizar o cadastro."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView>
            <Card>
                <Card.Content>

                    <Text variant="titleLarge">
                        Cadastro de usuário
                    </Text>

                    <TextInput
                        label="Nome completo"
                        value={usuario.nome}
                        onChangeText={(text) =>
                            setUsuario({ ...usuario, nome: text })
                        }
                    />

                    <TextInput
                        label="Telefone"
                        value={usuario.telefone}
                        keyboardType="phone-pad"
                        onChangeText={(text) =>
                            setUsuario({ ...usuario, telefone: text })
                        }
                    />

                    <TextInput
                        label="E-mail"
                        value={usuario.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) =>
                            setUsuario({ ...usuario, email: text })
                        }
                    />

                    <TextInput
                        label="Senha"
                        value={usuario.senha}
                        secureTextEntry={secureText}
                        onChangeText={(text) =>
                            setUsuario({ ...usuario, senha: text })
                        }
                        right={
                            <TextInput.Icon
                                icon="eye"
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />

                    <Button
                        mode="contained"
                        loading={loading}
                        disabled={loading}
                        onPress={cadastrarUsuario}
                        style={{ marginTop: 20 }}
                    >
                        Cadastrar
                    </Button>

                    <Button
                        onPress={() => navigation.navigate("Login")}
                    >
                        Já possui uma conta? Entrar
                    </Button>

                </Card.Content>
            </Card>
        </ScrollView>
    );
}

export default PageCadastro;
