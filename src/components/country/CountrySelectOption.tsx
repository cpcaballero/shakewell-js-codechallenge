import { OptionProps, SingleValueProps, components } from "react-select";
import { CountryProps } from "./CountrySelect";

import "./CountrySelectOption.css";
/* --- [TASK] ---
Country flags in select field

CURRENT SCENARIO
- The `CountrySelect` displays only the names of the countries.

DESIRED SCENARIO
- The `CountrySelect` displays the corresponding country flag next to the title.
- Flags are visible in both the options and the input field, drawing inspiration from this example:

FURTHER DETAILS
- No expectation to alter the dimensions of the select field, though it's optional.
- Implement a well-considered layout strategy.
- Retrieve flag icons from:
    `https://catamphetamine.gitlab.io/country-flag-icons/3x2/<ISO_CODE>.svg` (codes are in uppercase)
- Note that the `'i18n-iso-countries'` package in use already contains the compatible codes.
- Flags appearing on the `SettingsSelector`-Button is optional
--- [TASK] --- */

interface OptionType {
  value: CountryProps;
  label: string;
  svg: string;
}

// Component
export const CountrySelectOption = (props: OptionProps<OptionType>) => (
  <components.Option {...props}>
    <div className="selectorOption">
      <div
        className="flagIcon"
        dangerouslySetInnerHTML={{ __html: props.data.svg }}
      />
      <div>{props.data.label}</div>
    </div>
  </components.Option>
);

export const CountrySingleValueOption = (
  props: SingleValueProps<OptionType>
) => (
  <components.SingleValue {...props}>
    <div className="selectorOption">
      <div
        className="flagIcon"
        dangerouslySetInnerHTML={{ __html: props.data.svg }}
      />
      <div>{props.data.label}</div>
    </div>
  </components.SingleValue>
);
