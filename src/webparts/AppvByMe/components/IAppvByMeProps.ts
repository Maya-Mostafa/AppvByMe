import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAppvByMeProps {
  wpTitle: string;
  context: WebPartContext;
  listUrl: string;
  listName: string;
  pageSize: number;

  showHelp: boolean;
  helpLink: string;
  helpTitle: string;

  showHelpMsg: boolean;
  helpMsgTxt: string;
  helpMsgLink: string;
  helpMsgLinkTxt: string;
  testingEmail: string;
}
