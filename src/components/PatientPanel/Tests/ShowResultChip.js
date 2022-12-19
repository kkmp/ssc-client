import { Chip } from "@mui/material";

export const showResultChip = (result) => {
  switch (result) {
    case "N":
      return <Chip as="span" label="Negatywny" color="success" />;
    case "P":
      return <Chip as="span" label="Pozytywny" color="error" />;
    case "I":
      return <Chip as="span" label="Nieroztrzygający" color="primary" />;
    case null:
      return "Brak wyniku";
    default:
      return null;
  }
};
