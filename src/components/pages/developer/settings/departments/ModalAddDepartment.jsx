import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { queryData } from "@/components/helpers/queryData";
import * as Yup from "yup";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";

const ModalAddDepartment = ({ departmentEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        departmentEdit
          ? `/v2/departments/${departmentEdit.department_aid}`
          : `/v2/departments`,
        departmentEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${departmentEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    department_aid: departmentEdit ? departmentEdit.department_aid : "",
    department_name: departmentEdit ? departmentEdit.department_name : "",

    department_name_old: departmentEdit ? departmentEdit.department_name : "",
  };
  const yupSchema = Yup.object({
    department_name: Yup.string().required("Required"),
  });

  return (
    <ModalSideWrapper>
      <main className="modal">
        <div className="modal-title">
          <h2>{departmentEdit ? "Edit" : "Add"} Department</h2>
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
                    <div className="input-wrapper my-4">
                      <InputText
                        label="*Department Name"
                        name="department_name"
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
      </main>
    </ModalSideWrapper>
  );
};

export default ModalAddDepartment;
