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

const ModalAddLeaveType = ({ leaveTypeEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        leaveTypeEdit
          ? `/v2/leavetype/${leaveTypeEdit.leave_type_aid}`
          : `/v2/leavetype`,
        leaveTypeEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leavetype"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${leaveTypeEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    leave_type_aid: leaveTypeEdit ? leaveTypeEdit.leave_type_aid : "",
    leave_type_name: leaveTypeEdit ? leaveTypeEdit.leave_type_name : "",

    leave_type_name_old: leaveTypeEdit ? leaveTypeEdit.leave_type_name : "",
  };

  const yupSchema = Yup.object({
    leave_type_name: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>{leaveTypeEdit ? "Edit" : "Add"} Leave Type</h2>
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
                          label="*Type Name"
                          name="leave_type_name"
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

export default ModalAddLeaveType;
