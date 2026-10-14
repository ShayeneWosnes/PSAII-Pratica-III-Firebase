import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
} from "firebase/auth";

import {
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase-init";
import { Usuario, usuarioConverter } from "../models/Usuario";

function useAuthService() {

    const cadastrarEmailSenha = async (dadosUsuario) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            dadosUsuario.email,
            dadosUsuario.senha
        );

        const uid = userCredential.user.uid;

        try {
            const usuario = new Usuario({
                id: uid,
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                telefone: dadosUsuario.telefone,
            });

            const usuarioRef = doc(db, "Usuarios", uid)
                .withConverter(usuarioConverter);

            await setDoc(usuarioRef, usuario);

            await sendEmailVerification(userCredential.user);
        } finally {
            await signOut(auth);
        }
    };

    const loginEmailSenha = async (dadosUsuario) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            dadosUsuario.email,
            dadosUsuario.senha
        );

        await userCredential.user.reload();

        if (!userCredential.user.emailVerified) {
            await signOut(auth);
            throw new Error("Confirme seu e-mail antes de entrar.");
        }

        const uid = userCredential.user.uid;

        const usuarioRef = doc(db, "Usuarios", uid)
            .withConverter(usuarioConverter);

        const usuarioDoc = await getDoc(usuarioRef);

        if (!usuarioDoc.exists()) {
            await signOut(auth);
            throw new Error("Dados do usuário não encontrados no Firestore.");
        }

        return usuarioDoc.data();
    };

    const recuperarSenha = async (dadosUsuario) => {
        await sendPasswordResetEmail(auth, dadosUsuario.email);
    };

    return {
        cadastrarEmailSenha,
        loginEmailSenha,
        recuperarSenha,
    };
}

export default useAuthService;