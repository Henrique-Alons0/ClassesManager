import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    width: 'auto',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 16
  },
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
  title: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
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
  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#121214',
    justifyContent: 'space-between',
    color: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamButton: {
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedTeamButton: {
    borderColor: '#00b37e',
    borderWidth: 1,
  },
  teamButtonText: {
    color: '#FFF',
  },
  teamCount: {
    color: '#ffffff',
    fontSize: 16,
  },
  userCard: {
    width: '100%',
    backgroundColor: '#29292e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    color: '#ffffff',
  },
  removeIcon: {
    color: '#ff0000',
    fontSize: 18,
  },
  button: {
    width: '100%',
    height: 60,
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
    marginBottom: 32,
  },
  buttonDelete: {
    width: '100%',
    height: 60,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#aa2834',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative',
    bottom: 0
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
  },
  addButton: {
    padding: 16
  },
});

export default styles;
