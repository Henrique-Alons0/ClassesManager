import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    top: 0,
  },
  headerButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  icon: {
    color: '#ffffff',
    fontSize: 24,
  },
  logo: {
    width: 45,
    height: 50
  },
});

export default styles;
