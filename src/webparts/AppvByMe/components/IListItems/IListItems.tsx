import * as React from 'react';
import {IListItemsProps} from './IListItemsProps';
import styles from '../AppvByMe.module.scss';
import {MessageBar, MessageBarType, Spinner} from '@fluentui/react';
import { ListView, IViewField, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import * as moment from 'moment';

export default function IListItems (props: IListItemsProps) {
  
  const viewFields:IViewField [] = [
    {
        name: 'formStatus',
        displayName: 'Status',
        sorting: true,
        minWidth: 150,
        maxWidth: 200,
        isResizable: true,
        render : (item: any) => (
            <div>
                <div className={styles.formStatusCol}>
                    <img width="25" src={require(`../../formIcons/${item.formImgStatus}`)} />
                    <span>{item.formTextStatus}</span>
                </div>
            </div>
        )
    },
    {
        name: 'title',
        displayName : 'Form Title',
        minWidth: 150,
        maxWidth: 250,
        sorting: true,
        isResizable: true,
        render : (item: any) => (
        <div>
            {/* <a className={styles.defautlLink} target="_blank" data-interception="off" href={`${item.listUrl}/Lists/${item.listName}/DispForm.aspx?ID=${item.id}`}>{item.title}</a> */}
            {item.fileRef.toLowerCase().indexOf('.xml') !== -1 ? 
                <a className={styles.defautlLink} target="_blank" data-interception="off" href={item.fileRef}>{item.title}</a>
            :
                <a className={styles.defautlLink} target="_blank" data-interception="off" href={`${item.listUrl}/Lists/${item.listName}/DispForm.aspx?ID=${item.id}`}>{item.title}</a>
            }
        </div>
        )
    },
    {
        name: 'fullName',
        displayName: 'Name',
        sorting: true,
        minWidth: 100,
        maxWidth: 100,
        render : (item: any) => (
            <div>
                <div>{item.fullName}</div>
            </div>
        )
    },
    {
        name: 'CreatedDate',
        displayName: 'Created',
        minWidth: 150,
        maxWidth: 200,
        sorting: true,
        isResizable: true,
        render : (item: any) => (
        <div>
            {moment(item.created).format('MM/DD/YYYY')}
        </div>
        )
    },
    {
        name: 'formDetails',
        displayName: 'Details',
        minWidth: 150,
        maxWidth: 200,
        sorting: true,
        isResizable: true,
        render : (item: any) => (
        <div>
            {item.formDetails}
        </div>
        )
    },
    
  ];
  const groupByFields: IGrouping[] = [
    {
        name: "deptGrp", 
        order: GroupOrder.ascending 
    },
    {
        name: "subDeptGrp", 
        order: GroupOrder.ascending 
    }
  ];

  const filteredItems = (props.items.filter((listItem: any)=>{
    let filterFieldVal: string;
    for (let i in props.filterField) {
        filterFieldVal = typeof(props.filterField[i]) === 'object' ? props.filterField[i].key : props.filterField[i];
        if (listItem[i] === undefined || listItem[i].toString().toLowerCase().indexOf(filterFieldVal.toLowerCase()) === -1)
            return false;
    }
    return true;
  }));
  

  return(
    <div className={styles.listViewNoWrap}>
        <ListView
            items={filteredItems}
            viewFields={viewFields}
            groupByFields={groupByFields}
            // stickyHeader={true} 
            compact={true}
        />
        {filteredItems.length === 0 && !props.preloaderVisible &&
            <MessageBar
                messageBarType={MessageBarType.warning}
                isMultiline={false}>
                Sorry, there is no data to display.
            </MessageBar>
        } 
        {props.preloaderVisible &&
            <div>
                <Spinner label="Loading data, please wait..." ariaLive="assertive" labelPosition="right" />
            </div>
        }
    </div>
  );
}





