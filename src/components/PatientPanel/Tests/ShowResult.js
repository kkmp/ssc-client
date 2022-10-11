const showResult = (result) => {
    switch (result) {
        case 'N':
            return "Negatywny"
        case 'P':
            return "Pozytywny"
        case 'I':
            return "Nierozstrzygający"
        default:
            return null
    }
}

export default showResult