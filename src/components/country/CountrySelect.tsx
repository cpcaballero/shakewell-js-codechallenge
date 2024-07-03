import countries from "i18n-iso-countries";
import Select, { SingleValue } from "react-select";
import { CountrySelectOption } from "./CountrySelectOption";

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// --- TASK G ---
// Please replace "any" with a proper type in this file (and where it is needed).

// Props
interface SelectProps {
  value: CountryProps;
  label: string;
}
export interface CountryProps {
  code: string;
  name: string;
}

interface CountrySelectProps {
  value?: CountryProps;
  onChange?: (value: CountryProps) => void;
}

// Constants
export const DEFAULT_COUNTRY: CountryProps = {
  code: "US",
  name: "United States of America",
};

// Component
export const CountrySelect = ({
  value = DEFAULT_COUNTRY,
  onChange,
}: CountrySelectProps) => {
  // Prepare Data
  const data = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => {
    return {
      value: { code, name },
      label: name,
    };
  });
  const defaultValue: SelectProps = { value: value, label: value.name };

  // Render
  return (
    <div>
      <label>
        Country
        <Select
          isMulti={false}
          options={data}
          components={{ Option: CountrySelectOption }}
          defaultValue={defaultValue}
          onChange={(newValue: SingleValue<SelectProps>) => {
            onChange?.(newValue?.value || defaultValue.value);
          }}
        />
      </label>
    </div>
  );
};

export default CountrySelect;
