import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setIsCompanyInfoEdit,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalEditCompanyInfo = ({ companyEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
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
        companyEdit ? `/v2/company/${companyEdit.company_aid}` : `/v2/company`,
        companyEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
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
    company_aid: companyEdit ? companyEdit.company_aid : "",
    company_name: companyEdit ? companyEdit.company_name : "",
    company_email: companyEdit ? companyEdit.company_email : "",
    company_phone: companyEdit ? companyEdit.company_phone : "",
    company_street: companyEdit ? companyEdit.company_street : "",
    company_city: companyEdit ? companyEdit.company_city : "",
    company_province: companyEdit ? companyEdit.company_province : "",
    company_postal: companyEdit ? companyEdit.company_postal : "",
    company_country: companyEdit ? companyEdit.company_country : "",
    company_background: companyEdit ? companyEdit.company_background : "",
    company_submenu: companyEdit ? companyEdit.company_submenu : "",
    company_accent: companyEdit ? companyEdit.company_accent : "",
    company_logo: companyEdit ? companyEdit.company_logo : "",

    company_name_old: companyEdit ? companyEdit.company_name : "",
  };
  const yupSchema = Yup.object({
    company_name: Yup.string().required("Required"),
    company_email: Yup.string().required("Required"),
    company_phone: Yup.string().required("Required"),
    company_street: Yup.string().required("Required"),
    company_city: Yup.string().required("Required"),
    company_province: Yup.string().required("Required"),
    company_postal: Yup.string().required("Required"),
    company_country: Yup.string().required("Required"),
    company_background: Yup.string().required("Required"),
    company_submenu: Yup.string().required("Required"),
    company_accent: Yup.string().required("Required"),
    company_logo: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Update Company Info</h2>
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
                  <Form className="modal-form  ">
                    <div className="form-input">
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Company Name"
                          type="text"
                          name="company_name"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Company Email"
                          type="text"
                          name="company_email"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Company Phone"
                          type="number"
                          name="company_phone"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex gap-5 my-4">
                        <div className="input-wrapper !m-0">
                          <InputText
                            label="*Street"
                            type="text"
                            name="company_street"
                            disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-wrapper !m-0">
                          <InputText
                            label="*City"
                            type="text"
                            name="company_city"
                            disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex gap-5 my-4">
                        <div className="input-wrapper !m-0">
                          <InputText
                            label="*Province"
                            type="text"
                            name="company_province"
                            disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-wrapper !m-0">
                          <InputText
                            label="*Postal"
                            type="number"
                            name="company_postal"
                            disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <InputText
                          label="*Country"
                          type="text"
                          name="company_country"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Navigation Background Color"
                          type="text"
                          name="company_background"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Sub Menu Color"
                          type="text"
                          name="company_submenu"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Accent Color"
                          type="text"
                          name="company_accent"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="*Company Logo"
                          type="text"
                          name="company_logo"
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

export default ModalEditCompanyInfo;
