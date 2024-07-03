import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React from 'react'
import CompanyInfoTable from './CompanyInfoTable'
import { StoreContext } from '@/store/storeContext'
import ModalEditCompanyInfo from './ModalEditCompanyInfo'
import useQueryData from '@/components/custom-hooks/useQueryData'
import { setIsAdd } from '@/store/storeAction'
import ModalSuccess from '@/components/partials/modal/modalSuccess'
import ModalError from '@/components/partials/modal/ModalError'

const CompanyInfoList = () => {
    const {store} = React.useContext(StoreContext);
    const [companyEdit, setCompanyEdit] = React.useState(null);

    // used if the page doesnt have a search
    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        error,
        data: company,
      } = useQueryData(
        `/v2/company`, // endpoint
        "get", // method
        "company" // key
      );
    
  return (
    <>
    <Header avatar="LR"/>
    <div className="flex">
        <Navigation menu="settings" submenu="company-info"/>
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
            <div className="h-screen">
                <div className="list-content">
                    <h2>Company Info</h2>
                </div> 
                <CompanyInfoTable setCompanyEdit={setCompanyEdit} company={company} isLoading={isLoading} isFetching={isFetching} status={status}/>
            </div>
        </div>
    </div>
    {store.success && <ModalSuccess/>}
    {store.isAdd && (<ModalEditCompanyInfo  companyEdit={companyEdit} />)}
    {store.error && <ModalError/>}
    </>
  )
}

export default CompanyInfoList
