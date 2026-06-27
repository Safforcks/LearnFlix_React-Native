import { ScrollView, View, Text, StyleSheet } from "react-native";
import frequencias from "../data/frequencia.json";
import { useModo } from "../context/modo";

export default function FrequenciaScreen() {
    const { modo, escuro } = useModo();

    return (
        <ScrollView style={[styles.container, modo.container]} contentContainerStyle={styles.content}>
            {frequencias.periodo.map((periodo) => {
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
                                    {bimestreExistente > 0 ? "Lançado" : "Sem dados"}
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
                                    const presentes = disciplina.totalAulas - disciplina.faltas;
                                    const percentual = ((presentes * 100) / disciplina.totalAulas).toFixed(1);
                                    const percentualInt = parseInt(percentual);
                                    const isAboveLimite = percentualInt >= 75;

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
                                            <View style={styles.disciplinaHeader}>
                                                <Text style={[styles.disciplinaNome, modo.texto]}>{disciplina.nome}</Text>
                                                <View
                                                    style={[
                                                        styles.percentualBadge,
                                                        {
                                                            backgroundColor: isAboveLimite
                                                                ? (escuro ? "rgba(22, 163, 74, 0.20)" : "#dcfce7")
                                                                : (escuro ? "rgba(239, 68, 68, 0.20)" : "#fee2e2"),
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.percentualValue,
                                                            {
                                                                color: isAboveLimite
                                                                    ? (escuro ? "#86efac" : "#166534")
                                                                    : (escuro ? "#fca5a5" : "#991b1b"),
                                                            },
                                                        ]}
                                                    >
                                                        {percentual}%
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.progressBarContainer}>
                                                <View
                                                    style={[
                                                        styles.progressBar,
                                                        {
                                                            width: `${percentualInt}%`,
                                                            backgroundColor: isAboveLimite
                                                                ? (escuro ? "#22c55e" : "#16a34a")
                                                                : (escuro ? "#ef4444" : "#dc2626"),
                                                        },
                                                    ]}
                                                />
                                            </View>

                                            <View style={styles.metricsRow}>
                                                <View style={styles.metricItem}>
                                                    <Text style={[styles.metricLabel, { color: modo.colors.textMuted }]}>Aulas</Text>
                                                    <Text style={[styles.metricValue, modo.texto]}>{disciplina.totalAulas}</Text>
                                                </View>
                                                <View style={styles.metricItem}>
                                                    <Text style={[styles.metricLabel, { color: modo.colors.textMuted }]}>Presentes</Text>
                                                    <Text style={[styles.metricValue, modo.texto]}>{presentes}</Text>
                                                </View>
                                                <View style={styles.metricItem}>
                                                    <Text style={[styles.metricLabel, { color: modo.colors.textMuted }]}>Faltas</Text>
                                                    <Text style={[styles.metricValue, { color: escuro ? "#fca5a5" : "#dc2626" }]}>
                                                        {disciplina.faltas}
                                                    </Text>
                                                </View>
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
        padding: 12,
        gap: 10,
    },
    disciplinaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    disciplinaNome: {
        fontSize: 14,
        fontWeight: "800",
        flex: 1,
    },
    percentualBadge: {
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    percentualValue: {
        fontSize: 13,
        fontWeight: "800",
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        borderRadius: 999,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        borderRadius: 999,
    },
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 12,
    },
    metricItem: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: "600",
    },
    metricValue: {
        fontSize: 15,
        fontWeight: "800",
    },
});