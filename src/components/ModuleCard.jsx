import { useRef, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useModo } from '../context/modo';

export default function ModuleCard({ modulo, index, onPress }) {
  const { modo } = useModo();
  const useNativeDriver = Platform.OS !== 'web';

  const slideAnim = useRef(new Animated.Value(-40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1, duration: 400, delay: index * 120, useNativeDriver,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, delay: index * 120, friction: 8, tension: 55, useNativeDriver,
      }),
    ]).start();
  }, []);

  const onPressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver, friction: 10 }).start();
  const onPressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver, friction: 5 }).start();

  return (
    <Animated.View style={{
      opacity: opacityAnim,
      transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
    }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, modo.card]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: modulo.imagem }} style={styles.imagem} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.55)"]}
            style={styles.imageOverlay}
          />
          <View style={styles.moduloBadge}>
            <Text style={styles.moduloBadgeTexto}>Módulo {index + 1}</Text>
          </View>
        </View>
        <View style={styles.contente}>
          <Text style={[styles.titulo, modo.texto]}>{modulo.titulo}</Text>
          <Pressable onPress={onPress} style={styles.botao}>
            <Text style={styles.botaoTexto}>Ver conteúdos</Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(85, 75, 228, 0.12)",
    boxShadow: "0px 8px 20px rgba(85, 75, 228, 0.15)",
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  imagem: {
    width: "100%",
    height: 200,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  moduloBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#554be4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  moduloBadgeTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },
  contente: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
  },
  botao: {
    backgroundColor: "#554be4",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});