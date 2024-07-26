import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    fontFamily: 'Roboto'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#51515a',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    minWidth: "100%",
    width: "auto",
    backgroundColor: '#29292e',
    borderRadius: 8,
    padding: 24,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#00b37e',
    marginRight: 8
  },
  cardTitle: {
    color: '#ffffff',
  },
  logo: {
    margin: 32,
    width: 60,
    height: 70,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#51515a',
    fontSize: 16
  },
});

export default styles;
