import Axios from './axios'

/**
 */
export function fetchProject(params={}) {
    return Axios.get('/api/project', params)
}
