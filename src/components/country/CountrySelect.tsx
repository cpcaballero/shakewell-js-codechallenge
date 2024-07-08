import countries from "i18n-iso-countries";
import Select, { PropsValue, SingleValue } from "react-select";
import {
  CountrySelectOption,
  CountrySingleValueOption,
} from "./CountrySelectOption";
import { DEFAULT_COUNTRY } from "../../constants";
import { useEffect, useState, useMemo, useCallback } from "react";

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// --- TASK G ---
// Please replace "any" with a proper type in this file (and where it is needed).

// Props
interface SelectProps {
  value: CountryProps;
  label: string;
  svg: string;
}
export interface CountryProps {
  code: string;
  name: string;
}

interface CountrySelectProps {
  value?: CountryProps;
  onChange?: (name: string, value: CountryProps) => void;
}

interface FlagProps {
  svg: string;
  code: string;
}

const EMPTY_SELECT_OPTION: SelectProps = {
  value: {
    code: "",
    name: "",
  },
  label: "",
  svg: "",
};

const DATA = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => {
  return {
    value: { code, name },
    label: name,
  };
});

// Component
export const CountrySelect = ({
  value = DEFAULT_COUNTRY,
  onChange,
}: CountrySelectProps) => {
  const [flags, setFlags] = useState<FlagProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] =
    useState<PropsValue<SelectProps>>();
  const [previousSelectedCountry, setPreviousSelectedCountry] =
    useState<PropsValue<SelectProps>>();

  const fetchFlag = async (countryCode: string): Promise<FlagProps> => {
    const url = `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryCode}.svg`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch flag for ${countryCode}`);
    }
    const svgUrl = await response.text();
    return { svg: svgUrl, code: countryCode };
  };

  const getFlagSvg = useCallback(
    (flagCode: string) => {
      const flagQuery = flags.find((flag) => flag.code == flagCode);
      if (flagQuery) {
        return flagQuery.svg;
      }
      return "";
    },
    [flags]
  );

  const fetchAllFlags = useCallback(async () => {
    const flagPromises = DATA.map((country) => fetchFlag(country.value.code));
    const flagResults = await Promise.allSettled(flagPromises);
    setFlags(
      flagResults.map((result) => ({
        code: result.status === "fulfilled" ? result.value.code : "",
        svg: result.status === "fulfilled" ? result.value.svg : "",
      }))
    );
    const defaultSvg = flagResults.find(
      (flag) =>
        flag.status === "fulfilled" &&
        flag.value.code == defaultValue.value.code
    );
    setIsLoading(false);
  }, [flags]);

  useEffect(() => {
    fetchAllFlags();
  }, []);

  const countryData = useMemo(() => {
    return DATA.map((country) => ({
      ...country,
      svg: getFlagSvg(country.value.code),
    }));
  }, [flags]);

  const defaultValue: SelectProps = useMemo(
    () => ({
      value: value,
      label: value.name,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342"><path fill="#FFF" d="M0 0h513v342H0z"/><g fill="#D80027"><path d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z"/></g><path fill="#2E52B2" d="M0 0h256.5v184.1H0z"/><g fill="#FFF"><path d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z"/></g></svg>', //getFlagSvg(value.code), // fetchFlag(value.code).then((result) => result.svg),
    }),
    [flags, getFlagSvg, value]
  );

  const savePreviousSelection = useCallback(() => {
    setPreviousSelectedCountry(selectedCountry);
    setSelectedCountry(EMPTY_SELECT_OPTION);
  }, []);

  const revertToLastSelection = useCallback(() => {
    if (JSON.stringify(selectedCountry) === JSON.stringify(EMPTY_SELECT_OPTION))
      setSelectedCountry(previousSelectedCountry);
  }, [selectedCountry]);

  // Render
  return (
    <div>
      <label>
        Country
        <Select
          isMulti={false}
          isClearable
          isLoading={isLoading}
          options={countryData}
          components={{
            Option: CountrySelectOption,
            SingleValue: CountrySingleValueOption,
          }}
          onMenuOpen={savePreviousSelection}
          onBlur={revertToLastSelection}
          value={selectedCountry}
          defaultValue={defaultValue}
          onChange={(newValue: SingleValue<SelectProps>) => {
            if (newValue === null) return;
            onChange?.("selectedCountry", newValue.value);
            setSelectedCountry(newValue);
          }}
        />
      </label>
    </div>
  );
};

export default CountrySelect;
