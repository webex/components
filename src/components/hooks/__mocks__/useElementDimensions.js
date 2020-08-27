import React from 'react';

export default function useElementDimensions() {
  return [React.createRef(), {height: 100, width: 100}];
}
