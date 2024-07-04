import { InputSelect, InputText } from "@/components/helpers/FormInputs";
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

const ModalAddTitle = ({ jobtitleEdit, joblevel }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  //activeJoblevel will be an array containing only the elements from joblevel.data where job_level_is_active is 1.
  const activeJoblevel = joblevel?.data.filter(
    (level) => level.job_level_is_active === 1
  );
  

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        jobtitleEdit
          ? `/v2/jobtitle/${jobtitleEdit.job_title_aid}`
          : `/v2/jobtitle`,
        jobtitleEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobtitle"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${jobtitleEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    job_title_aid: jobtitleEdit ? jobtitleEdit.job_title_aid : "",
    job_title_job_level_id: jobtitleEdit ? jobtitleEdit.job_title_job_level_id : "",
    job_title_name: jobtitleEdit ? jobtitleEdit.job_title_name : "",

    job_title_job_level_id_old: jobtitleEdit ? jobtitleEdit.job_title_job_level_id : "",
    job_title_name_old: jobtitleEdit ? jobtitleEdit.job_title_name : "",
  };
  const yupSchema = Yup.object({
    job_title_job_level_id: Yup.string().required("Required"),
    job_title_name: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>{jobtitleEdit ? "Edit" : "Add"} Job Title</h2>
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
                      <div className="input-wrapper">
                        <InputSelect
                          label="*Job Level"
                          name="job_title_job_level_id"
                          disabled={mutation.isPending}
                        >
                          <option value="" hidden>
                            Select Job Level
                          </option>
                          {activeJoblevel.length === 0 ? (
                            <option value="">No Data</option>
                          ) : (
                            activeJoblevel.map((item, key) => (
                              <option value={item.job_level_aid} key={key}>
                                {item.job_level_level}
                              </option>
                            ))
                          )}
                        </InputSelect>
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="*Job Title"
                          type="text"
                          name="job_title_name"
                          disabled={mutation.isPending}
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

export default ModalAddTitle;
