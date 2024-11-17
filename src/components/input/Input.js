import { useRef } from "react";

const InputText = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        value={props.value}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
        className={`form-control ${
          props.error && props.showError ? "is-invalid" : ""
        } `}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};
const InputTextArea = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <textarea
        value={props.value}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
        className={`form-control ${
          props.error && props.showError ? "is-invalid" : ""
        } `}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputSelect = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <select
        value={props.value}
        className={`form-control ${
          props.error && props.showError ? "is-invalid" : ""
        } `}
        onChange={e => props.onChange(e.target.value)}
      >
        {props.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputCheckbox = props => {
  const changeFeatureHandler = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      const newValue = [...props.value, value];
      props.onChange(newValue);
    } else {
      //zostawiam tylko te wartosci ktore sa rozne od  value
      const newValue = props.value.filter(x => x != value);
      props.onChange(newValue);
    }
  };
  return (
    <div className="form-group">
      {props.options.map(option => (
        <div className="custom-control custom-checkbox" key={option.value}>
          <label>
            {option.label}
            <input
              type="checkbox"
              className="custom-control-input"
              value={option.value}
              onChange={changeFeatureHandler}
              checked={props.value.find(x => x === option.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

const InputFile = props => {
  const fileRef = useRef();
  const changeHandler = e => {
    props.onChange(e.target.files[0]);
  };
  return (
    <div className="form-group">
      <h3>zdjecie</h3>
      <input type="file" ref={props.fileRef} onChange={changeHandler} />
    </div>
  );
};

const InputRadio = props => {
  return (
    <div className="form-group">
      {props.options.map(option => (
        <div className="custom-control custom-radio" key={option.value}>
          <label className="margin mr-1">
            {option.label}
            <input
              type={props.type}
              name={props.name}
              value={option.value}
              checked={props.value == option.value}
              onChange={e => props.onChange(e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

function Input(props) {
  if (props.type === "text") {
    return <InputText {...props} />;
  }
  if (props.type === "select") {
    return <InputSelect {...props} />;
  }
  if (props.type === "checkbox") {
    return <InputCheckbox {...props} />;
  }
  if (props.type === "file") {
    return <InputFile {...props} />;
  }
  if (props.type === "radio") {
    return <InputRadio {...props} />;
  }
  if (props.type === "textarea") {
    return <InputTextArea {...props} />;
  }
  if (props.type === "password") {
    return <InputText {...props} type="password" />;
  }
  if (props.type === "email") {
    return <InputText {...props} type="email" />;
  }
}
//jesli type nie będzie podany to chce mu przypiąć domyślnie text
Input.defaultProps = {
  type: "text",
  isValid: false,
  showError: false,
};
export default Input;
