import { observer } from 'mobx-react-lite'
import React from 'react'
import { Pagination } from 'react-bootstrap'
import DeviceStore from '../store/DeviceStore'


function Pages(props) {
    const pageCount = Math.ceil(DeviceStore.totalCount / DeviceStore.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination>
            {pages.map(page =>
                <Pagination.Item key={page} active={DeviceStore.page === page} onClick={() => DeviceStore.setPage(page)}>{page}</Pagination.Item>    
            )}
        </Pagination>
    )
}

export default observer(Pages)
