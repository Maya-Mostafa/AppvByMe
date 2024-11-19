import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AppvByMeWebPartStrings';
import AppvByMe from './components/AppvByMe';
import { IAppvByMeProps } from './components/IAppvByMeProps';

export interface IAppvByMeWebPartProps {
  wpTitle: string;
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

export default class AppvByMeWebPart extends BaseClientSideWebPart<IAppvByMeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAppvByMeProps> = React.createElement(
      AppvByMe,
      {
        context: this.context,
        wpTitle: this.properties.wpTitle,
        listUrl: this.properties.listUrl,
        listName: this.properties.listName,
        pageSize: this.properties.pageSize,
        helpLink: this.properties.helpLink,
        helpTitle: this.properties.helpTitle,
        showHelp: this.properties.showHelp,
        showHelpMsg: this.properties.showHelpMsg,
        helpMsgTxt: this.properties.helpMsgTxt,
        helpMsgLink: this.properties.helpMsgLink,
        helpMsgLinkTxt: this.properties.helpMsgLinkTxt,
        testingEmail: this.properties.testingEmail,

        showStyledBorder: this.properties.showStyledBorder,
        showAltRowsColors: this.properties.showAltRowsColors,
        showOutsideBorders: this.properties.showOutsideBorders,
        showShadedHeading: this.properties.showShadedHeading,
        showBorderHeading: this.properties.showBorderHeading,
        showRowSeparators: this.properties.showRowSeparators,
        showRoundedBorders: this.properties.showRoundedBorders,
        colorTheme: this.properties.colorTheme,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('wpTitle', {
                  label: 'Webpart Title',
                  value: this.properties.wpTitle
                }),
                PropertyPaneTextField('listUrl', {
                  label: 'List URL',
                  value: this.properties.listUrl
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  value: this.properties.listName
                }),
                PropertyPaneTextField('pageSize', {
                  label: 'Number of Items',
                  value: this.properties.pageSize.toString()
                })
              ]
            },
            {
              groupName: "Help Icon",
              groupFields: [
                PropertyPaneCheckbox('showHelp', {
                  text: "Show help icon",
                  checked: this.properties.showHelp
                }),
                PropertyPaneTextField('helpTitle', {
                  label: 'Link Text',
                  value: this.properties.helpTitle
                }),
                PropertyPaneTextField('helpLink', {
                  label: 'Link',
                  value: this.properties.helpLink
                }),
              ]
            },
            {
              groupName: "Help Message",
              groupFields: [
                PropertyPaneCheckbox('showHelpMsg', {
                  text: "Show help message",
                  checked: this.properties.showHelpMsg
                }),
                PropertyPaneTextField('helpMsgTxt', {
                  label: 'Message Text',
                  value: this.properties.helpMsgTxt
                }),
                PropertyPaneTextField('helpMsgLinkTxt', {
                  label: 'Link Text',
                  value: this.properties.helpMsgLinkTxt
                }),
                PropertyPaneTextField('helpMsgLink', {
                  label: 'Link',
                  value: this.properties.helpMsgLink
                }),
              ]
            },
            {
              groupName: "Testing Purpose",
              groupFields: [
                PropertyPaneTextField('testingEmail', {
                  label: 'Email',
                  value: this.properties.testingEmail
                }),
              ]
            },
            {
              groupName: "Display",
              groupFields:[
                PropertyPaneCheckbox('showStyledBorder', {
                  text: 'Show styled border box around the filter fields',
                  checked: this.properties.showStyledBorder
                }),   
                PropertyPaneCheckbox('showAltRowsColors', {
                  text: 'Show alternating row colors ',
                  checked: this.properties.showAltRowsColors
                }),   
                PropertyPaneCheckbox('showOutsideBorders', {
                  text: 'Show outer borders',
                  checked: this.properties.showOutsideBorders
                }),  
                PropertyPaneCheckbox('showShadedHeading', {
                  text: 'Show shaded headers',
                  checked: this.properties.showShadedHeading
                }),  
                PropertyPaneCheckbox('showBorderHeading', {
                  text: 'Show header bottom border',
                  checked: this.properties.showBorderHeading
                }),  
                PropertyPaneCheckbox('showRowSeparators', {
                  text: 'Show row separators',
                  checked: this.properties.showRowSeparators
                }),
                PropertyPaneCheckbox('showRoundedBorders', {
                  text: 'Use rounded borders',
                  checked: this.properties.showRoundedBorders
                }),
                PropertyPaneDropdown('colorTheme', {
                  label: 'Color Theme',
                  options: [
                    {key: 'defaultColorTheme', text: 'Grey (Default)'},
                    {key: 'blueColorTheme', text: 'Blue'},
                    {key: 'greenColorTheme', text: 'Green'},
                    {key: 'redColorTheme', text: 'Red'},
                    {key: 'purpleColorTheme', text: 'Purple'},
                    {key: 'yellowColorTheme', text: 'Yellow'},
                    {key: 'orangeColorTheme', text: 'Orange'},
                  ],
                  selectedKey: this.properties.colorTheme
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
