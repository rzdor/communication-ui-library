// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RaiseHandCallFeature } from '@azure/communication-calling';
import { CallContext } from './CallContext';
import { CallIdRef } from './CallIdRef';
/**
 * @private
 */
export class RaiseHandSubscriber {
  private _callIdRef: CallIdRef;
  private _context: CallContext;
  private _raiseHand: RaiseHandCallFeature;

  constructor(callIdRef: CallIdRef, context: CallContext, raiseHand: RaiseHandCallFeature) {
    this._callIdRef = callIdRef;
    this._context = context;
    this._raiseHand = raiseHand;

    this.subscribe();
  }

  private subscribe = (): void => {
    this._raiseHand.on('raisedHandEvent', this.isRaisedHandChanged);
    this._raiseHand.on('loweredHandEvent', this.isRaisedHandChanged);
  };

  public unsubscribe = (): void => {
    this._raiseHand.off('raisedHandEvent', this.isRaisedHandChanged);
    this._raiseHand.off('loweredHandEvent', this.isRaisedHandChanged);
  };

  private isRaisedHandChanged = (): void => {
    this._context.setCallRaisedHands(this._callIdRef.callId, this._raiseHand.getRaisedHands());
  };
}
