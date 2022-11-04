// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Stack } from '@fluentui/react';
import { _DrawerSurface, CameraAndMicrophoneDomainPermissions } from '@internal/react-components';
import React, { useState } from 'react';
import { useLocale } from '../../../../../../react-components/src/localization';
import { MobilePreviewContainer } from '../../../../MobileContainer';

export const DomainPermissionsDrawer: () => JSX.Element = () => {
  const locale = useLocale().strings.CameraAndMicrophoneDomainPermissions;
  const [isDrawerShowing, setIsDrawerShowing] = useState(true);
  const onLightDismissTriggered = (): void => setIsDrawerShowing(false);
  return (
    <>
      <MobilePreviewContainer>
        {!isDrawerShowing && (
          <Stack
            styles={{ root: { cursor: 'pointer' } }}
            verticalFill
            verticalAlign="center"
            horizontalAlign="center"
            onClick={() => setIsDrawerShowing(true)}
          >
            Click to show drawer
          </Stack>
        )}
        {isDrawerShowing && (
          <_DrawerSurface onLightDismiss={onLightDismissTriggered}>
            <CameraAndMicrophoneDomainPermissions
              appName={'Contoso app'}
              onTroubleshootingClick={() => alert('clicked trouble shooting link')}
              strings={locale}
              type={'request'}
            />
          </_DrawerSurface>
        )}
      </MobilePreviewContainer>
    </>
  );
};
