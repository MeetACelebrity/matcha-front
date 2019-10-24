import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default function InfiniteScrollContainer({
    fetchMore = () => {},
    hasMore = false,
    loader = <div>loading ...</div>,
    children,
}) {
    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchMore}
            hasMore={hasMore}
            loader={loader}
            useWindow={false}
        >
            {children}
        </InfiniteScroll>
    );
}
