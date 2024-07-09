export const getEmployeeJobTitle = (jobtitle_id, jobtitle) => {
  let jobTitleName = "";

  jobtitle?.count > 0 &&
    jobtitle.data.map((item) => {
      console.log(Number(item.job_level_aid));
      if (Number(item.job_title_aid) === Number(jobtitle_id)) {
        jobTitleName = item.job_title_name;
        console.log(item.job_title_name);
      }
    });
  return jobTitleName;
};

export const getDepartmentName = (departments_id, departments) => {
    let departmentsName = "";
  
    departments?.count > 0 &&
      departments.data.map((item) => {
        if (Number(item.department_aid) === Number(departments_id)) {
          departmentsName = item.department_name;
        }
      });
    return departmentsName;
  };
