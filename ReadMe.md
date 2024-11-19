# Approved By Me forms
This dashboard list all the form that you have approved.

# Filters
This is filter on Approver1Per (person) = [me] Or Approver2Per (person) = [Me]
The field Approver1Per , Approver2Per doesn’t not always have a value

# Sorted by
Created date in descending order

# REST Calls
https://pdsb1.sharepoint.com/sites/PDSBForms/_api/web/Lists/GetByTitle('ApprovedByMeForms')/items

https://pdsb1.sharepoint.com/sites/Forms/lieu/_api/web/Lists/GetByTitle('Requests')/items?$top=50&$orderby=Created%20desc&$select=Created,FormStatus,Id,Title,Form_x0020_Title,DeptSubDeptGroupings,FullName1,FormDetail,Approver1Per/EMail,Approver2Per/EMail&$expand=Approver1Per,Approver2Per&$filter=Approver1Per/EMail%20eq%20%27rachel.marshall@peelsb.com%27%20or%20Approver2Per/EMail%20eq%20%27rachel.marshall@peelsb.com%27

https://pdsb1.sharepoint.com/sites/Forms/fc/_api/web/Lists/GetByTitle('Requests')/items?$top=50&$orderby=Created%20desc&$select=Created,FormStatus,Id,Title,Form_x0020_Title,DeptSubDeptGroupings,FullName1,FormDetail,Approver1Per/EMail,Approver2Per/EMail&$expand=Approver1Per,Approver2Per&$filter=Approver1Per/EMail%20eq%20%27rachel.marshall@peelsb.com%27%20or%20Approver2Per/EMail%20eq%20%27rachel.marshall@peelsb.com%27

# Node version
copy node_modules from any of the dashboards (myLocation, myArea...etc)
12.22.10