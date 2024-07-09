import { InputArea, InputText, InputTextArea } from "@/components/helpers/FormInputs";
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

const ModalAddEmployeesInfo = ({ employeesInfoEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        employeesInfoEdit ? `/v2/employees_info/${employeesInfoEdit.employees_info_aid}` : `/v2/employees_info`,
        employeesInfoEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees_info"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successfully Updated!"));
      }
    },
  });

  const initVal = {
    employees_info_telephone: employeesInfoEdit ? employeesInfoEdit.employees_info_telephone : "",
    employees_info_address: employeesInfoEdit ? employeesInfoEdit.employees_info_address : "",
    employees_info_email: employeesInfoEdit ? employeesInfoEdit.employees_info_email : "",

    employees_info_telephone_old: employeesInfoEdit ? employeesInfoEdit.employees_info_telephone : "",
  };
  const yupSchema = Yup.object({
    employees_info_telephone: Yup.string().required("Required"),
    employees_info_address: Yup.string().required("Required"),
    employees_info_email: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Edit Employee Info</h2>
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
                        <InputText
                          label="Telephone No."
                          type="number"
                          name="employees_info_telephone"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Email"
                          type="text"
                          name="employees_info_email"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputTextArea
                          label="Address"
                          type="text"
                          name="employees_info_address"
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

export default ModalAddEmployeesInfo;
