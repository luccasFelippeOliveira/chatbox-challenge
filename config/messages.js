const MESSAGES = {
    'error': {
        'en-US': {
            E001: 'Internal Server Error'
        },
        'pt-PT': {
            E001: 'Erro Interno do Servidor'
        }
    },
    'success': {
        'en-US': {
            S001: 'Success'
        },
        'pt-PT': {
            S001: 'Sucesso'
        }
    },
    'validation': {
        'en-US': {
            V001: 'Message text cannot be empty or null',
            V002: 'Message type must be either \"system\" or \"user\"',
            V003: 'Message must have an userId'
        },
        'pt-PT': {
            V001: 'Texto da mensagem não estar vazio ou ser nulo',
            V002: 'Tipo da mensagem deve ser \"system\" ou \"user\"',
            V003: 'userId deve conter na mensagem'
        }
    },
    'default': {
        'en-US': {
            D001: 'No information available DEFAULT',
        },
        'pt-PT': {
            D001: 'Sem informação disponível'
        }
    }
}

const normalizedLocale = process.env.APP_LOCALE ?? 'en-US';

export const getLocalizedMessage = (messageCode, messageType) => {
    if (messageType === 'success' || messageType === 'error' || messageType === 'validation') {
        return MESSAGES[messageType][normalizedLocale][messageCode] || MESSAGES.default[normalizedLocale].D001;
    } else {
        return MESSAGES.default[normalizedLocale].D001;
    }
}