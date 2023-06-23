import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  TopNavigation
} from "@cloudscape-design/components";

export function NavigationBar () {
  const [email, setEmail] =useState('');
  getUserInfo().then((user) => setEmail(user.attributes.email));

  const itemClickHandler = (e) => {
    if (e.detail.id == "signout") {
      signOut();
    }
  };

  return (
    <TopNavigation
      identity={{
        href: "#",
        title: "Service",
        logo: {
          src:
            "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=",
          alt: "Service"
        }
      }}
      utilities={[
        {
          type: "menu-dropdown",
          iconName: "settings",
          ariaLabel: "Settings",
          title: "Settings",
          items: [
            {
              id: "settings-org",
              text: "Organizational settings"
            },
            {
              id: "settings-project",
              text: "Project settings"
            }
          ]
        },
        {
          type: "menu-dropdown",
          text: "User",
          description: email,
          iconName: "user-profile",
          onItemClick: itemClickHandler,
          items: [
            { id: "profile", text: "Profile" },
            { id: "preferences", text: "Preferences" },
            { id: "support", text: "Support" },
            {
              id: "feedback",
              text: "Feedback",
              href: "#",
              external: true,
              externalIconAriaLabel: "(opens in new tab)"
            },
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
  );
}

// apis
async function signOut() {
  try {
    await Auth.signOut();
    console.log('signed out');
  }
  catch (err) {
    console.log('error signing out: ', err);
  }
}

async function getUserInfo() {
  try {
    return Auth.currentUserInfo();
  }
  catch (err) {
    console.log('error when getting user info: ', err);
  }
}
