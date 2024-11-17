import { useEffect, useRef, useState } from "react";
import Input from "../../../components/input/Input";
import { validate } from "../../../helpers/validations";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import useAuth from "../../../hooks/useAuth";

const HotelForm = props => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [form, setForm] = useState({
    name: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", { rule: "min", length: 4 }],
    },
    city: {
      value: "",
      error: "",
      showError: false,
      rules: ["required"],
    },
    description: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", { rule: "min", length: 10 }],
    },
    rooms: {
      value: 2,
      error: "",
      showError: false,
      rules: ["required"],
    },
    features: {
      value: [],
      error: "",
      showError: false,
    },
    image: {
      value: null,
      error: "",
      showError: false,
    },
    status: {
      value: 0,
      error: "",
      showError: false,
      rules: ["required"],
    },
  });

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error,
      },
    });
  };

  const submit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      props.onSubmit({
        name: form.name.value,
        description: form.description.value,
        city: form.city.value,
        rooms: form.rooms.value,
        features: form.features.value,
        status: form.status.value,
        user_id: auth.userId,
      });
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  };
  useEffect(() => {
    const newForm = { ...form };
    for (const key in props.hotel) {
      newForm[key].value = props.hotel[key]; // w nowym formularzu nadpisze value na te nowe wartosci
      //jesli petla przeleci wszystkie hotele,wszystkie wartosci zostana nadpisane
    }
    setForm(newForm);
  }, [props.hotel]);
  return (
    <form onSubmit={submit}>
      <Input
        label="Nazwa"
        value={form.name.value}
        onChange={value => changeHandler(value, "name")}
        error={form.name.error}
        showError={form.name.showError}
      />

      <Input
        label="Miejscowosc"
        value={form.city.value}
        onChange={value => changeHandler(value, "city")}
        error={form.city.error}
        showError={form.city.showError}
      />
      <Input
        label="Ilosc pokoji"
        value={form.rooms.value}
        type="select"
        onChange={value => changeHandler(value, "rooms")}
        options={[
          {
            value: 1,
            label: 1,
          },
          {
            value: 2,
            label: 2,
          },
          {
            value: 3,
            label: 3,
          },
          {
            value: 4,
            label: 4,
          },
        ]}
        error={form.rooms.error}
        showError={form.rooms.showError}
      />
      <h3>Udogodnienia</h3>

      <Input
        type="checkbox"
        value={form.features.value}
        onChange={value => changeHandler(value, "features")}
        options={[
          {
            value: "tv",
            label: "TV",
          },
          {
            value: "wifi",
            label: "Wi-Fi",
          },
          { value: "parking", label: "Parking" },
        ]}
      />
      <Input type="file" onChange={value => changeHandler(value, "image")} />

      <h3>Status</h3>
      <Input
        type="radio"
        value={form.status.value}
        onChange={value => changeHandler(value, "status")}
        name="status"
        options={[
          {
            value: "1",
            label: "aktywny",
          },
          {
            value: "0",
            label: "ukryty",
          },
        ]}
        error={form.status.error}
        showError={form.status.showError}
      />
      <Input
        label="Opis"
        value={form.description.value}
        onChange={value => changeHandler(value, "description")}
        error={form.description.error}
        showError={form.description.showError}
        type="textarea"
      />
      <div className="text-right">
        <LoadingButton loading={loading} className="btn-success">
          {props.buttonText}
        </LoadingButton>
      </div>
    </form>
  );
};

export default HotelForm;
