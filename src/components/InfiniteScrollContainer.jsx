import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default function InfiniteScrollContainer({
    fetchMore = () => {},
    hasMore = false,
    useWindow = false,
    loader = <div key={-1}>loading ...</div>,
    children,
}) {
    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchMore}
            hasMore={hasMore}
            loader={loader}
            useWindow={useWindow}
        >
            {children}
        </InfiniteScroll>
    );
}
