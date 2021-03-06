import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "input__field--form form-select" + (error ? " is-invalid" : "");
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options.map((option) => ({ label: option.name, value: option._id }));

  return (
    <div className="input__field--container mb-2">
      <label htmlFor="validationCustom04">
        <strong>{label}</strong>
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
};

export default SelectField;
