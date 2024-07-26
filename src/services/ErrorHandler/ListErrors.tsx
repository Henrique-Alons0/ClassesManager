type ErrorKey = 'EMPTY_PARTICIPANT_NAME' | 'EMPTY_CLASS_NAME' | 'PARTICIPANT_ALREADY_EXISTS' | 'TEAM_RESOLUTION_ERROR' | 'CLASS_NOT_FOUND' | 'DELETION_ERROR' | 'UNEXPECTED_ERROR';

const Errors: Record<ErrorKey, { code: string; message: string; messageUser: string }> = {
    EMPTY_PARTICIPANT_NAME: {
        code: 'EMPTY_PARTICIPANT_NAME',
        message: "The participant's name cannot be empty!",
        messageUser: 'O nome do participante não pode ser vazio!'
    },
    EMPTY_CLASS_NAME: {
        code: 'EMPTY_CLASS_NAME',
        message: "The class name cannot be empty!",
        messageUser: 'O nome da classe não pode ficar vazio!'
    },
    PARTICIPANT_ALREADY_EXISTS: {
        code: 'PARTICIPANT_ALREADY_EXISTS',
        message: 'Participant "{participantName}" already exists in team "{teamName}"!',
        messageUser: 'O participante "{participantName}" já existe na equipe "{teamName}"!'
    },
    TEAM_RESOLUTION_ERROR: {
        code: 'TEAM_RESOLUTION_ERROR',
        message: 'Unable to resolve team members "{teamName}"!',
        messageUser: 'Não foi possível resolver os participantes da equipe "{teamName}"!'
    },
    CLASS_NOT_FOUND: {
        code: 'CLASS_NOT_FOUND',
        message: 'Class not found!',
        messageUser: 'Classe não encontrada!'
    },
    DELETION_ERROR: {
        code: 'DELETION_ERROR',
        message: 'Houve um problema ao deletar a classe "{className}".',
        messageUser: 'There was a problem deleting the class "{className}".'
    },
    UNEXPECTED_ERROR: {
        code: 'UNEXPECTED_ERROR',
        message: "Ocorreu um erro inesperado! Tente mais tarde.",
        messageUser: "An unexpected error has occurred! Try later."
    }
};

export default Errors;
export type { ErrorKey };
