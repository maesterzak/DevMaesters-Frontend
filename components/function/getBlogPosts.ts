

export const getPosts = async () => {
    const res = await fetch(`/api/blog/postlist`)
    const data = await res.json()
    return data.data
}