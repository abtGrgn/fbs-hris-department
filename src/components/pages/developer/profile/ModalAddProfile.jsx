import { InputText } from "@/components/helpers/FormInputs";
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

const ModalAddProfile = ({ profileEdit, employees }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        profileEdit ? `/v2/profile/${profileEdit.profile_aid}` : `/v2/profile`,
        profileEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
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
    profile_telephone: profileEdit ? profileEdit.profile_telephone : "",
    profile_address: profileEdit ? profileEdit.profile_address : "",

    profile_telephone_old: profileEdit ? profileEdit.profile_telephone : "",
  };
  const yupSchema = Yup.object({
    profile_telephone: Yup.string().required("Required"),
    profile_address: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Edit Profile</h2>
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
                          type="text"
                          name="profile_telephone"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Address"
                          type="text"
                          name="profile_address"
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

export default ModalAddProfile;
