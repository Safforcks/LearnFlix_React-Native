import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useModo } from "../context/modo";
import historico from "../data/historicoEscolar.json";

function formatarData(dataIso) {
    if (!dataIso) return "-";
    const [ano, mes, dia] = dataIso.split("-");
    return `${dia}/${mes}/${ano}`;
}

function badgeStatusPeriodo(periodoFechado, statusPeriodo, escuro) {
    if (periodoFechado) {
        return {
            label: statusPeriodo || "Concluído",
            bg: escuro ? "rgba(22, 163, 74, 0.22)" : "#dcfce7",
            text: escuro ? "#86efac" : "#166534",
        };
    }

    return {
        label: statusPeriodo || "Cursando",
        bg: escuro ? "rgba(234, 179, 8, 0.22)" : "#fef9c3",
        text: escuro ? "#facc15" : "#854d0e",
    };
}

export default function HistoricoEscolarScreen() {
    const { modo, escuro } = useModo();

    return (
        <ScrollView style={[styles.container, modo.container]} contentContainerStyle={styles.content}>
            <View
                style={[
                    modo.card,
                    styles.headerCard,
                ]}
            >
                <Text style={[styles.nomeAluno, modo.texto]}>{historico.nome}</Text>
                <Text style={[styles.linhaInfo, { color: modo.colors.textMuted }]}>Matrícula: {historico.matricula}</Text>
                <Text style={[styles.linhaInfo, { color: modo.colors.textMuted }]}>Nível: {historico.nivelEnsino}</Text>
                <Text style={[styles.linhaInfo, { color: modo.colors.textMuted }]}>Situação atual: {historico.situacaoAtual}</Text>
            </View>

            {historico.historico.map((item, index) => {
                const status = badgeStatusPeriodo(item.periodoFechado, item.statusPeriodo, escuro);

                return (
                    <View
                        key={`${item.anoLetivo}-${item.serie}`}
                        style={[
                            modo.card,
                            styles.periodoCard,
                        ]}
                    >
                        <View style={styles.periodoTopo}>
                            <Text style={[styles.periodoTitulo, modo.texto]}>{item.anoLetivo} • {item.serie}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                                <Text style={[styles.statusBadgeText, { color: status.text }]}>{status.label}</Text>
                            </View>
                        </View>

                        <Text style={[styles.metaText, { color: modo.colors.textMuted }]}>Turma: {item.turma}</Text>
                        <Text style={[styles.metaText, { color: modo.colors.textMuted }]}>Início: {formatarData(item.dataInicio)}</Text>
                        <Text style={[styles.metaText, { color: modo.colors.textMuted }]}>Fim: {formatarData(item.dataFim)}</Text>

                        {item.periodoFechado ? (
                            <View style={styles.disciplinasContainer}>
                                {item.disciplinas.map((disciplina, index) => {
                                    const aprovado = disciplina.mediaFinal >= 7 && disciplina.frequenciaPercentual >= 75;

                                    return (
                                        <View
                                            key={`${item.anoLetivo}-${disciplina.id || index}`}
                                            style={[
                                                styles.disciplinaCard,
                                                {
                                                    borderColor: modo.colors.border,
                                                    backgroundColor: escuro ? "#111c2f" : "#fafaff",
                                                },
                                            ]}
                                        >
                                            <View style={styles.disciplinaHeader}>
                                                <Text style={[styles.disciplinaNome, modo.texto]}>{disciplina.nome || disciplina}</Text>
                                                <Text
                                                    style={[
                                                        styles.resultado,
                                                        { color: aprovado ? (escuro ? "#86efac" : "#166534") : (escuro ? "#fca5a5" : "#991b1b") },
                                                    ]}
                                                >
                                                    {disciplina.resultadoFinal || (aprovado ? "Aprovado" : "Reprovado")}
                                                </Text>
                                            </View>

                                            {typeof disciplina === "object" && (
                                                <View style={styles.metricasRow}>
                                                    <Text style={[styles.metrica, { color: modo.colors.textMuted }]}>CH: {disciplina.cargaHoraria}h</Text>
                                                    <Text style={[styles.metrica, { color: modo.colors.textMuted }]}>Freq.: {disciplina.frequenciaPercentual}%</Text>
                                                    <Text style={[styles.metrica, { color: modo.colors.textMuted }]}>Média: {disciplina.mediaFinal}</Text>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        ) : (
                            <View style={[styles.avisoBox, { borderColor: modo.colors.border }]}>
                                <Text style={[styles.avisoText, { color: modo.colors.textMuted }]}>Período em andamento. As notas finais e a frequência consolidada ainda não foram fechadas.</Text>
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
        padding: 16,
        gap: 6,
    },
    nomeAluno: {
        fontSize: 20,
        fontWeight: "800",
    },
    linhaInfo: {
        fontSize: 14,
        fontWeight: "500",
    },
    periodoCard: {
        padding: 14,
        gap: 8,
    },
    periodoTopo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },
    periodoTitulo: {
        fontSize: 16,
        fontWeight: "800",
        flexShrink: 1,
    },
    statusBadge: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: "800",
    },
    metaText: {
        fontSize: 13,
        fontWeight: "500",
    },
    disciplinasContainer: {
        marginTop: 6,
        gap: 8,
    },
    disciplinaCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        gap: 8,
    },
    disciplinaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    disciplinaNome: {
        fontSize: 14,
        fontWeight: "700",
        flex: 1,
    },
    resultado: {
        fontSize: 12,
        fontWeight: "800",
        textTransform: "uppercase",
    },
    metricasRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
    },
    metrica: {
        fontSize: 12,
        fontWeight: "600",
    },
    avisoBox: {
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    avisoText: {
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 18,
    },
});