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

const ModalAddEmployees = ({
  employeesEdit,
  departments,
  jobtitle,
  client,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  //activeDepartments will be an array containing only the elements from departments.data where department_is_active is 1.
  const activeDepartments = departments?.data.filter(
    (dept) => dept.department_is_active === 1
  );

  //activeJobtitle will be an array containing only the elements from jobtitle.data where job_title_is_active is 1.
  const activeJobtitle = jobtitle?.data.filter(
    (job) => job.job_title_is_active === 1
  );

  //activeClient will be an array containing only the elements from client.data where client_is_active is 1.
  const activeClient = client?.data.filter(
    (client) => client.client_is_active === 1
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        employeesEdit
          ? `/v2/employees/${employeesEdit.employees_aid}`
          : `/v2/employees`,
        employeesEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${employeesEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    employees_aid: employeesEdit ? employeesEdit.employees_aid : "",
    employees_fname: employeesEdit ? employeesEdit.employees_fname : "",
    employees_lname: employeesEdit ? employeesEdit.employees_lname : "",
    employees_job_title_id: employeesEdit
      ? employeesEdit.employees_job_title_id
      : "",
    employees_department_id: employeesEdit
      ? employeesEdit.employees_department_id
      : "",
    employees_client_id: employeesEdit ? employeesEdit.employees_client_id : "",

    employees_fname_old: employeesEdit ? employeesEdit.employees_fname : "",
    employees_lname_old: employeesEdit ? employeesEdit.employees_lname : "",
  };

  const yupSchema = Yup.object({
    employees_fname: Yup.string().required("Required"),
    employees_lname: Yup.string().required("Required"),
    // employees_job_title_id: Yup.string().required("Required"),
    // employees_department_id: Yup.string().required("Required"),
    // employees_client_id: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>{employeesEdit ? "Edit" : "Add"} Employees</h2>
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
                          label="First Name"
                          name="employees_fname"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Last Name"
                          name="employees_lname"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputSelect
                          label="Department"
                          name="employees_department_id"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Departments">
                            <option hidden className="text-red-400">
                              Select Department
                            </option>
                            {activeDepartments.length === 0 ? (
                              <option value="">No Data</option>
                            ) : (
                              activeDepartments.map((item, key) => (
                                <option value={item.department_aid} key={key}>
                                  {item.department_name}
                                </option>
                              ))
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>

                      <div className="input-wrapper">
                        <InputSelect
                          label="Job Title"
                          name="employees_job_title_id"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Job Title">
                            <option hidden>Select Job Title</option>
                            {activeJobtitle.length === 0 ? (
                              <option value="">No Data</option>
                            ) : (
                              activeJobtitle.map((item, key) => (
                                <option value={item.job_title_aid} key={key}>
                                  {item.job_title_name}
                                </option>
                              ))
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>

                      <div className="input-wrapper">
                        <InputSelect
                          label="Client"
                          name="employees_client_id"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Client">
                            <option hidden>Select Client</option>
                            {activeClient.length === 0 ? (
                              <option value="">No Data</option>
                            ) : (
                              activeClient.map((item, key) => (
                                <option value={item.client_aid} key={key}>
                                  {item.client_name}
                                </option>
                              ))
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action">
                      <div className="form-btn">
                        <button
                          className="btn-save rounded-md"
                          type="submit"
                          disabled={mutation.isPending || !props.dirty} // pag may nilagay sa form "enable ang button" pag wala "babalik sa disabled ang button" no need of HandleChange
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

export default ModalAddEmployees;
