import React from 'react';
import { NestedThread } from './discussionSlice';

function Thread({thread}:{thread:NestedThread}) {
    return (
        <div>
            {thread.text}
            {thread.replies.map(replyThread => <Thread thread={replyThread}/>)}
        </div>
    );
}

export default Thread;