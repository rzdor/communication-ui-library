// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RaiseHandCallFeature, RaisedHandChangedEvent } from '@azure/communication-calling';
import { CallContext } from './CallContext';
import { CallIdRef } from './CallIdRef';
import { toFlatCommunicationIdentifier } from '@internal/acs-ui-common';
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
    this._raiseHand.on('raisedHandEvent', this.raisedHandChanged);
    this._raiseHand.on('loweredHandEvent', this.loweredHandChanged);
  };

  public unsubscribe = (): void => {
    this._raiseHand.off('raisedHandEvent', this.raisedHandChanged);
    this._raiseHand.off('loweredHandEvent', this.loweredHandChanged);
  };

  private raisedHandChanged = (event: RaisedHandChangedEvent): void => {
    this.stateChanged(event, true);
  };

  private loweredHandChanged = (event: RaisedHandChangedEvent): void => {
    this.stateChanged(event, false);
  };

  private stateChanged = (event: RaisedHandChangedEvent, isRaised: boolean): void => {
    this._context.setCallRaisedHands(this._callIdRef.callId, this._raiseHand.getRaisedHands());
    this._context.setParticipantIsRaisedHand(
      this._callIdRef.callId,
      toFlatCommunicationIdentifier(event.identifier),
      isRaised
    );
  };
}
