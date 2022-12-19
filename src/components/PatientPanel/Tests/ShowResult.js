import { Chip } from "@mui/material";

const showResult = (result) => {
  switch (result) {
    case "N":
      return <Chip label="Negatywny" color="success" />;
    case "P":
      return <Chip label="Pozytywny" color="error" />;
    case "I":
      return <Chip label="Nieroztrzygający" color="primary" />;
    case null:
      return "Brak wyniku";
    default:
      return null;
  }
};

export default showResult;
