// ui
import React, { useEffect, useState } from "react";
import {
  Badge,
  SideNavigation,
} from "@cloudscape-design/components";

// apis
import { API, graphqlOperation } from 'aws-amplify'
import { listWorkspaces } from '../graphql/queries'

export function Workspace ({setActiveWorkspace}) {
  const [workspaces] = useAsyncData(() => fetchWorkspaceApi());

  return (
    <SideNavigation
      header={{ text: "Workspace" }}
      onFollow={event => {
        if (!event.detail.external && event.detail.text !== "Workspace") {
          event.preventDefault();
          setActiveWorkspace(event.detail.id);
        }
      }}
      items={workspaces}
    />
  );
}

function useAsyncData(loadWorkspaces) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let rendered = true;
    loadWorkspaces().then(items => {
      if (rendered) {
        setItems(items);
        setLoading(false);
      }
    });
    return () => {
      rendered = false;
    };
  }, [loadWorkspaces]);

  return [items, loading];
}

// graphql apis
function fetchWorkspaceApi() {
  try {
    return API.graphql(graphqlOperation(listWorkspaces)).then(
      result => {
        return result.data.listWorkspaces.items;
    });
  }
  catch (e) {
    console.log(e);
  }
}
