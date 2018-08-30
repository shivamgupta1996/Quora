
export const SIGNED_IN = "signed_in";
export const POSTED_ARTICLES = "posted_articles";
export const POSTED_COMMENTS = "posted_comments";
export const POSTED_REPLIES = "posted_replies";
export const POSTED_SUBCOMMENTS = "posted_subcomments";
export const SEND_KEY = "send_key";

export function logUser(email) {

  const action = {
    type : SIGNED_IN,
    email
  }
  return action;
}

export function postedArticles (articles){

  const action = {
    type : POSTED_ARTICLES,
    articles
  }
  return action;
}

export function postedComments(comments){

  const action = {
    type : POSTED_COMMENTS,
    comments
  }
  return action;
}

export function sendKey(serverKey){

  const action = {
    type: SEND_KEY,
    serverKey
  }
  return action;
}


export function postedReplies(replies){

  const action = {
    type : POSTED_REPLIES,
    replies
  }
  return action;
}
