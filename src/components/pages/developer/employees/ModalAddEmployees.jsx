import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddEmployees = ({ employeesEdit, departments, jobtitle }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [addValue, setaddValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChange = (e) => {
    setaddValue(e.target.value);
  };

  //to get all the active department name in the departments table
  const activeDepartments = departments?.data.filter(
    (dept) => dept.department_is_active === 1
  );

  //to get all the active jobtitle name in the jobtitle table
  const activeJobtitle = jobtitle?.data.filter(
    (job) => job.jobTitle_is_active === 1
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

    employees_fname_old: employeesEdit ? employeesEdit.employees_fname : "",
  };

  const yupSchema = Yup.object({
    employees_fname: Yup.string().required("Required"),
    employees_lname: Yup.string().required("Required"),
    employees_job_title_id: Yup.string().required("Required"),
    employees_department_id: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>Employees</h2>
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
                          label="First Name"
                          name="employees_fname"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputText
                          label="Last Name"
                          name="employees_lname"
                          disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper my-4">
                        <InputSelect
                          label="Department"
                          name="employees_department_id"
                          disabled={mutation.isPending}
                        >
                          <option hidden>
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
                        </InputSelect>
                      </div>
                      <div className="input-wrapper my-4">
                        <InputSelect
                          label="Job Title"
                          name="employees_job_title_id"
                          disabled={mutation.isPending}
                        >
                          <option hidden>
                            Select Job Title
                          </option>
                          {activeJobtitle.length === 0 ? (
                            <option value="">No Data</option>
                          ) : (
                            activeJobtitle.map((item, key) => (
                              <option value={item.jobTitle_aid} key={key}>
                                {item.jobTitle_title}
                              </option>
                            ))
                          )}
                        </InputSelect>
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
    </>
  );
};

export default ModalAddEmployees;
