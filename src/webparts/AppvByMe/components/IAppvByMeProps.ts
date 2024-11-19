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

  showStyledBorder: boolean;
  showAltRowsColors: boolean;
  showOutsideBorders: boolean;
  showShadedHeading: boolean;
  showBorderHeading: boolean;
  showRowSeparators: boolean;
  showRoundedBorders: boolean;
  colorTheme: string;
}
