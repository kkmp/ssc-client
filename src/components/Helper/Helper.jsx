import React, { useState, useEffect, Fragment} from "react";
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
                <Box bgcolor={"azure"} flex={5}>
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
                                Obsługa panelu pacjenta
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Jak filtrować listę pacjentów? itd.</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
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
                                Jak doodawać pacjentów? itd.
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
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
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                amet egestas eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Zmiana danych użytkownika</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Dowiedz się co należy zrobić
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                amet egestas eros, vitae egestas augue. Duis vel est augue.
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