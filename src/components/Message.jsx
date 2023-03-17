// ui
import React, { useState, useEffect } from "react";
import {
  Button, Form, Modal, Textarea,
  Box, Container, Grid, Header, SpaceBetween
} from "@cloudscape-design/components";

//api
import { API, graphqlOperation } from 'aws-amplify'
import { listMessages } from '../graphql/queries'
import { createMessage, updateMessage, deleteMessage } from '../graphql/mutations'
import { onCreateMessage, onUpdateMessage, onDeleteMessage } from '../graphql/subscriptions';

// util
import moment from "moment";

function createMessageApi(post, channelId) {
  try {
    API.graphql(graphqlOperation(createMessage, {
      input: { content: post, channelId: channelId }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function editMessageApi(messageId, messageVersion, post) {
  try {
    API.graphql(graphqlOperation(updateMessage, {
      input: { id: messageId, content: post, _version: messageVersion }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function deleteMessageApi(messageId, messageVersion) {
  try {
    API.graphql(graphqlOperation(deleteMessage, {
      input: { id: messageId, _version: messageVersion }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function NewLineToBr({children = ""}) {
  return children.split('\n').reduce(function (arr, line) {
    return arr.concat(line, <br />);
  },[]);
}

const NoMessage = () => {
  return (
    <SpaceBetween size="l">
      <Box
        margin={{ vertical: 'xs' }}
        fontSize="heading-s"
        textAlign="center"
        color="inherit"
      >
        Please leave a message
      </Box>
    </SpaceBetween>
  );
}

const Message = ({
  message,
  activeMessage,
  setActiveMessage,
}) => {
  const isEditing = activeMessage && activeMessage.type === "edit" && activeMessage.id === message.id
  const [confirmVisible, setConfirmVisible] = useState(false);

  const deleteHandler = () => {
    deleteMessageApi(message.id, message._version);
    setConfirmVisible(false);
  }

  return (
    isEditing ?
    <MessageForm
      initText={message.content}
      channelId={message.channelId}
      messageId={message.id}
      messageVersion={message._version}
      activeMessage={activeMessage}
      setActiveMessage={setActiveMessage}
     /> :
    <Container
      header={
        <Header
          variant="h4"
          description={ moment(message.updatedAt).fromNow() }
          actions={
            <SpaceBetween direction="horizontal" size="xxs">
              <Button iconName="contact" variant="icon" />
              <Button iconName="edit" variant="icon" onClick={() => setActiveMessage({ id: message.id, type: "edit"})} />
              <Button iconName="remove" variant="icon" onClick={() => setConfirmVisible(true)} />
            </SpaceBetween>
          }
        >
          User name
        </Header>
      }
    >
      <Modal
        onDismiss={() => setConfirmVisible(false)}
        visible={confirmVisible}
        closeAriaLabel="Close modal"
        size="small"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setConfirmVisible(false)}>Cancel</Button>
              <Button variant="primary" onClick={deleteHandler}>OK</Button>
            </SpaceBetween>
          </Box>
        }
      >
        Are you sure to delete the message?
      </Modal>
      <NewLineToBr>{message.content}</NewLineToBr>
    </Container>
  );
}

const MessageForm = ({
  initText = '',
  channelId,
  messageId,
  messageVersion,
  activeMessage,
  setActiveMessage,
}) => {
  const [post, setPost] = useState(initText);
  const [alertVisible, setAlertVisible] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (post.replace(/\s/g,'').length > 0) {
      if (activeMessage && activeMessage.type === "edit") {
        editMessageApi(messageId, messageVersion, post);
        setActiveMessage(null);
      }
      else {
        createMessageApi(post, channelId);
        setPost("");
      }
    }
    else {
      setAlertVisible(true);
    }
  };
  const cancelHandler = () => {
    activeMessage && activeMessage.type === "edit" ? setActiveMessage(null) : setPost("")
  }

  return (
      <form onSubmit={submitHandler}>
      <Form>
        <Container
          header={
            <Header
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button formAction="none" iconName="undo" variant="icon" onClick={cancelHandler} />
                  <Button formAction="submit" iconName="upload" variant="icon" />
                </SpaceBetween>
              }
            />
          }
        >
          <Textarea
            onChange={({detail}) => setPost(detail.value)}
            value={post}
            rows={post.split(/\r\n|\r|\n/).length}
          />
          <Modal
            onDismiss={() => setAlertVisible(false)}
            visible={alertVisible}
            closeAriaLabel="Close modal"
            size="small"
          >
            Please make sure to enter a message
          </Modal>
        </Container>
      </Form>
      </form>
  );
}

export function Messages(channel) {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await API.graphql(graphqlOperation(listMessages, {filter: {channelId: {eq: channel.channelId}}}))
      setMessages(result.data.listMessages.items.filter(item => item._deleted !== true))
    }
    fetchMessages()

    const createSub = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
      next: ({ value }) => { setMessages((messages) => [...messages, value.data.onCreateMessage]) }
    })

    const updateSub = API.graphql(graphqlOperation(onUpdateMessage)).subscribe({
      next: ({ value }) => {
        setMessages(messages => {
          const toUpdateIndex = messages.findIndex(item => item.id === value.data.onUpdateMessage.id)
          if (toUpdateIndex === - 1) { // If the message doesn't exist, treat it like an "add"
            return [...messages, value.data.onUpdateMessage]
          }
          return [...messages.slice(0, toUpdateIndex), value.data.onUpdateMessage, ...messages.slice(toUpdateIndex + 1)]
        })
      }
    })

    const deleteSub = API.graphql(graphqlOperation(onDeleteMessage)).subscribe({
      next: ({ value }) => {
        setMessages(messages => {
          const toDeleteIndex = messages.findIndex(item => item.id === value.data.onDeleteMessage.id)
          return [...messages.slice(0, toDeleteIndex), ...messages.slice(toDeleteIndex + 1)]
        })
      }
    })

    return () => {
      createSub.unsubscribe()
      updateSub.unsubscribe()
      deleteSub.unsubscribe()
    }
  }, [channel.channelId])

  return (
    <Grid gridDefinition={[{ colspan: 12 }, { colspan: 12 }]}>
      <Box float='center' variant='h3'>Channel name</Box>
      <Box float='center'>
        <SpaceBetween size="xs">
        {
          messages.length > 0 ? (messages.sort((a, b) => b.createdAt.localeCompare(a.updatedAt)).map(message =>
            <Message
              key={ message.id }
              message={message}
              activeMessage={activeMessage}
              setActiveMessage={setActiveMessage}
            />
          )) : <NoMessage />
        }
        <MessageForm channelId={channel.channelId} />
        </SpaceBetween>
      </Box>
    </Grid>
  );
}