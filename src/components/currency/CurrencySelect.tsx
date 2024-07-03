import { data as CurrencyData } from "currency-codes";
import Select, { SingleValue } from "react-select";

// Props
interface CurrencySelectProps {
  value?: string;
  onChange?: (currency: string) => void;
}

interface SelectProps {
  value: string;
  label: string;
}

// Constants
export const DEFAULT_CURRENCY: string = "USD - US Dollar";

// Component
const CurrencySelect = ({
  value = DEFAULT_CURRENCY,
  onChange,
}: CurrencySelectProps) => {
  // Prepare data
  const data = CurrencyData.map(({ code, currency }) => {
    return {
      value: code + " - " + currency,
      label: code + " - " + currency,
    };
  });
  const defaultValue: SelectProps = {
    value: value,
    label: value,
  };

  // Render
  return (
    <div>
      <label>
        Currency
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

export default CurrencySelect;
