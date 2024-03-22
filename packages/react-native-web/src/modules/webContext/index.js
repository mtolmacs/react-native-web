/**
 * Copyright (c) Mark Tolmacs.
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {
  createContext as clientCreateContext,
  useContext as clientUseContext,
  cache
} from 'react';

export function createContext<T>(defaultValue: T) {
  if (typeof clientCreateContext === 'undefined') {
    const getRef = cache(() => ({ current: defaultValue }));

    return {
      Provider: (props: any) => {
        getRef().current = props.value;

        return props.children;
      },
      getRef
    };
  }

  return clientCreateContext(defaultValue);
}

export const useContext =
  typeof clientCreateContext !== 'undefined'
    ? clientUseContext
    : (context) => {
        const getValue = () => context.getRef().current;

        const setValue = (value) => {
          context.getRef().current = value;
        };

        return [getValue, setValue];
      };
