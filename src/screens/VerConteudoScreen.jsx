import { useRef, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModo } from "../context/modo";

const TIPO_CONFIG = {
  "Slide": { icon: "document-text-outline", cor: "#6366f1" },
  "Vídeo": { icon: "videocam-outline", cor: "#ef4444" },
  "Apostila": { icon: "book-outline", cor: "#10b981" },
  "Lista de Exercícios": { icon: "list-outline", cor: "#f59e0b" },
};

function ConteudoCard({ item, index, modo }) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1, duration: 350, delay: 200 + index * 90, useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, delay: 200 + index * 90, friction: 8, tension: 55, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const config = TIPO_CONFIG[item.tipo] || { icon: "document-outline", cor: "#554be4" };

  return (
    <Animated.View style={{ opacity: opacityAnim, transform: [{ translateY: slideAnim }] }}>
      <View style={[styles.card, modo.card]}>
        <View style={[styles.tipoContainer, { backgroundColor: config.cor + "18" }]}>
          <Ionicons name={config.icon} size={26} color={config.cor} />
          <Text style={[styles.tipo, { color: config.cor }]}>{item.tipo}</Text>
        </View>
        <Text style={[styles.cardTitulo, modo.texto]}>{item.titulo}</Text>
        <Text style={[styles.cardTexto, modo.titulo]}>
          Conteúdo demonstrativo para uso na aplicação.
        </Text>
        <View style={[styles.acessarBotao, { backgroundColor: config.cor }]}>
          <Text style={styles.acessarTexto}>Acessar</Text>
          <Ionicons name="chevron-forward" size={16} color="white" />
        </View>
      </View>
    </Animated.View>
  );
}

export default function VerConteudoScreen({ route }) {
  const { modo } = useModo();
  const { modulo } = route.params;

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  const conteudos = [
    { tipo: "Slide", titulo: "Slide de apoio" },
    { tipo: "Vídeo", titulo: "Vídeo aula" },
    { tipo: "Apostila", titulo: "Apostila resumida" },
    { tipo: "Lista de Exercícios", titulo: "Exercícios práticos" },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, friction: 8, tension: 60, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, modo.container]}>
      <FlatList
        data={conteudos}
        keyExtractor={(item) => item.tipo}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Animated.View style={[
            styles.primeiroSecao, modo.card,
            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
          ]}>
            <Text style={[styles.nomeModulo, modo.texto]}>Conteúdos de</Text>
            <Text style={[styles.nomeModuloDestaque, { color: "#554be4" }]}>{modulo.titulo}</Text>
            <Text style={[styles.descricao, modo.titulo]}>
              Materiais simulados para demonstrar o funcionamento desta página.
            </Text>
          </Animated.View>
        }
        renderItem={({ item, index }) => (
          <ConteudoCard item={item} index={index} modo={modo} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 20,
    gap: 0,
  },
  separator: {
    height: 14,
  },
  primeiroSecao: {
    marginBottom: 18,
    gap: 6,
    borderRadius: 20,
    padding: 24,
  },
  nomeModulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  nomeModuloDestaque: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    gap: 10,
  },
  tipoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  tipo: {
    fontSize: 14,
    fontWeight: "700",
  },
  cardTitulo: {
    fontSize: 19,
    fontWeight: "700",
  },
  cardTexto: {
    fontSize: 14,
    lineHeight: 20,
  },
  acessarBotao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    marginTop: 4,
  },
  acessarTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});