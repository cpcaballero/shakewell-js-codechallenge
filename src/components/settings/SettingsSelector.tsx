import React, { RefObject, useCallback, useState, useRef } from "react";
import Modal from "react-modal";
import CountrySelect, { CountryProps } from "../country/CountrySelect";
import LanguageSelect from "../language/LanguageSelect";
import CurrencySelect from "../currency/CurrencySelect";
import {
  DEFAULT_COUNTRY,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
} from "../../constants";

/* --- [TASK] ---
Changes on modal are only applied on SAVE

CURRENT SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- Changes to any of the select inputs are immediately effective.
- The modal is dismissed using the **[Close]** button

DESIRED SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- There is a **[Save]** and a **[Cancel]** button, both serving to dismiss the modal.
- Changes are taking effect only on **[Save]**

FURTHER DETAILS
- Positioning of the buttons within the modal is not in the scope of this task
--- [TASK] --- */

/* --- [TASK] ---
Reduced number of unnecessary re-renders

CURRENT SCENARIO
- The `SettingsSelector`-Button re-renders too often
- It re-renders every time the modal is opened, closed, or on changing the select inputs

DESIRED SCENARIO
- The `SettingsSelector`-Button only re-renders when relevant data changes (Country, Language, Currency)

FURTHER DETAILS
- The `SettingsSelector`-Button has a render counter that will log to the console (do not remove)
- Be aware that #1 changes some relevant behaviour for this task
--- [TASK] --- */

/* --- [TASK] ---
Improved layout and styling of modal dialog (CSS)

CURRENT SCENARIO
- The modal dialog lacks intentional layout (spacings, dimensions).
- On smaller devices, the available space is not utilized effectively.

DESIRED SCENARIO
- Ensure consistent spacing, padding, and dimensions.
- Implement responsive or adaptive behavior for the modal, especially on smaller devices.

FURTHER DETAILS
- Focus on injecting and structuring CSS, using selectors and properties effectively.
- Feel free to apply your preferred spacing and dimensions; the provided designs mereley serve as examples. Just make sure it is consistent.
- Bonus points awarded for aesthetically appealing re-design of elements.
--- [TASK] --- */

/* --- [TASK] ---
Improved use of TypeScript

CURRENT SCENARIO
- In `SettingsSelector`, there are individual `useState()` calls for `Country`, `Language`, and `Currency`.
- Throughout the entire project, there are several instances of type `any`.
    Example: 
    ```typescript
    ... = React.useState<any>(DEFAULT_COUNTRY);
    ```
- Default values are constants that are exported by each component. 
    Example:
    ```typescript
    .... { DEFAULT_COUNTRY } from "../country/CountrySelect";
    ```

DESIRED SCENARIO
- Consolidate `Country`, `Language`, and `Currency` into a single "state".
- Extract default values from the components and make them configurable from a central point.
- Eliminate any remaining instances of type `any`.

OPTIONAL BONUS
- Replace `any` in the `*.stories.tsx`  files with appropriate types.
--- [TASK] --- */

/* --- [TASK] ---
 ReactDOM.render is no longer supported

CURRENT SCENARIO
- There is an error logging in the console
    `Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot`

DESIRED SCENARIO
- The error log does not appear
- The cause of the the warning is fixed

FURTHER DETAILS
- Downgrading to React 17 is not an option 😉
--- [TASK] --- */

interface SelectedSettingsButtonProps {
  buttonLabel: string;
  handleOpen: () => void;
  incrementCounter: () => void;
  counter: RefObject<number>;
}

// Component
const SettingsSelectorButton = React.memo(
  ({
    buttonLabel,
    handleOpen,
    incrementCounter,
    counter,
  }: SelectedSettingsButtonProps): JSX.Element => {
    // Increase render count.
    incrementCounter();

    // Log current render count.
    console.log("Render count of button is: " + counter.current);

    /* Button */
    return <button onClick={handleOpen}>{buttonLabel}</button>;
  }
);

interface SelectedOptionsTypes {
  selectedCountry: CountryProps;
  selectedCurrency: string;
  selectedLanguage: string;
}

const SettingsSelector = (): JSX.Element => {
  // States
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsTypes>({
    selectedCountry: DEFAULT_COUNTRY,
    selectedCurrency: DEFAULT_CURRENCY,
    selectedLanguage: DEFAULT_LANGUAGE,
  });
  const { selectedCountry, selectedCurrency, selectedLanguage } =
    selectedOptions;
  const [buttonLabel, setButtonLabel] = useState(
    `${selectedCountry.name} - (${selectedCurrency} - ${selectedLanguage})`
  );

  const handleSelectionChanges = (
    name: string,
    value: string | CountryProps
  ) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };

  // Render Counter
  const counter = useRef<number>(0);

  const incrementCounter = useCallback(() => counter.current++, []);

  // Actions
  const handleOpen = useCallback(() => {
    setModalIsOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    setButtonLabel(
      `${selectedCountry.name} - (${selectedCurrency} - ${selectedLanguage})`
    );
    handleClose();
  }, [selectedOptions]);

  // Render
  return (
    <div>
      <SettingsSelectorButton
        buttonLabel={buttonLabel}
        handleOpen={handleOpen}
        incrementCounter={incrementCounter}
        counter={counter}
      />
      {/* Modal */}
      <Modal isOpen={modalIsOpen}>
        {/* Header */}
        <h2>Select your region, currency and language.</h2>

        {/* Country */}
        <CountrySelect
          value={selectedOptions.selectedCountry}
          onChange={handleSelectionChanges}
        />

        {/* Currency */}
        <CurrencySelect
          value={selectedOptions.selectedCurrency}
          onChange={handleSelectionChanges}
        />

        {/* Language */}
        <LanguageSelect
          language={selectedOptions.selectedLanguage}
          onChange={handleSelectionChanges}
        />

        {/* Close button */}
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
