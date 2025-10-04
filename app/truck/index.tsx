import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href={"/auth"} >
        <Text>Go TO AUTH</Text>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "auto"

  }

});
