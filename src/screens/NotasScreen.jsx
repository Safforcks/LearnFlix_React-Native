import { ScrollView, View, Text, StyleSheet } from "react-native";
import notas from "../data/notas.json";
import { useModo } from "../context/modo";
import * as Notifications from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    }) 
})

export default function NotasScreen() {
    const { modo, escuro } = useModo();

    useEffect(() => {
        async function noticia() {

            const jaRecebeu = await AsyncStorage.getItem("notificacaoNotaFilosofia")

            if (jaRecebeu === "true") return

            const { status } = await Notifications.requestPermissionsAsync()

            if (status === "granted") {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "A nota será lançada em breve",
                        body: "A nota da prova 2 de Filosofia será lançada em 2 dias.",
                    },
                    trigger: null
                })

                await AsyncStorage.setItem(
                    "notificacaoNotaFilosofia",
                    "true"
                )
            }
        }
        noticia()
    }, [])

    return (
        <ScrollView style={[styles.container, modo.container]} contentContainerStyle={styles.content}>
            <View style={[modo.card, styles.headerCard]}>
                <Text style={[styles.titulo, modo.texto]}>Boletim</Text>
                <Text style={[styles.subtitulo, { color: modo.colors.textMuted }]}>Ano: {notas.anoLetivo}</Text>
                <Text style={[styles.subtitulo, { color: modo.colors.textMuted }]}>Aluno: {notas.nome}</Text>
            </View>

            {notas.periodo.map((periodo) => {
                const bimestreExistente = periodo.disciplinas.length;

                return (
                    <View key={periodo.bimestre} style={[modo.card, styles.periodoCard]}>
                        <View style={styles.periodoHeader}>
                            <Text style={[styles.periodoTitulo, modo.texto]}>{periodo.bimestre}º bimestre</Text>
                            <View
                                style={[
                                    styles.badge,
                                    {
                                        backgroundColor: bimestreExistente > 0
                                            ? (escuro ? "rgba(22, 163, 74, 0.20)" : "#dcfce7")
                                            : (escuro ? "rgba(234, 179, 8, 0.24)" : "#fef9c3"),
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.badgeText,
                                        {
                                            color: bimestreExistente > 0
                                                ? (escuro ? "#86efac" : "#166534")
                                                : (escuro ? "#facc15" : "#854d0e"),
                                        },
                                    ]}
                                >
                                    {bimestreExistente > 0 ? "Lançado" : "Sem notas"}
                                </Text>
                            </View>
                        </View>

                        {bimestreExistente === 0 ? (
                            <View style={[styles.emptyBox, { borderColor: modo.colors.border }]}>
                                <Text style={[styles.emptyText, { color: modo.colors.textMuted }]}>
                                    Não há dados neste {periodo.bimestre}º bimestre.
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.disciplinasContainer}>
                                {periodo.disciplinas.map((disciplina) => {
                                    const soma = disciplina.notas.reduce((total, nota) => total + nota, 0);
                                    const media = soma / disciplina.notas.length;

                                    return (
                                        <View
                                            key={disciplina.id}
                                            style={[
                                                styles.disciplinaCard,
                                                {
                                                    borderColor: modo.colors.border,
                                                    backgroundColor: escuro ? "#111c2f" : "#fcfcff",
                                                },
                                            ]}
                                        >
                                            <Text style={[styles.disciplinaNome, modo.texto]}>{disciplina.nome}</Text>

                                            <View style={styles.tableHeader}>
                                                <Text style={[styles.colLabel, { color: modo.colors.textMuted }]}>Trabalho</Text>
                                                <Text style={[styles.colLabel, { color: modo.colors.textMuted }]}>Prova 1</Text>
                                                <Text style={[styles.colLabel, { color: modo.colors.textMuted }]}>Prova 2</Text>
                                                <Text style={[styles.colLabel, styles.mediaLabel, { color: modo.colors.textMuted }]}>Média</Text>
                                            </View>

                                            <View style={styles.tableValues}>
                                                <Text style={[styles.colValue, modo.texto]}>{disciplina.notas[0] ?? "-"}</Text>
                                                <Text style={[styles.colValue, modo.texto]}>{disciplina.notas[1] ?? "-"}</Text>
                                                <Text style={[styles.colValue, modo.texto]}>{disciplina.notas[2] ?? "-"}</Text>
                                                <Text
                                                    style={[
                                                        styles.colValue,
                                                        styles.mediaValue,
                                                        { color: media >= 7 ? (escuro ? "#86efac" : "#166534") : (escuro ? "#fca5a5" : "#991b1b") },
                                                    ]}
                                                >
                                                    {media.toFixed(1)}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 28,
        gap: 14,
    },
    headerCard: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 4,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "800",
    },
    subtitulo: {
        fontSize: 13,
        fontWeight: "600",
    },
    periodoCard: {
        padding: 14,
        gap: 10,
    },
    periodoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    periodoTitulo: {
        fontSize: 16,
        fontWeight: "800",
    },
    badge: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "800",
        textTransform: "uppercase",
    },
    emptyBox: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
    },
    emptyText: {
        fontSize: 13,
        fontWeight: "500",
    },
    disciplinasContainer: {
        gap: 10,
    },
    disciplinaCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        gap: 8,
    },
    disciplinaNome: {
        fontSize: 14,
        fontWeight: "800",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 6,
    },
    tableValues: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 6,
    },
    colLabel: {
        flex: 1,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },
    colValue: {
        flex: 1,
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
    },
    mediaLabel: {
        flex: 1.1,
    },
    mediaValue: {
        flex: 1.1,
        fontWeight: "800",
    },
});