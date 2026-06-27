import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ModuleCard from '../components/ModuleCard';
import modulo from '../data/modulos.json';
import { useModo } from '../context/modo';

export default function ModulosScreen({ navigation, route }) {
  const { disciplina } = route.params;
  const { modo } = useModo()

  const modulos = useMemo(() => modulo[disciplina] || [], [disciplina]);

  return (
    <View style={[styles.container, modo.container]}>
        <FlatList
        data={modulos}
        keyExtractor={(item) => item.titulo}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ModuleCard modulo={item} index={index} onPress={() => navigation.navigate("VerConteudos", { modulo: item })}/>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0eaea",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginTop: 20,
  },
  separator: {
    height: 16,
  },
});