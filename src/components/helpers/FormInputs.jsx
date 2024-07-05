import { useField } from "formik";

// INPUT 
export const InputText = ({
  label = "",
  required = true,
  className = "text-[12px] outline-none  focus:border-[#9f1659] " ,
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      {label !== "" && (
        <label
          htmlFor={props.id || props.name}
          className={meta.touched && meta.error ? `error-show` : ""}
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
        ref={refVal}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

// -> FORM INPUTS
export const InputSelect = ({ label, onChange = null, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

//FORM AREA
export const InputArea = ({
  label = "",
  required = true,
  className = "text-[12px]",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      {label !== "" && (
        <label
          htmlFor={props.id || props.name}
          className={meta.touched && meta.error ? `error-show` : ""}
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
        ref={refVal}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};
