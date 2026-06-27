import { useRef, useEffect } from "react";
import { View, Text, Pressable, Image, Switch, StyleSheet, ScrollView, Alert, Platform, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useModo } from "../context/modo";
import { useState } from "react"
import * as ImagePicker from "expo-image-picker";

function MenuItem({ icon, label, delay, modo, escuro, onPress }) {
    const slideAnim = useRef(new Animated.Value(-30)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const useNativeDriver = Platform.OS !== "web";

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 1, duration: 350, delay, useNativeDriver }),
            Animated.spring(slideAnim, { toValue: 0, delay, friction: 8, tension: 55, useNativeDriver }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity: opacityAnim, transform: [{ translateX: slideAnim }] }}>
            <Pressable style={[modo.card, styles.view]} onPress={onPress}>
                <View style={[styles.iconeContainer, { backgroundColor: escuro ? "rgba(85,75,228,0.2)" : "#ede9fe" }]}>
                    <Ionicons name={icon} size={20} color={escuro ? "#a5b4fc" : "#554be4"} />
                </View>
                <Text style={[modo.texto, styles.texto]}>{label}</Text>
                <Ionicons name="chevron-forward" size={18} color={escuro ? "#4a5568" : "#c4b5fd"} style={{ marginLeft: "auto" }} />
            </Pressable>
        </Animated.View>
    );
}

export default function PerfilScreen({ navigation }) {
    const [foto, setFoto] = useState("https://us.123rf.com/450wm/anatolir/anatolir2002/anatolir200200409/140389213-cone-do-avatar-do-advogado-ilustra%C3%A7%C3%A3o-plana-do-%C3%ADcone-do-vetor-do-avatar-do-advogado-para-o-web.jpg?ver=6")
    const { escuro, setEscuro, modo } = useModo()

    const photoScale = useRef(new Animated.Value(0.7)).current;
    const photoOpacity = useRef(new Animated.Value(0)).current;
    const nameOpacity = useRef(new Animated.Value(0)).current;
    const nameSlide = useRef(new Animated.Value(20)).current;
    const useNativeDriver = Platform.OS !== "web";

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(photoScale, { toValue: 1, useNativeDriver, friction: 5, tension: 80 }),
                Animated.timing(photoOpacity, { toValue: 1, duration: 400, useNativeDriver }),
            ]),
            Animated.parallel([
                Animated.timing(nameOpacity, { toValue: 1, duration: 300, useNativeDriver }),
                Animated.spring(nameSlide, { toValue: 0, friction: 8, useNativeDriver }),
            ]),
        ]).start();
    }, []);

    async function alterarFoto() {
        const permissao = await ImagePicker.requestCameraPermissionsAsync()

        if (!permissao.granted) {
            Alert.alert(
                "Permissão para usar a câmera foi negada.",
                Platform.OS === "ios"
                    ? "No iOS, ative a câmera em Ajustes > Expo Go > Câmera."
                    : "No Android, ative a câmera em Configurações > Aplicativos > Expo Go > Permissões > Câmera"
            )
            return
        }

        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (!resultado.canceled) {
            setFoto(resultado.assets[0].uri)
        }
    }

    return (
        <ScrollView style={[styles.container, modo.container]} showsVerticalScrollIndicator={false}>
            <View style={[modo.screen, { paddingBottom: 40 }]}>
                {/* Cabeçalho do perfil */}
                <View style={styles.cabecalho}>
                    <Animated.View style={[styles.fotoWrapper, {
                        opacity: photoOpacity,
                        transform: [{ scale: photoScale }],
                    }]}>
                        <View style={[styles.fotoBorda, { borderColor: escuro ? "#4338ca" : "#c4b5fd" }]}>
                            <Image style={styles.imagem} source={{ uri: foto }} />
                        </View>
                        <Pressable style={[styles.cameraBotao, { backgroundColor: escuro ? "#4338ca" : "#554be4" }]} onPress={alterarFoto}>
                            <Ionicons name="camera" size={16} color="white" />
                        </Pressable>
                    </Animated.View>

                    <Animated.View style={{ opacity: nameOpacity, transform: [{ translateY: nameSlide }], alignItems: "center", gap: 6 }}>
                        <Text style={[modo.texto, styles.nome]}>Vitor Almeida</Text>
                        <Text style={[styles.emailTexto, { color: escuro ? "#64748b" : "#94a3b8" }]}>Estudante</Text>
                    </Animated.View>
                </View>

                {/* Toggle modo */}
                <View style={[modo.card, styles.view, { marginBottom: 20 }]}>
                    <View style={[styles.iconeContainer, { backgroundColor: escuro ? "rgba(85,75,228,0.2)" : "#ede9fe" }]}>
                        <Ionicons name={escuro ? "moon" : "sunny"} size={20} color={escuro ? "#a5b4fc" : "#554be4"} />
                    </View>
                    <Text style={[modo.texto, styles.texto]}>{escuro ? "Modo escuro" : "Modo claro"}</Text>
                    <Switch style={{ marginLeft: "auto", marginTop: 5 }} value={escuro} onValueChange={setEscuro} thumbColor={escuro ? "#7c3aed" : "#f3f4f6"} trackColor={{ false: "#d1d5db", true: "#554be4" }} />
                </View>

                {/* Seção Acadêmico */}
                <Text style={[modo.texto, styles.titulo]}>Acadêmico</Text>
                <MenuItem 
                icon="school" label="Histórico escolar" 
                delay={100} modo={modo} 
                escuro={escuro} onPress={() => navigation.navigate("HistoricoEscolar")}/>
                <View style={{ height: 10 }} />
                <MenuItem icon="newspaper" label="Notas" 
                delay={180} modo={modo} 
                escuro={escuro} onPress={() => navigation.navigate("Notas")}/>
                <View style={{ height: 10 }} />
                <MenuItem 
                icon="podium" label="Frequência" 
                delay={260} modo={modo} 
                escuro={escuro}  onPress={() => navigation.navigate("Frequência")}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cabecalho: {
        alignItems: "center",
        paddingVertical: 24,
        gap: 14,
        marginBottom: 8,
    },
    fotoWrapper: {
        position: "relative",
    },
    fotoBorda: {
        width: 150,
        height: 150,
        borderRadius: "100%",
        borderWidth: 3,
        padding: 3,
    },
    imagem: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },
    cameraBotao: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "white",
    },
    nome: {
        fontSize: 22,
        fontWeight: "700",
    },
    emailTexto: {
        fontSize: 14,
        fontWeight: "500",
    },
    view: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 16,
    },
    titulo: {
        marginBottom: 12,
        marginTop: 4,
        paddingLeft: 2,
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1,
        opacity: 0.6,
    },
    iconeContainer: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    texto: {
        fontSize: 15,
        fontWeight: "600",
    },
})
