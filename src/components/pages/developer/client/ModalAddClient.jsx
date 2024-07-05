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
import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddClient = ({clientEdit}) => {
  const { store, dispatch } = useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        clientEdit ? `/v2/client/${clientEdit.client_aid}` : `/v2/client`,
        clientEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${clientEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    client_aid: clientEdit ? clientEdit.client_aid : "",
    client_name: clientEdit ? clientEdit.client_name : "",

    client_name_old: clientEdit ? clientEdit.client_name : "",
  };
  const yupSchema = Yup.object({
    client_name: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>{clientEdit ? "Edit" : "Add"} Client</h2>
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
                          label="Client Name"
                          name="client_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                    </div>
                    <div className="form-action">
                      <div className="form-btn">
                        <button
                          className="btn-save rounded-md"
                          type="submit"
                          disabled={mutation.isPending || !props.dirty}
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
    </>
  );
};

export default ModalAddClient;
