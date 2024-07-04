import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddLevel = ({ joblevelEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [addValue, setAddValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChange = (e) => {
    setAddValue(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        joblevelEdit
          ? `/v2/joblevel/${joblevelEdit.job_level_aid}`
          : `/v2/joblevel`,
        joblevelEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["joblevel"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${joblevelEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    job_level_aid: joblevelEdit ? joblevelEdit.job_level_aid : "",
    job_level_level: joblevelEdit ? joblevelEdit.job_level_level : "",

    job_level_level_old: joblevelEdit ? joblevelEdit.job_level_level : "",
  };
  const yupSchema = Yup.object({
    job_level_level: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>{joblevelEdit ? "Edit" : "Add"} Job Level</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
          <div className="modal-content">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values) => {
                console.log(values);
                mutation.mutate(values);
              }}
            >
              {(props) => {
                console.log(props);
                return (
                  <Form className="modal-form">
                    <div className="form-input">
                      <div className="input-wrapper mt-4">
                        <InputText
                          label="*Job Level Name"
                          name="job_level_level"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-action">
                      <div className="form-btn">
                        <button
                          className="btn-save rounded-md"
                          type="submit"
                          disabled={mutation.isPending || !props.dirty} // pag may nilagay sa form "enable ang button" pag wala "babalik sa disabled ang button"
                        >
                          {mutation.isPending ? <ButtonSpinner /> : "Save"}
                        </button>
                        <button
                          className="btn-discard rounded-md"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </ModalSideWrapper>
    </>
  );
};

export default ModalAddLevel;
