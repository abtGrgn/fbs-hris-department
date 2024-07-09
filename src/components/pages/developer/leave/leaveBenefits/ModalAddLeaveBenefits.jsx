import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import { StoreContext } from "@/store/storeContext";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalAddLeaveBenefits = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Add Leave Benefits</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
          <div className="modal-content">
            <Formik>
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Job Level"
                      name="leave_benefits_job_level_id"
                    ></InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Job Title"
                      name="leave_benefits_job_title_id"
                    ></InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Leave Type"
                      name="leave_benefits_leave_type_id"
                    ></InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText label="*Day(S)" name="leave_benefits_days" />
                  </div>
                </div>

                <div className="form-action">
                  <div className="form-btn">
                    <button className="btn-save rounded-md" type="submit">
                      Save
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
            </Formik>
          </div>
        </div>
      </ModalSideWrapper>
    </>
  );
};

export default ModalAddLeaveBenefits;
