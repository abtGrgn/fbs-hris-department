import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChildrenList from "./components/pages/developer/children-list/ChildrenList";
import ParentList from "./components/pages/developer/parent/ParentList";
import { StoreProvider } from "./store/storeContext";
import Settings from "./components/pages/developer/settings/Settings";
import ServicesList from "./components/pages/developer/settings/services/ServicesList";
import PositionList from "./components/pages/developer/settings/position/PositionList";
import TableFreezeList from "./components/pages/developer/table-freeze/TableFreezeList";
import CompanyInfoList from "./components/pages/developer/settings/company-info/CompanyInfoList";
import UsersList from "./components/pages/developer/settings/users/UsersList";
import RoleList from "./components/pages/developer/settings/users/role/RoleList";
import OtherList from "./components/pages/developer/settings/users/other/OtherList";
import DepartmentList from "./components/pages/developer/settings/departments/DepartmentList";
import JobLevelList from "./components/pages/developer/settings/job/level/JobLevelList";
import JobList from "./components/pages/developer/settings/job/JobList";
import JobTitleList from "./components/pages/developer/settings/job/title/JobTitleList";
import TableFreezeV2List from "./components/pages/developer/table-freeze-v2/TableFreezeV2List";
import EmployeesList from "./components/pages/developer/employees/EmployeesList";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={`*`} element={<h1>404 Error</h1>} />
              <Route path={`/children`} element={<ChildrenList />} />
              <Route path={`/parent`} element={<ParentList />} />

              <Route path={`/employees`} element={<EmployeesList/>}/>

              <Route path={`/settings`} element={<Settings />} />

              <Route path={`/settings/users`} element={<UsersList />} />
              <Route path={`/settings/users/role`} element={<RoleList />} />
              <Route path={`/settings/users/other`} element={<OtherList />} />

              <Route path={`/settings/job`} element={<JobList />} />
              <Route path={`/settings/job/level`} element={<JobLevelList />} />
              <Route path={`/settings/job/title`} element={<JobTitleList />} />
           
              <Route path={`/settings/departments`} element={<DepartmentList/>}/>
              <Route path={`/settings/company-info`} element={<CompanyInfoList />}/>
              <Route path={`/settings/services`} element={<ServicesList />} />
              <Route path={`/settings/position`} element={<PositionList />} />
              <Route path={`/table-freeze`} element={<TableFreezeList />} />
              <Route path={`/table-freezev2`} element={<TableFreezeV2List />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
