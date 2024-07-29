import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    width: 'auto',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    fontFamily: 'Roboto'
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 128
  },
  iconGroup: {
    color: '#00b37e',
    marginRight: 8
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#51515a',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#121214',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#00875f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 45,
    height: 50
  }
});

export default styles;
