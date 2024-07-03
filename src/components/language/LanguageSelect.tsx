import ISO_6391_Languages from "iso-639-1";

import Select, { SingleValue } from "react-select";

// Props
interface LanguageSelectProps {
  language?: string;
  onChange?: (language: string) => void;
}

interface SelectProps {
  value: string;
  label: string;
}

// Constants
export const DEFAULT_LANGUAGE = "English - English";

// Component
const LanguageSelect = ({
  language = DEFAULT_LANGUAGE,
  onChange,
}: LanguageSelectProps) => {
  // Prepare data
  const data = ISO_6391_Languages.getLanguages([
    "en",
    "de",
    "pl",
    "fr",
    "it",
    "es",
  ]).map(({ name, nativeName }) => {
    return {
      value: name + " - " + nativeName,
      label: name + " - " + nativeName,
    };
  });
  const defaultValue: SelectProps = { value: language, label: language };

  // Render
  return (
    <div>
      <label>
        Language
        <Select
          isMulti={false}
          options={data}
          defaultValue={defaultValue}
          onChange={(newValue: SingleValue<SelectProps>) => {
            onChange?.(newValue?.value || defaultValue.value);
          }}
        />
      </label>
    </div>
  );
};

export default LanguageSelect;
