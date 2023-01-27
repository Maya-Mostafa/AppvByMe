import * as React from 'react';
import styles from './AppvByMe.module.scss';
import {Icon, initializeIcons, MessageBar, MessageBarType} from '@fluentui/react';
import { IAppvByMeProps } from './IAppvByMeProps';
import {readAllLists, arrayUnique} from  '../Services/DataRequests';
import IListItems from './IListItems/IListItems';
import IFilterFields from './IFilterFields/IFilterFields';

export default function MyTasks (props: IAppvByMeProps){

  const [listItems, setListItems] = React.useState([]);
  const [formTitles, setFormTitles] = React.useState([]);
  const [preloaderVisible, setPreloaderVisible] = React.useState(true);
  const [filterFields, setFilterFields] = React.useState({
    title: {key: "", text: ""},
    formStatus: {key: "", text: ""},
    formDetails: ""
  });
  const queryParams = new URLSearchParams(window.location.search);

  React.useEffect(()=>{
    readAllLists(props.context, props.listUrl, props.listName, props.pageSize, props.testingEmail).then((r: any) =>{
      const listItemsForms = [];
      r.map(i=>{
        if(i.length > 0)
        listItemsForms.push({
          key: i[0].title,
          text: i[0].title
        });
      });
      setFormTitles(arrayUnique(listItemsForms, 'key').sort((a, b) => a.key.localeCompare(b.key)));
      
      setListItems(r.flat());
      setPreloaderVisible(false);

      const formTitleParam = queryParams.get("formTitle");
      if (queryParams.has("formTitle")){
        setFilterFields(prevState =>({
          ...prevState,
          ["title"] : {key: formTitleParam, text: formTitleParam}
        }));
      }

    });
  }, []);

  const onChangeFilterField = (fieldNameParam: string) =>{
    return(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: any) =>{   
      setFilterFields({
        ...filterFields,
        [fieldNameParam] : text || ""
      });
      if(fieldNameParam === "title"){
        if(text == undefined) window.history.replaceState({}, '', `${location.pathname}`);
        else{
          if (queryParams.has('formTitle')) queryParams.delete('formTitle');
          window.history.replaceState({}, '', `${location.pathname}?formTitle=${text.text}`);
        }
      }
    };
  };
  
  const resetSrch = () =>{    
    setFilterFields({
      title: {key: "", text: ""},
      formStatus: {key: "", text: ""},
      formDetails: ""
    });
  };

  return (
		<div className={styles.AppvByMe}>
			<h2>{props.wpTitle}</h2>

			<div className={styles.fieldsAndHelp}>
				<div className={styles.fieldsSection}>
					<IFilterFields
						filterField={filterFields}
						onChangeFilterField={onChangeFilterField}
						resetSrch={resetSrch}
						formTitlesOptions={formTitles}
					/>
				</div>
				{props.showHelp && (
					<div className={styles.helpSection}>
						<a
							href={props.helpLink}
							title={props.helpTitle}
							target='_blank'
							data-interception='off'
						>
							<Icon iconName='StatusCircleQuestionMark' />
						</a>
					</div>
				)}
			</div>

			{props.showHelpMsg && (
				<MessageBar
					messageBarType={MessageBarType.warning}
					isMultiline={true}
					className={styles.helpMsg}
				>
					{props.helpMsgTxt}
					<a href={props.helpMsgLink}>{props.helpMsgLinkTxt}</a>
				</MessageBar>
			)}

			<IListItems
				items={listItems}
				preloaderVisible={preloaderVisible}
				filterField={filterFields}
			/>
		</div>
  );
}
