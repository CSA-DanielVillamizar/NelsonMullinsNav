import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { trimWithEllipsis } from '../services/Utilities';
import { IIntranetSearchResult } from '../services/spdata.service';
import { navigate } from '../services/Utilities';

import classes from './IntranetResultSummary.module.scss';

export interface IIntranetResultSummaryProps {
  intranetSearchResults: IIntranetSearchResult[];
  onMoreClick: () => void;
  onResultClick: (url: string) => void;
}

export const IntranetResultSummary = (
  props: IIntranetResultSummaryProps
): React.ReactElement<IIntranetResultSummaryProps> => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Intranet Search Results</div>
        <div>
          <button
            type="button"
            className={classes.moreLinkButton}
            onClick={() => props.onMoreClick()}
          >
            <span className={classes.moreText}>More</span>{' '}
            <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
          </button>
        </div>
      </div>
      <div className={classes.inner}>
        {props.intranetSearchResults && props.intranetSearchResults.length > 0 &&
          <ul>
            {props.intranetSearchResults.map((result: IIntranetSearchResult, index: number) => (
              <li key={index} className={classes.resultItem}>
                <button className={classes.linkButton} type="button" onClick={() => props.onResultClick(result.url)}>
                  <div>
                    <a href="#">{result.title}</a>
                  </div>
                  <div className={classes.description}>{trimWithEllipsis(result.description, 130)}</div>
                </button>
              </li>
            ))}
          </ul>}
        {!props.intranetSearchResults ||
          (props.intranetSearchResults.length <= 0 && (
            <div className={classes.noResults}>No results to display...</div>
          ))}
      </div>
    </div>
  );
};
