import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPHttpClient} from "@microsoft/sp-http";

const getImgStatus = (formStatus: string) =>{
  let imgStatusName: string, imgStatusText: string;
  switch (formStatus){
    case 'Completed':
      imgStatusName = 'completed.svg';
      imgStatusText = 'Completed';
      break;
    case 'Department_Accepted':
      imgStatusName = 'deptAccepted.svg';
      imgStatusText = 'Accepted by the Department';
      break;
    case 'Department_Rejected':
      imgStatusName = 'deptRejected.svg';
      imgStatusText = 'Rejected by the Department';
      break;
    case 'Approver1_Accepted':
      imgStatusName = 'personAccepted.svg';
      imgStatusText = 'Accepted by Approver';
      break;
    case 'Approver1_Rejected':
      imgStatusName = 'personRejected.svg';
      imgStatusText = 'Rejected by Approver';
      break;
    case 'Submitted':
    case 'Approver1_Inprogress':
    case 'Superintendent_Inprogress':
    case 'Department_Inprogress':
      imgStatusName = 'submitted.svg';
      imgStatusText = 'In Progress for Approval';
      break;
    case 'Superintendent_Accepted':
      imgStatusName = 'superAccepted.svg';
      imgStatusText = 'Accepted by Superintendent';
      break;
    case 'Superintendent_Rejected':
      imgStatusName = 'superRejected.svg';
      imgStatusText = 'Rejected by Superintendent';
      break;
    case 'New':

      imgStatusName = 'new.svg';
      imgStatusText = 'New';
      break;
    case 'Approver1_Invalid':
    case 'Superintendent_Invalid':
    case 'Department_Invalid':
      imgStatusName = 'invalid.svg';
      imgStatusText = 'Invalid';
      break;
    default:
      imgStatusName = 'other.svg';
      imgStatusText = 'Other';
      break;
  }
  return [imgStatusName, imgStatusText];
};

const getListItems = async (context: WebPartContext, listUrl: string, listName: string, listDisplayName: string, pageSize: number) =>{
  
  const listData: any = [];
  const currUserEmail = context.pageContext.user.email;
  const currUserDisplayName = context.pageContext.user.displayName;

  //Hard-coded - for testing purposes --Start
  //const currUserEmail = 'rachel.marshall@peelsb.com';
  //const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$top=${pageSize}`;

  //working
  // const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$top=${pageSize}&$filter=BoardEmail eq '${currUserEmail}'`;
  
  //const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$top=${pageSize}&$select=Id,Title,DueDate,Status,AssignedTo/EMail&$expand=AssignedTo&$filter=Status ne 'Completed'`;
  //Hard-coded - for testing purposes --End

  //const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$orderby=Created desc&$select=Created,Id,Form_x0020_Title,FormStatus,FullName1,FormDetail,DeptSubDeptGroupings,Author/EMail&$expand=Author&$top=${pageSize}&$filter=BoardEmail eq '${currUserEmail}' or Author/EMail eq '${currUserEmail}'`;

  const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$top=${pageSize}`;
  
  try{

    const response = await context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1); //.then(r => r.json());

    if (response.ok){
      const results = await response.json();
      if(results){
        results.value.map((item: any)=>{
          listData.push({
            id: item.Id,
            title: item.Title || "",
            //title: item.Form_x0020_Title || "",
            formStatus: item.Status || "",
            formImgStatus: getImgStatus(item.Status)[0],
            formTextStatus: getImgStatus(item.Status)[1],
            fullName: item.FullName1 || "",
            formDetails: item.FormDetail || "",
            deptGrp: item.DeptSubDeptGroupings ? item.DeptSubDeptGroupings.substring(0, item.DeptSubDeptGroupings.indexOf('|')) : "",
            subDeptGrp: item.DeptSubDeptGroupings ? item.DeptSubDeptGroupings.substring(item.DeptSubDeptGroupings.indexOf('|')+1) : "",
            listUrl: listUrl,
            listName: listName,
            listDisplayName: listDisplayName,
            created: item.Created
          });
        });
      }
    }else{
      console.log("Form Error: " + listUrl + listName + response.statusText);
      return [];
    }

  }catch(error){
    console.log("Form Response Error: " + error);
  }
  

  return listData;
};

export const readAllLists = async (context: WebPartContext, listUrl: string, listName: string, pageSize: number) =>{
  const listData: any = [];
  let aggregatedListsPromises : any = [];
  const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items`;
  
  try{
    const response = await context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1);

    if (response.ok){
      const responseResult = await response.json();
      if (responseResult){
        responseResult.value.map((item: any)=>{
          listData.push({
            listName: item.Title,
            listDisplayName: item.ListDisplayName,
            listUrl: item.ListUrl
          });
        });
      
        listData.map((listItem: any)=>{
          aggregatedListsPromises = aggregatedListsPromises.concat(getListItems(context, listItem.listUrl, listItem.listName, listItem.listDisplayName, pageSize));
        });
        
      }
    }else{
      alert("Forms Error: " + listUrl + listName + ' - ' + response.statusText);
      return [];
    }
  }catch(error){
    console.log("Forms List Error: " + error);
  }

  return Promise.all(aggregatedListsPromises);
  
};

export const isObjectEmpty = (items: any): boolean=>{
  let isEmpty:boolean = true;
  for (const item in items){
    isEmpty = items[item] === "" && isEmpty ;
  }
  return isEmpty;
};


export const arrayUnique = (arr, uniqueKey) => {
  const flagList = [];
  return arr.filter(function(item) {
    if (flagList.indexOf(item[uniqueKey]) === -1) {
      flagList.push(item[uniqueKey]);
      return true;
    }
  });
};