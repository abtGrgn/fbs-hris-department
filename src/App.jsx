import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChildrenList from "./components/pages/developer/children-list/ChildrenList";
import ParentList from "./components/pages/developer/parent/ParentList";
import { StoreProvider } from "./store/storeContext";
import Settings from "./components/pages/developer/settings/Settings";
import ServicesList from "./components/pages/developer/settings/services/ServicesList";
import PositionList from "./components/pages/developer/settings/position/PositionList";
import TableFreezeList from "./components/pages/developer/table-freeze/TableFreezeList";
import UsersList from "./components/pages/developer/settings/users/UsersList";
import RoleList from "./components/pages/developer/settings/users/role/RoleList";
import OtherList from "./components/pages/developer/settings/users/other/OtherList";
import JobList from "./components/pages/developer/settings/job/JobList";
import TableFreezeV2List from "./components/pages/developer/table-freeze-v2/TableFreezeV2List";
import Client from "./components/pages/developer/client/Client";
import Employees from "./components/pages/developer/employees/Employees";
import CompanyInfo from "./components/pages/developer/settings/company-info/CompanyInfo";
import Department from "./components/pages/developer/settings/departments/Department";
import JobLevel from "./components/pages/developer/settings/job/level/JobLevel";
import JobTitle from "./components/pages/developer/settings/job/title/JobTitle";
import Profile from "./components/pages/developer/profile/Profile";

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

              <Route path={`/employees`} element={<Employees/>}/>
              <Route path={`/client`} element={<Client/>}/>

              <Route path={`/settings`} element={<Settings />} />

              <Route path={`/settings/users`} element={<UsersList />} />
              <Route path={`/settings/users/role`} element={<RoleList />} />
              <Route path={`/settings/users/other`} element={<OtherList />} />

              <Route path={`/settings/job`} element={<JobList />} />
              <Route path={`/settings/job/level`} element={<JobLevel />} />
              <Route path={`/settings/job/title`} element={<JobTitle />} />
           
              <Route path={`/settings/departments`} element={<Department/>}/>
              <Route path={`/settings/company-info`} element={<CompanyInfo />}/>
              <Route path={`/settings/services`} element={<ServicesList />} />
              <Route path={`/settings/position`} element={<PositionList />} />
              <Route path={`/table-freeze`} element={<TableFreezeList />} />
              <Route path={`/table-freezev2`} element={<TableFreezeV2List />} />

              <Route path={`/employees/profile`} element={<Profile/>}/>
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
