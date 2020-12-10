import request from '@/utils/request'


export const getSearchSuggestions = query => {
    return request({
        method: 'GET',
        url: `/app/v1_0/suggestion`,
        params: {
            query
        }
    })
}