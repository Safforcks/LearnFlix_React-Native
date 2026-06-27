import { useRef, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Animated, Platform } from 'react-native';
import { useModo } from '../context/modo';

export default function DisciplineCard({ disciplina, onPress, index = 0 }) {
  const { modo } = useModo();
  const useNativeDriver = Platform.OS !== 'web';

  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1, duration: 400, delay: index * 110, useNativeDriver,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, delay: index * 110, friction: 8, tension: 55, useNativeDriver,
      }),
    ]).start();
  }, []);

  const onPressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver, friction: 10 }).start();
  const onPressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver, friction: 5 }).start();

  return (
    <Animated.View style={{
      opacity: opacityAnim,
      transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
    }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, modo.card]}
      >
        <Image source={{ uri: disciplina.imagem }} style={styles.image} />
        <View style={styles.contente}>
          <Text style={[styles.titulo, modo.texto]}>{disciplina.titulo}</Text>
          <Text style={styles.descricao}>Toque para explorar</Text>
        </View>
        <View style={styles.botao}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(85, 75, 228, 0.12)",
    padding: 16,
    gap: 14,
    boxShadow: "0px 8px 20px rgba(85, 75, 228, 0.15)",
    elevation: 5,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 14,
  },
  contente: {
    flex: 1,
    gap: 5,
  },
  titulo: {
    color: "#554be4",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  descricao: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94a3b8",
  },
  botao: {
    backgroundColor: "#554be4",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
});