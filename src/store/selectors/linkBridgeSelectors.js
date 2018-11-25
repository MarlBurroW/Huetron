import { createSelector } from 'reselect';

export const linkedBridges = state => state.linkedBridges.bridges;

export const bridgeToLink = state => state.linkedBridges.bridgeToLink;

export const countDown = state => state.linkedBridges.coundDown;
