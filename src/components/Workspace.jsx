// ui
import React, { useEffect, useState } from "react";
import {
  SideNavigation,
} from "@cloudscape-design/components";

// apis
import { API, graphqlOperation } from 'aws-amplify'
import { listWorkspaces } from '../graphql/queries'

export const Workspace = props => {
  const [activeHref, setActiveHref] = useState("#/");
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchWorkspaceApi().then(workspaces => {
        setWorkspaces(workspaces);
        workspaces.forEach((workspace) => {
          if (workspace.id === props.context.workspace) {
             setActiveHref(workspace.href);
             setLoading(false);
          }
        });
      });
    }
  }, [workspaces, loading]);

  return (
    <SideNavigation
      activeHref={activeHref}
      header={{ href: "#/", text: "Workspace" }}
      onFollow={event => {
        if (!event.detail.external && event.detail.text !== "Workspace") {
          event.preventDefault();
          setActiveHref(event.detail.href);
          props.setContext({...props.context, ...{workspace: event.detail.id}});

          console.log("--- switching workspaces");
          console.log(props.context);
        }
      }}
      items={workspaces}
    />
  );
}

// graphql apis
function fetchWorkspaceApi() {
  try {
    return API.graphql(graphqlOperation(listWorkspaces)).then(
      result => {
        return result.data.listWorkspaces.items;
    });
  }
  catch (err) {
    console.log({err});
  }
}
