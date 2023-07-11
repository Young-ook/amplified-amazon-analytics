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
  const [workspaces] = useAsyncData(() => fetchWorkspaceApi());

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
  catch (err) {
    console.log({err});
  }
}
