import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';

import * as strings from 'NmrsNavigationApplicationCustomizerStrings';
import Header, { IHeaderProps } from '../../components/Header';

const LOG_SOURCE: string = 'NmrsNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INmrsNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NmrsNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<INmrsNavigationApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const placeHolder: PlaceholderContent | undefined =
      this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this.handleDispose });
    /* tslint:disable no-any */
    const newDiv: any = document.createElement('div');
    newDiv.innerText = 'OK';

    if (placeHolder) {
      placeHolder.domElement.appendChild(newDiv);

      const element: React.ReactElement<IHeaderProps> = React.createElement(Header);
      ReactDOM.render(element, placeHolder.domElement);
    }

    return Promise.resolve();
  }

  private handleDispose(): void {
    console.log('dispose');
  }
}
