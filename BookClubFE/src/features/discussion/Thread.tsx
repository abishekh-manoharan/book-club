import React from 'react';
import { NestedThread } from './discussionSlice';

function Thread({thread, offset}:{thread:NestedThread, offset: number}) {
    return (
        <div style={{position: "relative", left: offset}}>
            {thread.text}
            {thread.replies.map(replyThread => <Thread thread={replyThread} offset={offset+25}/>)}
        </div>
    );
}

export default Thread;