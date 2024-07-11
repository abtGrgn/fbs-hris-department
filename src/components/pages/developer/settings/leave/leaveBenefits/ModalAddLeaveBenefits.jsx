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

const ModalAddLeaveBenefits = ({
  leaveBenefitsEdit,
  joblevel,
  jobtitle,
  leavetype,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  //activeJoblevel will be an array containing only the elements from joblevel.data where job_level_is_active is 1.
  const activeJoblevel = joblevel?.data.filter(
    (level) => level.job_level_is_active === 1
  );

  //activeJobtitle will be an array containing only the elements from joblevel.data where job_level_is_active is 1.
  const activeJobtitle = jobtitle?.data.filter(
    (title) => title.job_title_is_active === 1
  );

  //activeLeaveType will be an array containing only the elements from joblevel.data where job_level_is_active is 1.
  const activeLeaveType = leavetype?.data.filter(
    (type) => type.leave_type_is_active === 1
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        leaveBenefitsEdit
          ? `/v2/leaveBenefits/${leaveBenefitsEdit.leave_benefits_aid}`
          : `/v2/leaveBenefits`,
        leaveBenefitsEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leaveBenefits"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${leaveBenefitsEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    leave_benefits_aid: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_aid
      : "",
    leave_benefits_job_level_id: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_job_level_id
      : "",
    leave_benefits_job_title_id: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_job_title_id
      : "",
    leave_benefits_leave_type_id: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_leave_type_id
      : "",
    leave_benefits_days: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_days
      : "",

    leave_benefits_job_title_id_old: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_job_title_id
      : "",
    leave_benefits_leave_type_id_old: leaveBenefitsEdit
      ? leaveBenefitsEdit.leave_benefits_leave_type_id
      : "",
  };

  const yupSchema = Yup.object({
    leave_benefits_job_title_id: Yup.string().required("Required"),
    leave_benefits_leave_type_id: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>{leaveBenefitsEdit ? "Edit" : "Add"} Leave Benefits</h2>
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
                          name="leave_benefits_job_level_id"
                          disabled={mutation.isPending}
                        >
                          <option value="" hidden></option>
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
                        <InputSelect
                          label="*Job Title"
                          name="leave_benefits_job_title_id"
                          disabled={mutation.isPending}
                        >
                          <option value="" hidden></option>
                          {activeJobtitle.length === 0 ? (
                            <option value="">No Data</option>
                          ) : (
                            activeJobtitle.map((item, key) => (
                              <option value={item.job_title_aid} key={key}>
                                {item.job_title_name}
                              </option>
                            ))
                          )}
                        </InputSelect>
                      </div>
                      <div className="input-wrapper">
                        <InputSelect
                          label="*Leave Type"
                          name="leave_benefits_leave_type_id"
                          disabled={mutation.isPending}
                        >
                          <option value="" hidden></option>
                          {activeLeaveType.length === 0 ? (
                            <option value="">No Data</option>
                          ) : (
                            activeLeaveType.map((item, key) => (
                              <option value={item.leave_type_aid} key={key}>
                                {item.leave_type_name}
                              </option>
                            ))
                          )}
                        </InputSelect>
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="*Day(S)"
                          type="number"
                          name="leave_benefits_days"
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

export default ModalAddLeaveBenefits;
