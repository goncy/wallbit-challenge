export const getErrorMessage = (error: string) => {
  switch (error) {
    case "required":
      return "El campo es requerido";
    case "min":
      return "El valor debe ser mayor que cero";
    case "pattern":
      return "El valor debe ser un número";
    default:
      return "Ha ocurrido un error";
  }
};