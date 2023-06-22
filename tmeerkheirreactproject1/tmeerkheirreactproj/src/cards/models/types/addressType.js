import { shape, string, number } from "prop-types";

const addressType = shape({
  state: string,
  country: string.isRequired,
  street: string.isRequired,
  houseNumber: string.isRequired,
  city: string.isRequired,
  zip: string,
});

export default addressType;
