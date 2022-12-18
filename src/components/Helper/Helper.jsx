import React, {Fragment} from "react";
import {Box, Typography, Container, Accordion, AccordionDetails, AccordionSummary} from "@mui/material"
import {Help, ExpandMore} from "@mui/icons-material"

const Helper = () =>{

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            
            <Container>
                <Box flex={5}>
                    <Box p={3}>
                        <Typography variant="h6" mb={4}>
                            <Help /> Pomoc
                        </Typography>
                    
                    </Box>

                    <Box p={3} >
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Obsługa wyszukiwarki pacjentów
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Jak wyszukiwać i filtrować listę pacjentów?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Przejdź do panelu po lewej stronie i kliknij odnośnik "Wyszukaj pacjenta". Na stronie znajduje się wyszukiwarka, 
                                która pozwoli Ci wyszukać dane pacjenta, poprzez wpisanie jego nazwiska, imienia lub numeru PESEL.
                                Wyniki wyszukiwania możesz posortować po nazwisku pacjenta lub po dacie jego urodzenia. Dodatkowo możesz wybrać czy sortowanie
                                ma odbywać się w kolejności rosnącej, czy malejącej.
                                Pamiętaj o konieczności zaznaczenia co najmniej jednej opcji płci pacjenta.
                                Aby wyszukać dane należy wcisnąć przycisk "SZUKAJ".
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Obsługa panelu pacjenta</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Jak dodawać i edytować testy, historie medyczne, powikłania i wpisy o leczeniu?
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Aby uzyskać dostęp do panelu pacjenta, należy wyszukać dane określonego pacjenta z poziomu strony "Wyszukaj pacjenta" lub 
                                w sekcji "Ostatnio dodani pacjenci" na stronie głównej; a następnie przejść do panelu pacjenta, klikając przycisk "SZCZEGÓŁY". 
                                Panel zawiera szczegółowe dane pacjenta oraz pięć kart, które umożliwiają zarządzanie testami, historią choroby, leczeniem, 
                                powikłaniami oraz pozwalają na edycję danych osobowych pacjenta. <br/>
                                Wybranie zakładki "Testy" spowoduje wyświetlenie listy testów przypisanych do pacjenta. Listę wpisów można przewijać, klikając przyciski z ikonami strzałek w dolnej części strony.<br/>
                                Aby dodać nowy test, należy kliknąć przycisk "DODAJ NOWY TEST". Wówczas wyświetlony zostanie formularz umożliwiający wprowadzenie danych nowego testu. Wprowadź wszystkie wymagane 
                                dane (oznaczone symbolem gwiazdki), a następnie kliknij przycisk "Dodaj test". Jeśli wszystkie dane są prawidłowe, zostanie wyświetlone 
                                odpowiednie powiadomienie. W przypadku błędnych danych, zostanie wyświetlony błąd wraz z informacją, co należy poprawić.<br/>
                                Naciśnięcie przycisku "EDYTUJ" obok wpisu o dodanym wcześniej teście, wyświetli szczegółowe dane dotyczące wybranego testu. 
                                Wciśnięcie przycisku "EDYTUJ DANE" wyświetli formularz edycji wraz z aktualnymi danymi testu. Zmień wybrane dane i zatwierdź formularz 
                                w sposób identyczny, jak omówiony powyżej.<br/>
                                Dodawanie i edycja historii choroby, powikłań i leczenia odbywa się analogicznie, jak w przypadku testów. Kliknięcie "Edytuj dane" otworzy formularz 
                                edycji danych osobowych pacjenta.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Zmiana hasła
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Dowiedz się jak zmienić hasło
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Aby zmienić hasło do swojego konta, kliknij symbol konta w prawym górnym rogu. Następnie wybierz opcję "Zmień hasło". 
                                Wprowadź stare i nowe hasło, a następnie kliknij przycisk "Zmień hasło".
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Generowanie i zapisywanie raportów</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Dowiedz się co należy zrobić, aby utworzyć nowy raport analizy
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Jeśli jesteś Lekarzem, przejdź do panelu po lewej stronie i kliknij odnośnik "Analiza". Wówczas uzyskasz dostęp do strony 
                                pozwalającej na wygenerowanie i zapisanie raportów z zadanego przedziału czasu i wskazanej lokalizacji (województwa). 
                                Dostępne są trzy rodzaje raportów, które dotyczą testów, powikłań oraz leczenia. W przypadku testów możesz wybrać dwie kategorie - typ testu i wynik testu. 
                                Po wybraniu odpowiednich opcji wciśnij przycisk "Wyświetl raport". Jeśli istnieją dane wystarczające do wygenerowania raportu analizy, 
                                zostanie on wyświetlony poniżej w formie wykresu pierścieniowego, wraz z objaśnieniem serii danych w legendzie po prawej stronie.<br/>
                                Poniżej wykresu znajduje się przycisk pozwalający na zapisanie danych z raportu do pliku. Należy wybrać typ pliku i wciśnąć przycisk "Zapisz do pliku". 
                                Plik zostanie pobrany na dysk.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    
                    </Box>
                </Box>
            
            </Container>
        </Fragment>
        
    ); 
    
}

export default Helper