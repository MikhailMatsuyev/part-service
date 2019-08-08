import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getInterfaceConnections = (state: UniterState) => state.interfaceConnections;
export const getInterfaces = createSelector(getInterfaceConnections, ({ interfaces }) => interfaces);
export const getConnectedComponents = createSelector(getInterfaceConnections, ({ connectedComponents }) => connectedComponents);
export const getInterfaceNetworkData = createSelector(getInterfaceConnections, ({ networkData }) => networkData);
export const getInterfaceNetworkInterfaceNodes = createSelector(getInterfaceNetworkData, ({ interfaces }) => interfaces);
export const getInterfaceNetworkComponentNodes = createSelector(getInterfaceNetworkData, ({ components }) => components);
export const getInterfaceNetworkLinks = createSelector(getInterfaceNetworkData, ({ links }) => links);
export const getConnectionElements = createSelector(getInterfaceConnections, ({ connectionElements }) => connectionElements);
