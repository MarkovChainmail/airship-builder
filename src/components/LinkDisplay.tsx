import { faLink, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from 'react';

export default function LinkDisplay({isLinked}: {isLinked: boolean}) {
  return (
    <FontAwesomeIcon icon={isLinked ? faLink : faLinkSlash} />
  );
}