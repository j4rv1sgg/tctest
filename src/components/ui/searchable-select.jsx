import { Controller } from 'react-hook-form';
import Select from 'react-select';

const SearchableSelect = ({
  name,
  control,
  options,
  placeholder,
  isMulti = false,
  ...props
}) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      '.css-hlgwow': {
      padding: 0,
    },
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: 0,
      borderBottom: '1px solid #ccc',
      boxShadow: 'none',
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      {...props}
      render={({ field }) => (
        <Select
          styles={customStyles}
          {...field}
          options={options}
          isMulti={isMulti}
          placeholder={placeholder}
          onChange={(option) => field.onChange(option)}
          isSearchable
          components={{
            IndicatorSeparator: () => null
          }}
        />
      )}
    />
  );
};

export default SearchableSelect;
