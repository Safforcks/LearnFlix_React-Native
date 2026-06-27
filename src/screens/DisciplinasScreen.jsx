import { View, FlatList, StyleSheet } from 'react-native';

import DisciplineCard from '../components/DisciplineCard';
import disciplinas from '../data/disciplinas.json';
import { useModo } from '../context/modo';

export default function DisciplinasScreen({ navigation }) {

  const { modo } = useModo()

  return (
    <View style={[styles.container, modo.container]}>
      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.titulo}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DisciplineCard
            disciplina={item}
            index={index}
            onPress={() => navigation.navigate("Modulos", { disciplina: item.titulo })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separar} />}
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
  separar: {
    height: 16,
  },
});