const showResult = (result) => {
    switch (result) {
        case 'N':
            return "Negatywny"
        case 'P':
            return "Pozytywny"
        case 'I':
            return "Nieroztrzygający"
        case null:
            return "Brak wyniku"
        default:
            return null
    }
}

export default showResult