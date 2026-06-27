import { useRef, useEffect } from "react";
import { Text, TextInput, StyleSheet, Pressable, Alert, View, Animated, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../infra/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
    const useNativeDriver = Platform.OS !== "web";
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { email: "", senha: "" }
    });

    const logoScale = useRef(new Animated.Value(0.5)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslate = useRef(new Animated.Value(80)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoScale, { toValue: 1, useNativeDriver, friction: 5, tension: 80 }),
                Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver }),
            ]),
            Animated.parallel([
                Animated.timing(cardOpacity, { toValue: 1, duration: 350, useNativeDriver }),
                Animated.spring(cardTranslate, { toValue: 0, useNativeDriver, friction: 8, tension: 50 }),
            ]),
        ]).start();
    }, []);

    const onPressIn = () => Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver, friction: 10 }).start();
    const onPressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver, friction: 4 }).start();

    async function Submit(data) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.senha);
            navigation.replace("Tabs");
        } catch (error) {
            Alert.alert("E-mail ou senha inválidos");
            console.log(error);
            reset();
        }
    }

    return (
        <LinearGradient
            colors={["#1e1b4b", "#4338ca", "#6d28d9"]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.logoContainer, {
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                }]}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="school" size={52} color="white" />
                    </View>
                    <Text style={styles.appName}>LearnFlix</Text>
                    <Text style={styles.tagline}>Aprenda sem limites</Text>
                </Animated.View>

                <Animated.View style={[styles.card, {
                    opacity: cardOpacity,
                    transform: [{ translateY: cardTranslate }],
                }]}>
                    <Text style={styles.titulo}>Bem-vindo!</Text>
                    <Text style={styles.subtitulo}>Entre na sua conta para continuar</Text>

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "O campo e-mail é obrigatório.",
                            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Preencha o e-mail corretamente."
                        }}
                        render={({ field: { value, onChange } }) => (
                            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                <Ionicons name="mail-outline" size={20} color="#554be4" />
                                <TextInput
                                    placeholder="E-mail"
                                    placeholderTextColor="rgba(0,0,0,0.35)"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={styles.campo}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="senha"
                        rules={{ required: "O campo senha é obrigatório." }}
                        render={({ field: { value, onChange } }) => (
                            <View style={[styles.inputWrapper, errors.senha && styles.inputError]}>
                                <Ionicons name="lock-closed-outline" size={20} color="#554be4" />
                                <TextInput
                                    placeholder="Senha"
                                    placeholderTextColor="rgba(0,0,0,0.35)"
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry
                                    style={styles.campo}
                                />
                            </View>
                        )}
                    />

                    {(errors.email || errors.senha) && (
                        <View style={styles.erroContainer}>
                            {errors.email && <Text style={styles.erroTexto}>• {errors.email.message}</Text>}
                            {errors.senha && <Text style={styles.erroTexto}>• {errors.senha.message}</Text>}
                        </View>
                    )}

                    <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                        <Pressable onPress={handleSubmit(Submit)} onPressIn={onPressIn} onPressOut={onPressOut}>
                            <LinearGradient
                                colors={["#554be4", "#7c3aed"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.botao}
                            >
                                <Text style={styles.textBotao}>Entrar</Text>
                                <Ionicons name="arrow-forward-outline" size={20} color="white" />
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 32,
    },
    logoContainer: {
        alignItems: "center",
        gap: 10,
    },
    logoCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.3)",
    },
    appName: {
        fontSize: 34,
        fontWeight: "800",
        color: "white",
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 15,
        color: "rgba(255,255,255,0.7)",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 28,
        padding: 28,
        gap: 14,
        boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.25)",
        elevation: 20,
    },
    titulo: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1e1b4b",
    },
    subtitulo: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: -4,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f3ff",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 10,
        borderWidth: 1.5,
        borderColor: "transparent",
    },
    inputError: {
        borderColor: "#ef4444",
        backgroundColor: "#fff5f5",
    },
    campo: {
        flex: 1,
        fontSize: 15,
        color: "#1e1b4b",
        outlineStyle: "none",
    },
    erroContainer: {
        backgroundColor: "#fff5f5",
        borderRadius: 10,
        padding: 12,
        gap: 4,
        borderLeftWidth: 3,
        borderLeftColor: "#ef4444",
    },
    erroTexto: {
        color: "#ef4444",
        fontSize: 13,
        fontWeight: "500",
    },
    botao: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 14,
        gap: 8,
    },
    textBotao: {
        color: "white",
        fontWeight: "800",
        fontSize: 17,
        letterSpacing: 0.5,
    },
})

