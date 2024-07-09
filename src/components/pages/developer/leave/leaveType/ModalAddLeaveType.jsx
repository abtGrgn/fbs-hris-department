import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import { StoreContext } from "@/store/storeContext";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalAddLeaveType = () => {
    const {store, dispatch} = React.useContext(StoreContext);

    const handleClose = () => {
        dispatch(setIsAdd(false));
    }

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Add Leave Type</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
          <div className="modal-content">
            <Formik>
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper">
                    <InputText label="*Type Name" name="leave_type_name" />
                  </div>
                </div>

                <div className="form-action">
                  <div className="form-btn">
                    <button className="btn-save rounded-md" type="submit">
                      Save
                    </button>
                    <button className="btn-discard rounded-md" onClick={handleClose}>
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

export default ModalAddLeaveType;
