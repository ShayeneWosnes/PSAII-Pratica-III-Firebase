import { ScrollView } from "react-native";
import { Button, Text, TextInput, Card } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function PageLogin() {
    const [usuario, setUsuario] = useState({})
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { loginEmailSenha, recuperarSenha } = useAuthService()
    const navigation = useNavigation();

    async function logarUsuario() {

        if (!usuario.email?.trim() || !usuario.senha) {
            alert("Preencha o e-mail e a senha para entrar.");
            return;
        }

        try {
            setLoading(true)
            await loginEmailSenha(usuario)
            alert("Logado com sucesso!")
        } catch (err) {
            console.error(err)
            alert("Erro ao logar")
        } finally {
            setLoading(false)
        }
    }

    async function recuperarSenhaUsuario() {
        if (!usuario.email?.trim()) {
            alert("Informe seu e-mail para recuperar a senha.");
            return;
        }
        try {
            setLoading(true)
            await recuperarSenha(usuario)
            alert("Um e-mail foi enviado para recuperar sua senha.")
        } catch (err) {
            console.error(err)
            alert("Erro ao recuperar senha.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <Card>
                <Card.Content>
                    <TextInput
                        label="E-mail:"
                        placeholder="Insira o seu e-mail."
                        value={usuario.email}
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                    />
                    <TextInput
                        label="Senha:"
                        placeholder="Insira a sua senha."
                        value={usuario.senha}
                        secureTextEntry={secureText}
                        onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
                        right={
                            <TextInput.Icon
                                icon="eye"
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />
                    <Button loading={loading}
                        onPress={() => logarUsuario()}>
                        Entrar
                    </Button>
                    <Text>Esqueceu a sua senha?</Text>
                    <Button loading={loading}
                        onPress={() => recuperarSenhaUsuario()}>
                        Recuperar Senha</Button>

                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Ainda não possui uma conta?
                    </Text>

                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate("Cadastro")}
                        style={{ marginTop: 10 }}
                    >
                        Criar uma conta
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;