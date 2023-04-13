// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { RaiseHandButton } from './RaiseHandButton';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTestLocale, mountWithLocalization } from './utils/testUtils';
import { registerIcons } from '@fluentui/react';

Enzyme.configure({ adapter: new Adapter() });

describe('RaiseHandButton strings should be localizable and overridable', () => {
  beforeEach(() => {
    registerIcons({
      icons: {
        controlbuttonraisehand: <></>,
        controlbuttonlowerhand: <></>
      }
    });
  });
  test('Should localize button label', async () => {
    const testLocale = createTestLocale({
      raiseHandButton: { offLabel: Math.random().toString(), onLabel: Math.random().toString() }
    });
    const component = mountWithLocalization(<RaiseHandButton showLabel={true} />, testLocale);
    expect(component.find('button').text()).toBe(testLocale.strings.raiseHandButton.offLabel);
    component.setProps({ checked: true });
    expect(component.find('button').text()).toBe(testLocale.strings.raiseHandButton.onLabel);
  });

  test('Should override button label with `strings` prop', async () => {
    const testLocale = createTestLocale({
      raiseHandButton: { offLabel: Math.random().toString(), onLabel: Math.random().toString() }
    });
    const raiseHandButtonStrings = { offLabel: Math.random().toString(), onLabel: Math.random().toString() };
    const component = mountWithLocalization(
      <RaiseHandButton showLabel={true} strings={raiseHandButtonStrings} />,
      testLocale
    );
    expect(component.find('button').text()).toBe(raiseHandButtonStrings.offLabel);
    component.setProps({ checked: true });
    expect(component.find('button').text()).toBe(raiseHandButtonStrings.onLabel);
  });
});
